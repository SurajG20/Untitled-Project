"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var connectDB = function (url) {
    mongoose_1.default.set('strictQuery', false);
    return mongoose_1.default.connect(url);
};
exports.default = connectDB;
//# sourceMappingURL=connect.js.map