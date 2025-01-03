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
import { useNotificationContext } from "@/context/NotificationProvider";

export default function WalletComp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [totalWithdrawned, setTotalWithdrawned] = useState(0);
  const [actionType, setActionType] = useState("deposit");
  const [isClient, setIsClient] = useState(false);

  const { user } = useGlobalContext();
  const { addNotification, notifications } = useNotificationContext();

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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      updateBalance();
    }
  }, [isClient]);

  const handleDeposit = async (amount) => {
    try {
      await ensureSession();
      const transaction = await createTransaction(amount, user?.$id);
      await updateBalance();

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

      addNotification({
        message: `Вывод на ${amount} ₽ успешно завершен, транзакция №${transaction.$id}`,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка вывода средств:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container md:mb-0 w-full h-full pb-[150px] xl:h-[calc(100%-200px)]">
      <div className="xl:flex block xl:flex-col xl:justify-center justify-normal">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Денежные средства
        </h1>

        <div className="flex flex-col justify-center items-center">
          <div className="wallet_card_cont flex flex-wrap justify-center gap-5 md:flex-wrap xl:flex-nowrap md:gap-5 mb-5">
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

          <div className="flex w-[347px] xl:w-[1080px] items-center justify-center flex-wrap md:flex-wrap xl:flex-nowrap md:justify-between gap-3 border rounded-[10px] p-5 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-customOrange rounded-full p-2">
                <Image src={icons.icon1} width={24} alt="Icon" />
              </div>
              <h3>На счету</h3>
            </div>
            <p className="font-bold text-[26px]">{balance} ₽</p>
            <div className="flex items-center gap-2">
              <CustomButton
                text="Вывести"
                customClass="bg-customGray text-white"
                onClick={() => {
                  setActionType("withdraw");
                  setIsModalOpen(true);
                }}
              />
              <CustomButton
                text="Пополнить"
                customClass="bg-customOrange text-white"
                onClick={() => {
                  setActionType("deposit");
                  setIsModalOpen(true);
                }}
              />
            </div>
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
    </div>
  );
}
