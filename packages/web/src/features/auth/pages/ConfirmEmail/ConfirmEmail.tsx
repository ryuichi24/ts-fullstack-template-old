import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmEmailMutation } from "@/__generated__/graphql";

type ConfirmEmailProps = {};

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({}) => {
    const [searchParams] = useSearchParams();
    const [confirmEmail] = useConfirmEmailMutation();
    const navigate = useNavigate();

    const handleEmailConfirmToken = useCallback(async () => {
        const token = searchParams.get("token");
        if (!token) {
            return;
        }
        await confirmEmail({ variables: { confirmEmailInput: { token } } });
        navigate("/app/", { replace: true });
    }, [searchParams, confirmEmail, navigate]);

    useEffect(() => {
        handleEmailConfirmToken().catch((err) => console.log(err));
    }, [handleEmailConfirmToken]);
    return <></>;
};
