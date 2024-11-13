import {
  Client,
  Account,
  ID,
  Avatars,
  Storage,
  Databases,
  Query,
} from "appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "672e0fc30019e1a17d4e",
  databaseId: "672e74f3001c784bb39a",
  storageId: "672e77cc00397e66e4bf",
  userCollectionId: "672e75fe00238b885f64",
  transactionsId: "67324ddf000157b3c31a",
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Ошибка при создании аккаунта");

    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        totalAmount: 0,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function checkAuth() {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw new Error("Не удалось войти в систему");
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Ошибка при выходе из аккаунта:", error);
    throw error;
  }
}

async function createSessionIfNotExist(email, password) {
  try {
    const session = await account.getSession("current"); // Получаем текущую сессию
    if (session) {
      console.log("Сессия уже активна");
      return; // Сессия уже существует, не нужно создавать новую
    }
  } catch (error) {
    // Если сессия не существует, создаем новую
    console.log("Сессия не найдена, создаем новую");
    await account.createSession(email, password); // Создаём сессию
  }
}

export async function createTransaction(amount, userId) {
  try {
    const currentUser = await getCurrentUser(); // Получаем текущего пользователя

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    // Получаем текущий баланс пользователя (totalAmount)
    let newTotalAmount = currentUser.totalAmount || 0;

    // Добавляем сумму депозита к текущему балансу
    newTotalAmount += amount;

    // Создаем транзакцию депозита
    const transaction = await databases.createDocument(
      config.databaseId,
      config.transactionsId,
      ID.unique(),
      {
        users: userId, // Используйте реальное название поля связи из вашей базы данных
        status: "completed",
        deposit: amount, // Сумма депозита
        withdraw: 0, // Нет вывода
        totalAmount: newTotalAmount, // Обновленный баланс после депозита
      }
    );

    // Обновляем документ пользователя, увеличивая totalAmount
    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      currentUser.$id,
      {
        totalAmount: newTotalAmount, // Обновляем поле totalAmount пользователя
      }
    );

    return transaction;
  } catch (error) {
    console.error("Ошибка при создании транзакции:", error);
    throw new Error(error.message);
  }
}

export async function withdrawTransaction(amount) {
  try {
    const currentUser = await getCurrentUser(); // Получаем текущего пользователя

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    // Получаем текущий баланс пользователя
    let newTotalAmount = currentUser.totalAmount || 0;

    // Проверяем, достаточно ли средств
    if (newTotalAmount < amount) {
      throw new Error("Недостаточно средств на счете");
    }

    // Обновляем баланс
    newTotalAmount -= amount;

    // Создаем транзакцию вывода
    const transaction = await databases.createDocument(
      config.databaseId,
      config.transactionsId,
      ID.unique(),
      {
        users: currentUser.$id, // ID пользователя
        status: "completed",
        deposit: 0, // Нет депозита
        withdraw: amount, // Сумма вывода
        totalAmount: newTotalAmount, // Новый баланс
      }
    );

    // Обновляем баланс пользователя в коллекции пользователей
    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      currentUser.$id,
      {
        totalAmount: newTotalAmount, // Обновляем только баланс
      }
    );

    return transaction;
  } catch (error) {
    console.error("Ошибка при выводе средств:", error);
    throw new Error(error.message);
  }
}

export async function getBalance() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Не удалось получить текущего пользователя");
    }

    const userId = currentUser.$id;
    const transactions = await databases.listDocuments(
      config.databaseId,
      config.transactionsId,
      [Query.equal("users", userId)]
    );

    let totalDeposited = 0;
    let totalWithdrawn = 0;

    transactions.documents.forEach((transaction) => {
      totalDeposited += transaction.deposit;
      totalWithdrawn += transaction.withdraw;
    });

    const currentBalance = currentUser.totalAmount || 0;

    return {
      currentBalance,
      totalDeposited,
      totalWithdrawn,
    };
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
    throw new Error(error.message);
  }
}

export async function ensureSession() {
  try {
    await account.getSession("current"); // Проверяем активную сессию
  } catch (error) {
    throw new Error("Пользователь не аутентифицирован");
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("No user document found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getLatestTransactions = async (userId) => {
  try {
    const transactions = await databases.listDocuments(
      config.databaseId,
      config.transactionsId,
      [
        Query.orderDesc("$createdAt"),
        Query.equal("users", userId), // Фильтр по ID пользователя
      ]
    );

    return transactions.documents || []; // Возвращаем массив транзакций или пустой массив
  } catch (error) {
    console.error("Ошибка при получении последних транзакций:", error.message);
    throw error;
  }
};
