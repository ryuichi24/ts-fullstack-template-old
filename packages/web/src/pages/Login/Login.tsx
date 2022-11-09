import React from "react";
import { useLoginMutation } from "@/__generated__/graphql";
import { isApolloError, ServerError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Form, InputField } from "@/components/Form";
import { Wrapper } from "@/components/Wrapper";
import { Button } from "@/components/Elements";

type LoginFormInputs = {
    email: string;
    password: string;
};

type LoginFormInputsKeys = keyof LoginFormInputs;

type FieldError = {
    message: string;
    field: string;
};

export const Login: React.FC<{}> = ({}) => {
    const [login, { loading }] = useLoginMutation();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    return (
        <Wrapper maxWidth={350} className="flex items-center h-full">
            <div className="w-full">
                <h2 className="text-gray-600 font-semibold">Login to your account</h2>
                <Form<LoginFormInputs, LoginFormInputsKeys>
                    className="flex flex-col justify-center"
                    onSubmit={async ({ values, setFieldErrorMessages }) => {
                        try {
                            const response = await login({
                                variables: { loginInput: { ...values } },
                            });
                            setUser({ ...response.data?.login?.user });
                            // replace = true means history stack gets clean and the user cannot get back
                            navigate("/", { replace: true });
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
                                        const currentField = errorItem.field as LoginFormInputsKeys;
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
                                    login
                                </Button>
                            </>
                        );
                    }}
                </Form>
            </div>
        </Wrapper>
    );
};
