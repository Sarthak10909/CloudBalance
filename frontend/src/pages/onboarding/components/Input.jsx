import clsx from "clsx";

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  readOnly = false,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type={type}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className={clsx(
          "border rounded-md px-3 py-2 focus:outline-indigo-500",
          readOnly && "bg-gray-100 cursor-not-allowed",
          error && "border-red-500"
        )}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
