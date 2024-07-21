"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMessage = exports.getMessage = exports.createUser = exports.getAllUsers = exports.getUserById = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        return user;
    }
    catch (error) {
        return null;
    }
});
exports.getUser = getUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: id
            }
        });
        return user;
    }
    catch (error) {
        return null;
    }
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        return users;
    }
    catch (error) {
        return null;
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });
        console.log(res);
        return res;
    }
    catch (error) {
        return null;
    }
});
exports.createUser = createUser;
const getMessage = (fromId, toId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.message.findMany({
        where: {
            fromId: fromId,
            toId: toId
        }
    });
    console.log(res);
    return res;
});
exports.getMessage = getMessage;
const putMessage = (fromId, toId, content, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.message.create({
            data: {
                fromId: fromId,
                toId: toId,
                content: content,
                time: time
            }
        });
        console.log(res);
        return res;
    }
    catch (error) {
        return null;
    }
});
exports.putMessage = putMessage;
