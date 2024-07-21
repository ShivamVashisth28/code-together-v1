"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.checkToken = exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'secret';
const generateToken = (username) => {
    const token = jsonwebtoken_1.default.sign(username, secretKey);
    return token;
};
exports.generateToken = generateToken;
const checkToken = (username, token) => {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        console.log('error');
        return 'invalid token';
    }
    if (decoded) {
        return decoded == username;
    }
};
exports.checkToken = checkToken;
const decodeToken = (token) => {
    const username = jsonwebtoken_1.default.decode(token);
    return username;
};
exports.decodeToken = decodeToken;
