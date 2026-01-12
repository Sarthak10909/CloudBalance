import react from 'react'

function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    required
}) {
    return (
        <div className="flex flex-col w-120">
            <label className="text-black font-bold mb-1">{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="border border-gray-300 p-3 rounded-lg bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select a role</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField