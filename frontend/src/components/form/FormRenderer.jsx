import InputField from "./InputField"
import SelectField from "./SelectField"

function FormRenderer({fields, formData, onChange, className = ""}){
    return(
        <div className={className}>
            {fields.map((field) => {
                console.log(field.name, formData[field.name], "Hello");
                if(field.type === "select"){
                    return(
                        <SelectField
                            key={field.name}
                            {...field}
                            value={formData[field.name] || ""}
                            onChange={onChange}
                        />
                    );
                }

                return(
                    <InputField
                        key={field.name}
                        {...field}
                        value={formData[field.name]}
                        onChange={onChange}
                    />
                )

            })}
        </div>
    )
}

export default FormRenderer;