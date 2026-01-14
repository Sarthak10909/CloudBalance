import React from "react";
import StepIndicator from "../components/StepIndicator";
import Input from "../components/Input";
import CopyBlock from "../components/CopyBlock";
import trustPolicy from "../constants/trustPolicy";
import img from "../../../assets/IAM_Role.png";

const IamRoleStep = ({ account, setAccount }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    return (
        <div>
            <div className="space-y-6">
                <StepIndicator num={1}>
                    Log into AWS account &
                    Create an IAM Role.
                </StepIndicator>

                <StepIndicator num={2}>
                    In the Trusted entity typesection, select Custom trust policy. Replace the prefilled policy with the policy provided below -
                </StepIndicator>

                {/* <CopyBlock text={trustPolicy} /> */}
                <div className="relative">
                    <textarea
                        readOnly
                        rows={10}
                        className="w-full resize-none bg-gray-100 border rounded-md p-4 text-sm font-mono overflow-auto"
                        value={trustPolicy}
                    />
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(trustPolicy);
                        }}
                        className="absolute top-2 right-2 px-2 py-1 text-xs border rounded hover:bg-gray-200"
                    >
                        Copy
                    </button>
                </div>


                <StepIndicator num={3}>
                    Click on <b>Next</b> to go to the Add permissions page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <b>Next</b> .
                </StepIndicator>

                <StepIndicator num={4}>
                    In the Role name field, enter the below-mentioned role name, and click on Create Role -
                </StepIndicator>

                <CopyBlock text="CK-Tuner-Role-dev2" inline />

                <StepIndicator num={5}>
                    Go to the newly create IAM Role and copy the Role ARN -
                </StepIndicator>

                <img src={img} alt="IAM Role ARN" className="rounded border" />

                <StepIndicator num={6}>
                    Paste details below:
                </StepIndicator>

                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="IAM Role ARN"
                        name="arnRole"
                        value={account.arnRole}
                        onChange={handleChange}
                    />
                    <Input
                        label="Account ID"
                        name="accountId"
                        value={account.accountId}
                        onChange={handleChange}
                    />

                    <div className="col-span-1">
                        <Input
                            label="Account Name"
                            name="accountName"
                            value={account.accountName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>



        </div>
    );
};

export default IamRoleStep;
