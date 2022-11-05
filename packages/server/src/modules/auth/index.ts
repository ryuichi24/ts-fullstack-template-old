import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import sharedTypeDefs from "./shared.typeDefs.js";
import registerResolver from "./register/register.resolver.js";
import registerTypeDefs from "./register/register.typeDefs.js";
import confirmEmailTypeDefs from "./confirmEmail/confirmEmail.typeDefs.js";
import confirmEmailResolver from "./confirmEmail/confirmEmail.resolver.js";
import checkAuthTypeDefs from "./checkAuth/checkAuth.typeDefs.js";
import checkAuthResolver from "./checkAuth/checkAuth.resolver.js";
import loginTypeDefs from "./login/login.typeDefs.js";
import loginResolver from "./login/login.resolver.js";

export const authResolvers = mergeResolvers([
    registerResolver,
    confirmEmailResolver,
    checkAuthResolver,
    loginResolver,
]);
export const authTypeDefs = mergeTypeDefs([
    sharedTypeDefs,
    registerTypeDefs,
    confirmEmailTypeDefs,
    checkAuthTypeDefs,
    loginTypeDefs,
]);
