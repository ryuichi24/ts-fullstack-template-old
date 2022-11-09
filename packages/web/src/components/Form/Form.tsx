import React, { useState } from "react";

// https://qiita.com/yuma84/items/72f72a2fff987d3de28a
type FieldErrorMessages<TFormInputs, TFieldKeys extends keyof TFormInputs> = {
    [key in TFieldKeys]: string;
};

type FormProps<TFormInputs, TFieldKeys extends keyof TFormInputs> = {
    onSubmit: (args: {
        values: TFormInputs;
        setFieldErrorMessages: React.Dispatch<
            React.SetStateAction<FieldErrorMessages<TFormInputs, TFieldKeys>>
        >;
    }) => Promise<void>;
    children: (args: {
        fieldErrorMessages: FieldErrorMessages<TFormInputs, TFieldKeys>;
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => React.ReactNode;
    className?: string;
};

export const Form = <TFormInputs extends {}, TFieldKeys extends keyof TFormInputs>({
    onSubmit,
    children,
    className = "",
}: FormProps<TFormInputs, TFieldKeys>) => {
    const [formInputs, setFormInputs] = useState<TFormInputs>({} as TFormInputs);
    const [fieldErrorMessages, setFieldErrorMessages] = useState<
        FieldErrorMessages<TFormInputs, TFieldKeys>
    >({} as FieldErrorMessages<TFormInputs, TFieldKeys>);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetFieldName = event.target.name as TFieldKeys;
        const targetValue = event.target.value as TFormInputs[TFieldKeys];
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
