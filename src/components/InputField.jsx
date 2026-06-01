export default function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
      />
    </div>
  );
}
