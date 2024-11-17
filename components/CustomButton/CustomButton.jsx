export default function CustomButton({ text, customClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${customClass} py-[15px] px-[20px] rounded-[10px]`}
    >
      {text}
    </button>
  );
}
