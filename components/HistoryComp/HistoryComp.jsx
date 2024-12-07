"use client";
import { getUserTransactions } from "@/utils/appwrite";
import { useEffect, useState } from "react";

export default function HistoryComp() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getUserTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Ошибка при загрузке данных: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mb-[230px] md:mb-0">
      <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
        История выплат
      </h1>

      {/* Таблица для больших экранов */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="font-normal py-[16px] px-[20px] text-sm text-gray-500 opacity-75">
                  Сумма
                </th>
                <th className="font-normal py-[16px] px-[20px] text-sm text-gray-500 opacity-75">
                  ID транзакции
                </th>
                <th className="font-normal py-[16px] px-[20px] text-sm text-gray-500 opacity-75">
                  Статус
                </th>
                <th className="font-normal py-[16px] px-[20px] text-sm text-gray-500 opacity-75">
                  Время
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.$id}
                  className="odd:bg-white even:bg-gray-100"
                >
                  <td className="border-t border-gray-300 py-[16px] px-[20px]">
                    {transaction.withdraw > 0
                      ? transaction.withdraw
                      : transaction.deposit}{" "}
                    {"₽"}
                  </td>
                  <td className="border-t border-gray-300 py-[16px] px-[20px]">
                    {transaction.fakeId}
                  </td>
                  <td className="border-t border-gray-300 py-[16px] px-[20px]">
                    <span
                      className={`${
                        transaction.status === "completed"
                          ? "bg-customGreen text-white"
                          : "bg-gray-300 text-customGreen"
                      } rounded-[5px] px-[10px] py-[5px] uppercase font-bold`}
                    >
                      {transaction.status === "completed"
                        ? "Отправлено"
                        : "Ожидание"}
                    </span>
                  </td>
                  <td className="border-t border-gray-300 py-[16px] px-[20px]">
                    {new Date(transaction.$createdAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Карточки для маленьких экранов */}
      <div className="sm:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.$id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-customOrange font-bold text-lg">
                {transaction.withdraw > 0
                  ? transaction.withdraw
                  : transaction.deposit}{" "}
                {"₽"}
              </h2>
              <span
                className={`${
                  transaction.status === "completed"
                    ? "bg-customGreen text-white"
                    : "bg-gray-300 text-customGreen"
                } rounded-[5px] px-[10px] py-[5px] uppercase font-bold`}
              >
                {transaction.status === "completed" ? "Отправлено" : "Ожидание"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-semibold">ID: </span>
              {transaction.fakeId}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Время: </span>
              {new Date(transaction.$createdAt).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
