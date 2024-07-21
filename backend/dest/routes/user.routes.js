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
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const db_1 = require("../utils/db");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user details
    const details = req.body;
    if (!details) {
        return res.status(400).json({ error: "Cant find User" });
    }
    // check whether details are valid or not
    try {
        const user = yield (0, db_1.getUser)(details.username);
        if (!user) {
            return res.status(400).json({ error: "Cant find User" });
        }
        if (!((user === null || user === void 0 ? void 0 : user.password) == details.password)) {
            return res.status(400).json({ error: "invalid password" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: "Cant get the user" });
    }
    // generate token
    const token = (0, auth_1.generateToken)(details.username);
    // return the token
    res.json({ message: "loggedin successfully", token });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user details
    const details = req.body;
    if (!details) {
        return res.status(400).json({ error: "Invalid details" });
    }
    // find user is alreay there or not
    try {
        const userAlready = yield (0, db_1.getUser)(details.username);
        if (!userAlready) {
        }
        else {
            return res.status(400).json({ error: "user already exists with same username" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: "Error in connection with database" });
    }
    try {
        const user = (0, db_1.createUser)(details.username, details.email, details.password);
        if (user == null) {
            return res.status(400).json({ error: "cant create a new user" });
        }
    }
    catch (error) {
        return res.status(400).json({ error: "cant create a new user" });
    }
    // generate token
    const token = (0, auth_1.generateToken)(details.username);
    // return the token
    if (!token) {
        return res.status(400).json({ error: "Creaeted user but no token error" });
    }
    res.json({
        message: "signup success",
        token,
    });
}));
router.get('/logout', (req, res) => {
    // clear the token
    res.json({ message: 'bye' });
});
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, db_1.getAllUsers)();
        if (!users) {
            return res.status(400).json({ error: "cant find all users" });
        }
        res.json({
            users
        });
    }
    catch (error) {
        return res.status(400).json({ error: "cant find all users error" });
    }
}));
router.get('/id/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    try {
        const user = yield (0, db_1.getUser)(username);
        res.json(user === null || user === void 0 ? void 0 : user.id);
    }
    catch (error) {
        return res.status(400).json({ error: "error in getting userId" });
    }
}));
router.get('/username/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield (0, db_1.getUserById)(id);
        res.json(user === null || user === void 0 ? void 0 : user.username);
    }
    catch (error) {
        return res.status(400).json({ error: "error in getting userId" });
    }
}));
exports.default = router;
