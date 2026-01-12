export const userFields = [
    { label: "First Name", name: "firstName", required: true },
    { label: "Last Name", name: "lastName", required: true },
    { label: "Email Id", name: "email", type: "email", required: true },
    { label: "Password", name: "password", required: true },
    {
        label: "Select Role",
        name: "role",
        type: "select",
        required: true,
        options: [
            { label: "Admin", value: "ADMIN" },
            { label: "Read Only", value: "READ_ONLY" },
            { label: "Customer", value: "CUSTOMER" }
        ]
    }
]