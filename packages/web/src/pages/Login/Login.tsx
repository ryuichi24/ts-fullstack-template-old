import React, { useState } from "react";
import { useLoginMutation } from "@/__generated__/graphql";
import { isApolloError, ServerError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { InputField } from "@/components/Form";
import { Wrapper } from "@/components/Wrapper";
import { Button } from "@/components/Elements";

type loginFormInputs = {
    email: string;
    password: string;
};

type FieldError = {
    message: string;
    field: string;
};

export const Login: React.FC<{}> = ({}) => {
    const [formInputs, setFormInputs] = useState<loginFormInputs>({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
    const [login, { loading }] = useLoginMutation();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const response = await login({ variables: { loginInput: { ...formInputs } } });
            setUser({ ...response.data?.login?.user });
            // replace = true means history stack gets clean and the user cannot get back
            navigate("/", { replace: true });
        } catch (error) {
            if (error instanceof Error && isApolloError(error)) {
                console.log({ graphQLErrors: error.graphQLErrors });
                // NOTE: tmp solution
                const serverError = error.networkError as ServerError;
                const fieldErrors = serverError.result?.errors as FieldError[];
                if (!fieldErrors) {
                    return;
                }
                setFieldErrors(fieldErrors);
            }
        }
    };
    return (
        <Wrapper maxWidth={350} className="flex items-center h-full">
            <div className="w-full">
                <h2 className="text-gray-600 font-semibold">Login to your account</h2>
                <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                    <InputField
                        className="mt-2"
                        name="email"
                        onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, email: event.target.value }))
                        }
                    />
                    <InputField
                        className="mt-2"
                        name="password"
                        onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, password: event.target.value }))
                        }
                    />
                    <Button className="mt-4" isLoading={loading}>login</Button>
                    {fieldErrors.map((err, index) => (
                        <p className="text-red-400" key={index}>
                            {err.message}
                        </p>
                    ))}
                </form>
            </div>
        </Wrapper>
    );
};
