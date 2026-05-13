import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Blog from "./models/blog.js";

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
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Blogs Create" });
});
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log("saving the data failed"));
});

app.get("/blog/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) =>
      res.render("details", { blog: result, title: "Blogs Details" }),
    )
    .catch((err) => console.log(err));
});

app.delete("/blog/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});
//redirecting
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
//404 - Error page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
