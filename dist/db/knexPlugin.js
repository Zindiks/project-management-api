"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const knexPlugin = (0, fastify_plugin_1.default)(async (fastify, opts) => {
    const db = (0, knex_1.default)(knexfile_1.default.development);
    fastify.decorate("knex", db);
    fastify.addHook("onClose", (instance, done) => {
        instance.knex.destroy();
        done();
    });
});
exports.default = knexPlugin;
