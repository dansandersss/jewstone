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

// Инициализация клиента Appwrite
const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// --- Утилиты для работы с пользователем ---
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("Документ пользователя не найден");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error("Ошибка при получении текущего пользователя:", error);
    return null; // Явно возвращаем null
  }
};

// --- Аутентификация ---
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password); // Новый метод для создания сессии
    console.log("Успешный вход, сессия создана:", session);
    return session;
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw new Error("Не удалось войти в систему");
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
    console.log("Выход выполнен.");
  } catch (error) {
    console.error("Ошибка при выходе из аккаунта:", error);
    throw error;
  }
}

// --- Транзакции ---
export async function createTransaction(amount, userId) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    const newTotalAmount = (currentUser.totalAmount || 0) + amount;

    // Создаем транзакцию
    const transaction = await databases.createDocument(
      config.databaseId,
      config.transactionsId,
      ID.unique(),
      {
        users: userId,
        status: "completed",
        deposit: amount,
        withdraw: 0,
        totalAmount: newTotalAmount,
      }
    );

    // Обновляем баланс пользователя
    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      currentUser.$id,
      { totalAmount: newTotalAmount }
    );

    return transaction;
  } catch (error) {
    console.error("Ошибка при создании транзакции:", error);
    throw new Error("Не удалось создать транзакцию.");
  }
}

export async function withdrawTransaction(amount) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    if (currentUser.totalAmount < amount) {
      throw new Error("Недостаточно средств");
    }

    const newTotalAmount = currentUser.totalAmount - amount;

    // Создаем транзакцию вывода
    const transaction = await databases.createDocument(
      config.databaseId,
      config.transactionsId,
      ID.unique(),
      {
        users: currentUser.$id,
        status: "completed",
        deposit: 0,
        withdraw: amount,
        totalAmount: newTotalAmount,
      }
    );

    // Обновляем баланс
    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      currentUser.$id,
      { totalAmount: newTotalAmount }
    );

    return transaction;
  } catch (error) {
    console.error("Ошибка при выводе средств:", error);
    throw new Error("Не удалось вывести средства.");
  }
}

// --- Обновление профиля ---
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      updatedData
    );
    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    throw new Error("Не удалось обновить профиль.");
  }
};

// --- Вспомогательные функции ---
export async function ensureSession() {
  try {
    const session = await account.get();
    console.log("Активная сессия:", session);
    return session;
  } catch (error) {
    console.error("Нет активной сессии:", error);
    throw new Error("Пользователь не аутентифицирован.");
  }
}

export async function getBalance() {
  try {
    const currentUser = await getCurrentUser(); // Получаем текущего пользователя

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

export const getUserProfile = async (userId) => {
  try {
    const user = await account.get(); // Получаем текущего аутентифицированного пользователя
    return user; // Возвращаем данные пользователя
  } catch (error) {
    console.error("Ошибка получения данных пользователя:", error);
    throw error;
  }
};
