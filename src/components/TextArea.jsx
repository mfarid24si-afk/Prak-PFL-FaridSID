export default function TextArea({ label, placeholder, value, onChange, rows = 4 }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
      />
    </div>
  );
}
