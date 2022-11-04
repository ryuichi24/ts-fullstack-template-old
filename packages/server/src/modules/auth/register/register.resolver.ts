import { ResolverMap } from "../../../types/graphql.js";
import { RegisterResponse } from "../../../__generated__/graphql.js";

const resolvers: ResolverMap = {
    Mutation: {
        register: async (_, args, context, info): Promise<RegisterResponse> => {
            return {
                errors: [],
                user: {},
            };
        },
    },
};

export default resolvers;
