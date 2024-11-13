export default function CustomButton({ text, customClass, onClick }) {
  return (
    <button
      onClick={onClick} // Добавляем обработчик клика
      className={`${customClass} py-[15px] px-[20px] text-white rounded-[10px]`}
    >
      {text}
    </button>
  );
}
