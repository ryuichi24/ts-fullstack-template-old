import React, { useState } from "react";

// https://qiita.com/yuma84/items/72f72a2fff987d3de28a
type FieldErrorMessages<TFormInputs, TFormInputKey extends keyof TFormInputs> = {
    [key in TFormInputKey]: string;
};

type FormProps<TFormInputs, TFormInputKey extends keyof TFormInputs> = {
    onSubmit: (args: {
        values: TFormInputs;
        setFieldErrorMessages: React.Dispatch<
            React.SetStateAction<FieldErrorMessages<TFormInputs, TFormInputKey>>
        >;
    }) => Promise<void>;
    children: (args: {
        fieldErrorMessages: FieldErrorMessages<TFormInputs, TFormInputKey>;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => React.ReactNode;
    className?: string;
};

export const Form = <TFormInputs extends {}, TFormInputKey extends keyof TFormInputs>({
    onSubmit,
    children,
    className = "",
}: FormProps<TFormInputs, TFormInputKey>) => {
    const [formInputs, setFormInputs] = useState<TFormInputs>({} as TFormInputs);
    const [fieldErrorMessages, setFieldErrorMessages] = useState<
        FieldErrorMessages<TFormInputs, TFormInputKey>
    >({} as FieldErrorMessages<TFormInputs, TFormInputKey>);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetFieldName = event.target.name as TFormInputKey;
        const targetValue = event.target.value as TFormInputs[TFormInputKey];
        setFormInputs((prev) => {
            const nextFormInputs: TFormInputs = { ...prev };
            nextFormInputs[targetFieldName] = targetValue;
            return nextFormInputs;
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSubmit({ values: formInputs, setFieldErrorMessages });
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className={`${className}`} onSubmit={handleSubmit}>
            {children({ handleChange, fieldErrorMessages })}
        </form>
    );
};
