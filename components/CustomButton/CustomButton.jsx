export default function CustomButton({ text, customClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group custom-animated-btn ${customClass} py-[15px] px-[20px] rounded-[10px]`}
    >
      <span className="absolute inset-0 bg-customGray scale-0 transition-transform duration-300 group-hover:scale-100"></span>
      <span className="relative transition-colors duration-300 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}
