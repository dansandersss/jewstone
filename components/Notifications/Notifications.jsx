"use client";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useNotificationContext } from "@/context/NotificationProvider";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Notifications() {
  const { notifications, setNotifications } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useGlobalContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const convertToRandom9Digits = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const fetchNotifications = async () => {
    try {
      const allNotifications = await getLatestTransactions(user.$id);
      const latestNotifications = allNotifications.slice(0, 5);

      const formattedNotifications = latestNotifications.map(
        (notification) => ({
          ...notification,
          randomId: convertToRandom9Digits(),
        })
      );

      setNotifications(formattedNotifications);
      setIsLoaded(true);
    } catch (error) {
      console.error("Ошибка при получении уведомлений:", error.message);
    }
  };

  const handleGetNotifications = async () => {
    if (!isLoaded) {
      await fetchNotifications();
    }
    setShowNotifications((prev) => !prev);
  };

  const handleRemoveNotification = (randomId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.randomId !== randomId
    );
    setNotifications(updatedNotifications);

    if (updatedNotifications.length === 0) {
      setShowNotifications(false);
    }
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="container py-[17px] border-b">
        <div className=" gap-2 items-center justify-end hidden md:flex">
          <p className="text-customGray opacity-75 text-sm">Уведомления</p>
          <div className="relative">
            <div className="cursor-pointer" onClick={handleGetNotifications}>
              <Image
                src={icons.notificationsLogo}
                alt="Notifications"
                width={24}
                height={24}
              />
            </div>
            {notifications.length > 0 && (
              <Image
                className="absolute top-[-5px] right-[-5px]"
                src={icons.redLogo}
                alt="Alarm"
                width={7}
                height={7}
              />
            )}
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-4 top-[70px] bg-white border shadow-lg rounded-md p-4 w-80 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Последние транзакции</h3>
            <button
              onClick={handleCloseNotifications}
              aria-label="Close Notifications"
            >
              <Image
                src={icons.closeIcon} // Убедитесь, что у вас есть иконка для креста
                alt="Close"
                width={20}
                height={20}
              />
            </button>
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.randomId}
                className="mb-2 p-2 border-b flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-700 font-mono">
                    {notification.randomId}{" "}
                    <span className="text-sm text-green-600">Подтверждена</span>
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleRemoveNotification(notification.randomId)
                  }
                  className="text-red-500 text-xs hover:underline"
                >
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Уведомлений нет</p>
          )}
        </div>
      )}
    </>
  );
}
