"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    res.json({
        message: 'get room by id'
    });
});
router.get('/all', (req, res) => {
    res.json({
        message: 'get all rooms list'
    });
});
router.post('/', (req, res) => {
    res.json({
        message: 'create room '
    });
});
exports.default = router;
