import { BadRequestGQLError } from "../../../errors/BadRequestGQLError.js";
import { RegisterInput } from "../../../__generated__/graphql.js";

const PASSWORD_LENGTH = 7;
const EMAIL_REGEX =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const validateRegisterInput = (input: RegisterInput) => {
    if (!EMAIL_REGEX.test(input?.email)) {
        throw new BadRequestGQLError("invalid email format", "email");
    }

    if (input.password.length < PASSWORD_LENGTH) {
        throw new BadRequestGQLError(`password must be loner than ${PASSWORD_LENGTH}`, "password");
    }
};
