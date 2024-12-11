import { createServer } from "./bootstrap";
import { config } from "./configs/config";

async function main() {
  const server = await createServer();

  server.listen(
    {
      port: config.api.port,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server listening at ${address}`);
    },
  );
}

main();
