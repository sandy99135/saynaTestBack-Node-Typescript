"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    date_naissance: String,
    email: String,
    password: String,
    sexe: String
});
const user = mongoose.model("User", userSchema);
module.exports = user;
//# sourceMappingURL=user-mongoose.model.js.map