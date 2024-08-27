"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = __importDefault(require("fastify"));
// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"
// import swagger from "@fastify/swagger-ui"
// import {withRefResolver} from "fastify-zod";
const boards_schema_1 = require("./modules/boards/boards.schema");
const boards_route_1 = require("./modules/boards/boards.route");
const cors_1 = __importDefault(require("@fastify/cors"));
exports.server = (0, fastify_1.default)({ logger: true });
exports.server.get("/healthcheck", (req, res) => {
  return res.status(200).send("Ok!");
});
async function main() {
  for (const schema of [...boards_schema_1.boardSchemas]) {
    exports.server.addSchema(schema);
  }
  await exports.server.register(cors_1.default, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });
  exports.server.register(
    Promise.resolve().then(() => __importStar(require("@fastify/swagger"))),
  );
  exports.server.register(
    Promise.resolve().then(() => __importStar(require("@fastify/swagger-ui"))),
    {
      routePrefix: "/docs",
    },
  );
  exports.server.register(boards_route_1.boardRoutes, {
    prefix: "api/boards",
  });
  // server.register(productRoutes, {
  //     prefix: "api/products"
  // })
  exports.server.get("/", (req, res) => {
    console.log(req.params);
    res.send({ data: "it works" });
  });
  exports.server.listen(
    {
      port: 4000,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        exports.server.log.error(err);
        process.exit(1);
      }
      exports.server.log.info(`Server listening at ${address}`);
    },
  );
}
main();
