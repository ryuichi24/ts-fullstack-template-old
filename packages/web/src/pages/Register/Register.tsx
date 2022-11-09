import React, { useState } from "react";
import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { Wrapper } from "@/components/Wrapper";
import { useRegisterMutation } from "@/__generated__/graphql";
import { isApolloError, ServerError } from "@apollo/client";

type RegisterFormInputs = {
    email: string;
    password: string;
};

type RegisterFormInputsKeys = keyof RegisterFormInputs;

type FieldError = {
    message: string;
    field: string;
};

export const Register: React.FC<{}> = ({}) => {
    const [registerDone, setRegisterDone] = useState(false);
    const [register, { loading }] = useRegisterMutation();

    if (registerDone) {
        return (
            <>
                <div>
                    <h2>Welcome on board!</h2>
                    <p>
                        We sent you an email and please check your info box to confirm your email
                        address. Thank!
                    </p>
                </div>
            </>
        );
    }

    return (
        <Wrapper maxWidth={350} className="flex items-center h-full">
            <div className="w-full">
                <h2 className="text-gray-600 font-semibold">Sign up your account</h2>
                <Form<RegisterFormInputs, RegisterFormInputsKeys>
                    className="flex flex-col justify-center"
                    onSubmit={async ({ values, setFieldErrorMessages }) => {
                        try {
                            await register({ variables: { registerInput: { ...values } } });
                            setRegisterDone(true);
                        } catch (error) {
                            if (error instanceof Error && isApolloError(error)) {
                                // NOTE: tmp solution
                                const serverError = error.networkError as ServerError;
                                const fieldErrors = serverError.result?.errors as FieldError[];
                                if (!fieldErrors) {
                                    return;
                                }
                                fieldErrors.forEach((errorItem) =>
                                    setFieldErrorMessages((prev) => {
                                        const currentField =
                                            errorItem.field as RegisterFormInputsKeys;
                                        prev[currentField] = errorItem.message;
                                        return prev;
                                    })
                                );
                            }
                        }
                    }}
                >
                    {({ handleChange, fieldErrorMessages }) => {
                        return (
                            <>
                                <InputField
                                    className="mt-2"
                                    name="email"
                                    onChange={handleChange}
                                    errorMessage={fieldErrorMessages["email"]}
                                    required
                                />
                                <InputField
                                    className="mt-2"
                                    name="password"
                                    onChange={handleChange}
                                    errorMessage={fieldErrorMessages["password"]}
                                    required
                                />
                                <Button className="mt-4" isLoading={loading}>
                                    Sign Up
                                </Button>
                            </>
                        );
                    }}
                </Form>
            </div>
        </Wrapper>
    );
};
