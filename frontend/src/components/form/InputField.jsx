import React from 'react'

function InputField({
    label,
    name, 
    type="text",
    value,
    onChange,
    placeholder,
    required=false
}){
    return(
        <div className = "flex flex-col gap-1">
            <label className = "">{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className=" w-[500px] h-12 border border-gray-300 p-3 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default InputField
