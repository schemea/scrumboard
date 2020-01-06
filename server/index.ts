import express from "express";
import * as path from "path";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));
app.use(express.static(path.resolve("./dist/www")));

const server = app.listen(process.env.PORT || 8080, () => {
    console.log("listening to", server.address());
});
