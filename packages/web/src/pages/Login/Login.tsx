import React, { useState } from "react";
import { useLoginMutation } from "@/__generated__/graphql";
import { isApolloError, ServerError } from "@apollo/client";

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
    const [login] = useLoginMutation();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            await login({ variables: { loginInput: { ...formInputs } } });
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
        <>
            <div>Login page</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, email: event.target.value }))
                        }
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, password: event.target.value }))
                        }
                    />
                </div>
                <button>login</button>
                {fieldErrors.map((err, index) => (
                    <p className="text-red-400" key={index}>
                        {err.message}
                    </p>
                ))}
            </form>
        </>
    );
};
