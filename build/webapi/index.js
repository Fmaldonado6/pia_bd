"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./../persistence/database");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var PORT = 'port';
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set(PORT, process.env.PORT || 4000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        database_1.database.connect();
    };
    Server.prototype.routes = function () {
        this.app.use("/", function (req, res) {
            res.send("Buenas");
        });
    };
    Server.prototype.start = function () {
        var port = this.app.get(PORT);
        this.app.listen(port, function () {
            console.log("App listening on port " + port);
        });
    };
    return Server;
}());
var server = new Server();
server.start();
