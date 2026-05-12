import app from "./app.js";
import { logger } from "./logger.js";

const port = Number(process.env.PORT ?? 8080);

app.listen(port, (err?: Error) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
