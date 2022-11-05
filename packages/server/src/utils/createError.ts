export const createError = ({ message, field }: { message?: string; field?: string }) => {
    return { message, field };
};
