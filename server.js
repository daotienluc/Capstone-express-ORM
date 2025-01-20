import express from "express";
import rootRouter from "./src/routers/root.routers.js";
import { handleError } from "./src/common/helpers/error.helper.js";
const app = express();
app.use(express.json());

app.use(rootRouter);

app.use(handleError);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running with port ${port}`);
});
