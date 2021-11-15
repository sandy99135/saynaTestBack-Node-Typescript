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
const base_controller_1 = require("../core/interfaces/base-controller");
const isEmpty_validator_1 = require("../core/validators/isEmpty.validator");
var bcrypt = require("bcryptjs");
var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const UserTable = require("../core/models/mongoose-model/user-mongoose.model");
var jwt = require("jsonwebtoken");
class UserController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.resp = null;
    }
    registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let reqBody = this.request.body;
                if (!new isEmpty_validator_1.IsEmptyValidatorRegister().isEmpty(reqBody)) {
                    this.response.status = 401;
                    this.resp = {
                        error: true,
                        message: "Tous les champs sont obligatoire",
                    };
                }
                else if (!new isEmpty_validator_1.IsEmptyValidatorRegister().isEmailValid(reqBody.email)) {
                    this.response.status = 401;
                    this.resp = {
                        error: true,
                        message: "Email non valide",
                    };
                }
                else {
                    reqBody.password = bcrypt.hashSync(reqBody.password, 8);
                    const user = new UserTable(reqBody);
                    this.response.status = 201;
                    const userExisted = yield UserTable.findOne({ email: reqBody.email });
                    if (userExisted != null) {
                        console.log("userExisted", userExisted);
                        this.response.status = 401;
                        this.resp = {
                            error: true,
                            message: "Cet email existe deja",
                        };
                    }
                    else {
                        const userSaved = yield user.save();
                        var token = jwt.sign({ id: user._id }, 'secret', {
                            expiresIn: 86400 // 24 hours
                        });
                        console.log(token);
                        this.resp = {
                            error: false,
                            message: "L'utilisateur a bien été crée avec succès",
                        };
                    }
                }
                this.response.body = this.resp;
                console.log(this.response.body);
            }
            catch (error) {
                this.response.status = 500;
                const err = {
                    error: false,
                    message: "Erreur survenu",
                };
                console.log(error);
                this.response.body = err;
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let reqBody = this.request.body;
                const user = yield UserTable.findOne({ email: reqBody.email });
                let error = { count: 0, limiteError: 5 };
                if (user == null) {
                    this.response.status = 401;
                    error.count += 1;
                    console.log(error);
                    if (error.count >= error.limiteError) {
                        this.resp = {
                            error: true,
                            message: "Trop de tentative sur le mail , veuillez reessayer après 1h",
                        };
                    }
                    else {
                        localStorage.removeItem("x-access-token");
                        this.resp = {
                            error: true,
                            message: "Votre email ou passord est erroné",
                        };
                    }
                }
                else {
                    var passwordIsValid = bcrypt.compareSync(reqBody.password, user.password);
                    if (!passwordIsValid) {
                        localStorage.removeItem("x-access-token");
                        this.response.status = 401;
                        this.resp = {
                            error: true,
                            message: "Votre email ou passord est erroné",
                        };
                    }
                    else {
                        this.response.status = 201;
                        var token = jwt.sign({ id: user._id }, 'secret', {
                            expiresIn: 3600 // 24 hours
                        });
                        localStorage.setItem("x-access-token", token);
                        console.log(token);
                        this.resp = {
                            error: false,
                            message: "L'utilisateur a bien été crée avec succès",
                            token: {
                                token: token,
                                createdAt: new Date().toString(),
                                refresh_token: 3600
                            }
                        };
                    }
                }
                this.response.body = this.resp;
                console.log(this.response.body);
            }
            catch (error) {
                this.response.status = 500;
                const err = {
                    error: false,
                    message: "Erreur survenu",
                };
                console.log(error);
                this.response.body = err;
            }
        });
    }
    verifyToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = localStorage.getItem("x-access-token");
            console.log("token", token);
            if (token == null || token == undefined) {
                this.resp = {
                    error: true,
                    message: "le token envoyé n' existe pas",
                };
                console.log("logeo ny erreur", this.resp);
            }
            else {
                try {
                    let decoded = yield jwt.verify(token, "secret");
                    console.log(decoded);
                    if (decoded != null || decoded != undefined) {
                        this.resp = {
                            error: false,
                            message: "token verifié avec succès",
                        };
                    }
                    else {
                        this.resp = {
                            error: true,
                            message: "Votre token n' est plus valide , veuillez le réinitialiser",
                        };
                    }
                }
                catch (error) {
                    console.log(error);
                    this.response.status = 500;
                    const err = {
                        error: false,
                        message: "Erreur survenu",
                    };
                    this.response.body = err;
                }
            }
            return this.resp;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.verifyToken();
                console.log("response", response);
                if (response.error) {
                    this.response.status = 401;
                    this.response.body = response;
                }
                else {
                    const users = yield UserTable.find();
                    this.response.status = 200;
                    this.response.body = { error: false, users: users };
                }
                console.log(this.response);
            }
            catch (error) {
                console.log(error);
                this.response.status = 500;
                const err = {
                    error: false,
                    message: "Erreur survenu",
                };
                this.response.body = err;
            }
        });
    }
    getUserById() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.verifyToken();
                console.log("response", response);
                if (response.error) {
                    this.response.status = 401;
                    this.response.body = response;
                }
                else {
                    const users = yield UserTable.findById(this.request.parms._id);
                    if (users == null) {
                        this.response.status = 401;
                        this.response.body = { error: true, message: "cet utilisateur n' existe pas" };
                    }
                    else {
                        this.response.status = 200;
                        this.response.body = { error: false, users: users };
                    }
                }
                console.log(this.response);
            }
            catch (error) {
                console.log(error);
                this.response.status = 500;
                const err = {
                    error: false,
                    message: "Erreur survenu",
                };
                this.response.body = err;
            }
        });
    }
    EditUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.verifyToken();
                console.log("response", response);
                if (response.error) {
                    this.response.status = 401;
                    this.response.body = response;
                }
                else {
                    let reqBody = this.request.body;
                    console.log(reqBody);
                    const users = yield UserTable.findById(this.request.body._id);
                    if (users == null) {
                        this.response.status = 401;
                        this.response.body = { error: true, message: "cet utilisateur n' existe pas" };
                    }
                    else {
                        let result = yield UserTable.findOneAndUpdate({ _id: this.request.body._id }, reqBody);
                        console.log(result);
                        this.response.status = 200;
                        this.response.body = { error: false, message: "modification effectué avec succès" };
                    }
                }
                console.log(this.response);
            }
            catch (error) {
            }
        });
    }
    deconnectUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                localStorage.removeItem("x-access-token");
                this.response.status = 200;
                this.response.body = { error: false, message: "deconnection effectué avec succès" };
                console.log(this.response);
            }
            catch (error) {
                console.log(error);
                this.response.status = 500;
                const err = {
                    error: false,
                    message: "Erreur survenu",
                };
                this.response.body = err;
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map