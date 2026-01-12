import React from 'react'
import CK_Tuner_Role from "../assets/IAM_Role.png"
import FormRenderer from './form/FormRenderer'
import { useState, useRef } from 'react'

const CreateIAM_Role = () => {

    const accountFields = [
        { label: "Enter the IAM Role ARN:", name: "roleARN", required: true },
        { label: "Enter the Account ID:", name: "accountId", required: true },
        { label: "Enter the Account Name:", name: "accountName", required: true }
    ]

    const [accountsData, setAccountsData] = useState({});

    const onChange = (e) => {
        setAccountsData({
            ...accountsData,
            [e.target.name]: e.target.value
        })
    }

    const textRef = useRef(null);

    const handleCopy = async () => {
        const text = textRef.current.innerText;

        await navigator.clipboard.writeText(text);
    }

    const onSubmit = async () => {
 
    }

    return (
        <div>
            <h1 className="text-4xl font-bold px-6">Create an IAM Role</h1>
            <h5 className="text-lg text-gray-600 px-6 py-2">Create an IAM Role by following these steps</h5>

            <div className="m-8 p-8 bg-white gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="numberUI">1</div>
                    <h2 className="fontOnboarding">Log into AWS account &
                        Create an IAM Role.</h2>
                </div>

                <div className="flex items-center gap-4 mb-2">
                    <div className="numberUI">2</div>
                    <h2 className="fontOnboarding">In the Trusted entity typesection, selectCustom trust policy.Replace the prefilled policy with the policy provided below -</h2>
                </div>


                {/* Text box */}
                <textarea rows={10}
                    className="ml-6 resize-none w-full p-3 rounded m-4 bg-gray-100"
                    readOnly
                    defaultValue={`{
                        "Version": "2012-10-17",
                        "Statement": [
                            {
                            "Effect": "Allow",
                            "Principal": {
                                "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
                            },
                            "Action": "sts:AssumeRole",
                            "Condition": {
                                "StringEquals": {
                                "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
                                }
                            }
                            },
                            {
                            "Effect": "Allow",
                            "Principal": {
                                "Service": "s3.amazonaws.com"
                            },
                            "Action": "sts:AssumeRole"
                            }
                        ]
                    }
                `}>
                </textarea>

                <div className="flex items-center gap-4 mb-2">
                    <div className="numberUI">3</div>
                    <h2 className="fontOnboarding">Click on Next to go to the Add permissions page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on Next.</h2>
                </div>



                <div className="flex items-center gap-4 mb-6">
                    <div className="numberUI">4</div>
                    <h2 className="fontOnboarding">In the Role name field, enter the below-mentioned role name, and click on Create Role -</h2>
                </div>

                <div ref={textRef} className="w-100 ml-8 px-4 py-1 bg-gray-100 rounded-lg border flex gap-12">
                    <h2 className="text-l font-semibold">CK-Tuner-Role-dev2</h2>
                    <button className="border" onClick={handleCopy}>
                        Copy
                    </button>
                </div>


                <div>
                    <div className="flex items-center gap-4 mb-5 mt-10">
                        <div className="numberUI">5</div>
                        <h2 className="fontOnboarding">Go to the newly create IAM Role and copy the Role ARN -
                            Create IRN</h2>

                    </div>

                    <div className="my-6 pl-6">
                        <img src={CK_Tuner_Role} alt="CK-Tuner-Role" />
                    </div>
                </div>



                {/* Copy text with role */}

                <div className="flex items-center gap-4 mb-2">
                    <div className="numberUI">6</div>
                    <h2 className="fontOnboarding">Paste the copied Role ARN below-</h2>
                </div>

                {/* Enter the IAM Role, AccountId and AccountName */}

                <div className="ml-6 mt-10">
                    <form>
                        <FormRenderer
                            fields={accountFields}
                            formData={accountsData}
                            onChange={onChange}
                            className="grid grid-cols-2 gap-2"
                        />
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateIAM_Role
