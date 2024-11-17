import { useState } from "react";

export default function Modal({ title, onClose, onSubmit, actionType }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Введите корректную сумму!");
      return;
    }
    onSubmit(Number(amount));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full h-full max-h-[600px] overflow-y-auto flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите сумму"
          className="w-3/4 p-2 border border-gray-300 rounded-md mb-4 text-lg"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className={`py-2 px-6 rounded-md ${
              actionType === "deposit"
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            {actionType === "deposit" ? "Пополнить" : "Вывести"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
