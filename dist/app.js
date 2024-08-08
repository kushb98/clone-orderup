"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = require("./routes/admin/authRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.send({ message: 'Welcome to OrderUp API' });
});
exports.app.use('/api/v1/auth', authRoutes_1.adminRouter);
exports.app.all('*', errorHandler_1.notFoundHandler);
exports.app.use(errorHandler_1.errorHandler);
exports.default = exports.app;
