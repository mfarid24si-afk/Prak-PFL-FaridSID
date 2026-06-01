export default function SelectField({ label, options = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-500 w-full"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
