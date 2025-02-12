import jsonServer from "json-server";
import cors from "cors";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join("db.json"));
location;
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

server.use("/api", router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
