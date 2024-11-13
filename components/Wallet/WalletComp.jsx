"use client";
import icons from "@/constants/icons";
import WalletCard from "./WalletCard";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";
import Modal from "../Modal/Modal";
import {
  createTransaction,
  ensureSession,
  getBalance,
  withdrawTransaction,
} from "@/utils/appwrite";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useNotificationContext } from "@/context/NotificationProvider"; // Импортируем контекст уведомлений

export default function WalletComp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [totalWithdrawned, setTotalWithdrawned] = useState(0);
  const [actionType, setActionType] = useState("deposit");

  const { user } = useGlobalContext();
  const { addNotification, notifications } = useNotificationContext(); // Получаем функцию для добавления уведомлений

  // Функция для обновления баланса
  const updateBalance = async () => {
    try {
      const updatedBalance = await getBalance();
      setBalance(updatedBalance.currentBalance);
      setTotalDeposited(updatedBalance.totalDeposited);
      setTotalWithdrawned(updatedBalance.totalWithdrawn);
    } catch (error) {
      console.error("Ошибка при обновлении баланса:", error);
    }
  };

  useEffect(() => {
    updateBalance();
  }, []);

  const handleDeposit = async (amount) => {
    try {
      await ensureSession();
      const transaction = await createTransaction(amount, user?.$id);
      await updateBalance();

      // Добавляем уведомление о пополнении
      addNotification({
        message: `Пополнение на ${amount} ₽ успешно, транзакция №${transaction.$id}`,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка пополнения:", error);
    }
  };

  const handleWithdraw = async (amount) => {
    try {
      const transaction = await withdrawTransaction(amount);
      await updateBalance();

      // Добавляем уведомление о выводе
      addNotification({
        message: `Вывод на ${amount} ₽ успешно завершен, транзакция №${transaction.$id}`,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка вывода средств:", error);
    }
  };

  return (
    <div className="container pt-[33px] mb-[230px] md:mb-0">
      <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
        Денежные средства
      </h1>

      <div className="wallet_card_cont flex flex-wrap justify-center gap-3 md:flex-nowrap md:justify-between md:gap-0 mb-5">
        <WalletCard
          icon={icons.icon1}
          title="Мой процент инвестиций"
          percent="10%"
        />
        <WalletCard
          icon={icons.icon2}
          title="Суммарно выплачено"
          withdrawed={totalWithdrawned || "0"}
        />
        <WalletCard
          icon={icons.icon3}
          title="Суммарно вложено"
          deposited={totalDeposited}
        />
      </div>

      <div className="flex items-center justify-center flex-wrap md:flex-nowrap md:justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="bg-customOrange rounded-full p-2">
            <Image src={icons.icon1} width={24} alt="Icon" />
          </div>
          <h3>На счету</h3>
        </div>
        <p>{balance} ₽</p>
        <div className="flex items-center gap-2">
          <CustomButton
            text="Вывести"
            customClass="bg-customGray"
            onClick={() => {
              setActionType("withdraw");
              setIsModalOpen(true);
            }}
          />
          <CustomButton
            text="Пополнить"
            customClass="bg-customOrange"
            onClick={() => {
              setActionType("deposit");
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title={
            actionType === "deposit" ? "Пополнить счет" : "Вывести средства"
          }
          onClose={() => setIsModalOpen(false)}
          onSubmit={actionType === "deposit" ? handleDeposit : handleWithdraw}
          actionType={actionType}
        />
      )}
    </div>
  );
}
