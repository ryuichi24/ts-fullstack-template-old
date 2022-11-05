import { createError } from "../../../utils/createError.js";
import { FieldError, RegisterInput } from "../../../__generated__/graphql.js";

const PASSWORD_LENGTH = 7;
const EMAIL_REGEX =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const validateRegisterInput = (input: RegisterInput): FieldError[] | null => {
    if (!EMAIL_REGEX.test(input?.email)) {
        return [createError({ message: "invalid email format", field: "email" })];
    }

    if (input.password.length < PASSWORD_LENGTH) {
        return [
            createError({
                message: `password must be loner than ${PASSWORD_LENGTH}`,
                field: "password",
            }),
        ];
    }

    return null;
};
