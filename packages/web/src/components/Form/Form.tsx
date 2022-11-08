import React, { useState } from "react";

// https://qiita.com/yuma84/items/72f72a2fff987d3de28a
type FieldErrorMessages<TFieldKeys extends string> = { [key in TFieldKeys]: string };

type FormProps<TFormInputs, TFieldKeys extends string> = {
    onSubmit: (args: {
        values: TFormInputs;
        setFieldErrorMessages: React.Dispatch<React.SetStateAction<FieldErrorMessages<TFieldKeys>>>;
    }) => Promise<void>;
    children: (args: {
        fieldErrorMessages: FieldErrorMessages<TFieldKeys>;
        setFormInputs: React.Dispatch<React.SetStateAction<TFormInputs>>;
    }) => React.ReactNode;
    className?: string;
};

export const Form = <TFormInputs extends {}, TFieldKeys extends string>({
    onSubmit,
    children,
    className = "",
}: FormProps<TFormInputs, TFieldKeys>) => {
    const [formInputs, setFormInputs] = useState<TFormInputs>({} as TFormInputs);
    const [fieldErrorMessages, setFieldErrorMessages] = useState<FieldErrorMessages<TFieldKeys>>(
        {} as FieldErrorMessages<TFieldKeys>
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSubmit({ values: formInputs, setFieldErrorMessages });
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className={`${className}`} onSubmit={handleSubmit}>
            {children({ setFormInputs, fieldErrorMessages })}
        </form>
    );
};
