"use strict";
// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"
// import swagger from "@fastify/swagger-ui"
// import {withRefResolver} from "fastify-zod";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const boards_schema_1 = require("./modules/boards/boards.schema");
const lists_schema_1 = require("./modules/lists/lists.schema");
const cards_schema_1 = require("./modules/cards/cards.schema");
const boards_route_1 = require("./modules/boards/boards.route");
const lists_route_1 = require("./modules/lists/lists.route");
const cards_route_1 = require("./modules/cards/cards.route");
const fastify_metrics_1 = __importDefault(require("fastify-metrics"));
const cors_1 = __importDefault(require("@fastify/cors"));
const knexPlugin_1 = __importDefault(require("./db/knexPlugin"));
const server = (0, fastify_1.default)({
    logger: {
        level: "info",
    },
}).withTypeProvider();
server.register(knexPlugin_1.default);
server.register(Promise.resolve().then(() => __importStar(require("@fastify/swagger"))), {
    openapi: {
        info: {
            title: "API Documentation",
            description: "API for managing borders and lists",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
        components: {},
        security: [],
    },
});
server.register(Promise.resolve().then(() => __importStar(require("@fastify/swagger-ui"))), {
    routePrefix: "/docs",
});
server.register(boards_route_1.boardRoutes, {
    prefix: "api/boards",
});
server.register(lists_route_1.listRoutes, {
    prefix: "api/lists",
});
server.register(cards_route_1.cardRoutes, {
    prefix: "api/cards",
});
server.register(fastify_metrics_1.default, { endpoint: "/metrics" });
async function main() {
    for (const schema of [...boards_schema_1.boardSchemas, ...lists_schema_1.listSchemas, ...cards_schema_1.cardSchemas]) {
        server.addSchema(schema);
    }
    await server.register(cors_1.default, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    });
    server.listen({
        port: 4000,
        host: "0.0.0.0",
    }, (err, address) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        server.log.info(`Server listening at ${address}`);
    });
}
main();
