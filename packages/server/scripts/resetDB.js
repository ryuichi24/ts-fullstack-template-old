/* eslint-disable */
import { PrismaClient } from "@prisma/client";
import { exit } from "process";

const collections = ['user'];

const prisma = new PrismaClient();

async function resetDB() {
    await Promise.all(collections.map(collectionItem => prisma[collectionItem].deleteMany({})))
}

resetDB().catch((err) => {
    console.log(err);
    exit(1);
});
