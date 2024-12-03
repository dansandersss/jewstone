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
const storage = new Storage(client);

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
    return null;
  }
};

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Error creating account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
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

const generateRandomId = () => {
  return Math.floor(100000000 + Math.random() * 900000000);
};

export async function createTransaction(amount, userId) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    const newTotalAmount = (currentUser.totalAmount || 0) + amount;

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
        fakeId: parseInt(generateRandomId(), 10),
      }
    );

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
        fakeId: parseInt(generateRandomId(), 10),
      }
    );

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

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      updatedData
    );
    console.log("Профиль пользователя обновлен:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    throw new Error("Не удалось обновить профиль.");
  }
};

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

export const getUserProfile = async (userId) => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Ошибка получения данных пользователя:", error);
    throw error;
  }
};

export const getUserTransactions = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Пользователь не аутентифицирован");
    }

    // Получаем все транзакции без сортировки
    const transactions = await databases.listDocuments(
      config.databaseId,
      config.transactionsId,
      [Query.equal("users", currentUser.$id)]
    );

    // Сортируем транзакции по полю $createdAt по убыванию
    const sortedTransactions = transactions.documents
      .filter((transaction) => transaction.withdraw > 0)
      .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)); // Сортировка по убыванию

    return sortedTransactions;
  } catch (error) {
    console.error("Ошибка при получении транзакций пользователя:", error);
    throw new Error("Не удалось получить транзакции.");
  }
};

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const session = await account.get();
    if (!session) {
      throw new Error("Пользователь не аутентифицирован");
    }
    await account.updatePassword(oldPassword, newPassword);
    console.log("Пароль успешно обновлен");
  } catch (error) {
    console.error("Ошибка при обновлении пароля:", error);
    throw new Error(
      "Не удалось обновить пароль. Проверьте старый пароль и повторите попытку."
    );
  }
};

export const uploadAvatar = async (file) => {
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );

    const avatarUrl = storage.getFileView(config.storageId, uploadedFile.$id);

    console.log("URL аватара:", avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error("Ошибка при загрузке аватара:", error);
    throw new Error("Ошибка при загрузке аватара");
  }
};

export async function createPasswordRecovery(email) {
  try {
    const response = await account.createRecovery(
      email,
      `${window.location.origin}/reset-password`
    );
    console.log("Recovery email sent:", response);
  } catch (error) {
    console.error("Error sending recovery email:", error);
    throw new Error("Не удалось отправить письмо для восстановления пароля.");
  }
}
