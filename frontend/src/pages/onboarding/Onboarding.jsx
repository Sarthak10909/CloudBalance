import React, { useState } from "react";
import IamRoleStep from "./steps./IamRoleStep";
import PolicyStep from "./steps./PolicyStep";
import CurStep from "./steps./CurStep";
import NavigationButtons from "./components/NavigationButtons";
import { createAccount } from "../../api/accountApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const STEP_HEADERS = {
    1: {
        title: "Create an IAM Role",
        subtitle: "Create an IAM Role by following these steps",
    },
    2: {
        title: "Attach Policies",
        subtitle: "Attach required customer managed policies to the IAM role",
    },
    3: {
        title: "Create Cost & Usage Report",
        subtitle: "Configure AWS Cost and Usage reporting",
    },
};

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [account, setAccount] = useState({
        arnRole: "",
        accountName: "",
        accountId: "",
    });


    const next = () => setStep((s) => s + 1);
    const prev = () => setStep((s) => s - 1);

    const navigate = useNavigate();

    const submit = async () => {
        try {
            const payload = {
                arnRole: account.arnRole,
                accountId: Number(account.accountId), // backend expects Long
                accountName: account.accountName,
            };

            await createAccount(payload);

            toast.success("Account created successfully");

            // Optional: reset or redirect
            // setAccount({ arnRole: "", accountId: "", accountName: "" });
            navigate("/dashboard/users");

        } catch (error) {
            console.error(error);
            toast.error("Failed to create account");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    {STEP_HEADERS[step].title}
                </h1>
                <p className="text-gray-600">
                    {STEP_HEADERS[step].subtitle}
                </p>
            </div>
            {/* CONTENT */}
            <div className="flex-1 bg-white border border-gray-200 rounded-md p-6 overflow-y-auto">

                {step === 1 && (
                    <IamRoleStep account={account} setAccount={setAccount} />
                )}

                {step === 2 && <PolicyStep />}
                {step === 3 && <CurStep />}

            </div>

            {/* 🔹 BUTTON BAR (OUTSIDE WHITE CARD) */}
            <div className="flex justify-between items-center mt-6 px-6">
                <NavigationButtons
                    step={step}
                    onNext={next}
                    onPrev={prev}
                    onSubmit={submit}
                />
            </div>

        </div>
    );
};

export default Onboarding;
