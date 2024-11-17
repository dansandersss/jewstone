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
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="font-normal py-[16px] px-[20px] text-sm text-gray-500 opacity-75 p-2">
                Сумма
              </th>
              <th className="font-normal text-sm text-gray-500 opacity-75 p-2">
                ID транзакции
              </th>
              <th className="font-normal text-sm text-gray-500 opacity-75 p-2">
                Статус
              </th>
              <th className="font-normal text-sm text-gray-500 opacity-75 p-2">
                Время
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.$id}
                className="odd:bg-white even:bg-gray-100 py-[16px] px-[20px]"
              >
                <td className="border-t border-gray-300 py-[16px] px-[20px]">
                  {transaction.withdraw > 0
                    ? transaction.withdraw
                    : transaction.deposit}{" "}
                  {"₽"}
                </td>
                <td className="border-t border-gray-300 p-2">
                  {transaction.fakeId}
                </td>
                <td className="border-t border-gray-300 p-2">
                  <span className="bg-gray-300 rounded-[5px] p-[5px] text-customGreen uppercase font-bold">
                    {transaction.status === "completed"
                      ? "Отправлено"
                      : "Ожидание"}
                  </span>
                </td>
                <td className="border-t border-gray-300 p-2">
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
  );
}
