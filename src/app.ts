import { server } from "./server";
import { serverConfig } from "./config/components/server.config";
import dotenv from "dotenv";
dotenv.config();

// Trigger the joi validation for env variables
import "./config/index";

const app = server();

const PORT: string = serverConfig.detail.port;
app.listen(PORT, async () => {
  try {
    console.log(`Server is listening on port: ${PORT} 👍`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
