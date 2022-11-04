import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import sharedTypeDefs from "./shared.typeDefs.js";
import registerResolver from "./register/register.resolver.js";
import registerTypeDefs from "./register/register.typeDefs.js";

export const authResolvers = mergeResolvers([registerResolver]);
export const authTypeDefs = mergeTypeDefs([sharedTypeDefs, registerTypeDefs]);
