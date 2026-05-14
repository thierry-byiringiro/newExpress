import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import blogRoutes from './routes/blogRoutes.js'

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const dbURI =
  "mongodb+srv://aimetiti8:byiringiro@nodetuts.fiqcyby.mongodb.net/?appName=nodetuts";
mongoose
  .connect(dbURI)
  .then((el) => app.listen(3000))
  .catch((e) => console.log("error occured"));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//blogs
app.use(blogRoutes)

//redirecting
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 - Error page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
