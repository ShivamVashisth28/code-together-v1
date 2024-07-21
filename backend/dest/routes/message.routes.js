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
const db_1 = require("../utils/db");
const router = (0, express_1.Router)();
router.post('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get to and from id from params/body
    const fromId = req.body.from;
    const toId = req.body.to;
    try {
        const messages = yield (0, db_1.getMessage)(fromId, toId);
        if (messages) {
            return res.json({
                messages
            });
        }
        else {
            return res.status(400).json({ error: "no message found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "error in finding messages" });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get from id from the token
    const content = req.body.content;
    const toId = Number(req.body.to);
    const fromId = Number(req.body.from);
    const date = new Date();
    // const time = `${date.getHours()} : ${date.getMinutes()} || ${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`;
    const time = date.getHours();
    try {
        const mesg = yield (0, db_1.putMessage)(fromId, toId, content, time);
        if (mesg == null) {
            return res.status(400).json({ error: "error in putting message" });
        }
        res.json({
            mesg
        });
    }
    catch (error) {
        return res.status(400).json({ error: "can't send message" });
    }
}));
exports.default = router;
