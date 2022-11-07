import { useRegisterMutation } from "@/__generated__/graphql";
import { isApolloError, ServerError } from "@apollo/client";
import React, { useState } from "react";

type RegisterFormInputs = {
    email: string;
    password: string;
};

type FieldError = {
    message: string;
    field: string;
};

export const Register: React.FC<{}> = ({}) => {
    const [formInputs, setFormInputs] = useState<RegisterFormInputs>({ email: "", password: "" });
    const [registerDone, setRegisterDone] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
    const [register] = useRegisterMutation();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        console.log(formInputs);
        try {
            await register({ variables: { registerInput: { ...formInputs } } });
            setRegisterDone(true);
        } catch (error) {
            if (error instanceof Error && isApolloError(error)) {
                // https://github.com/apollographql/apollo-client/issues/9870
                console.log({ graphQLErrors: error.graphQLErrors });
                // NOTE: tmp solution
                const serverError = error.networkError as ServerError;
                const fieldErrors = serverError.result.errors as FieldError[];
                setFieldErrors(fieldErrors);
            }
        }
    };

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
        <>
            <div>Register page</div>
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
                <button>Register</button>
                {fieldErrors.map((err, index) => (
                    <p className="text-red-400" key={index}>
                        {err.message}
                    </p>
                ))}
            </form>
        </>
    );
};
