import express from "express";
import Blog from '../models/blog.js'

const router = express.Router();

router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Blogs Create" });
});

router.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

router.post("/blogs", (req, res) => {
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

router.get("/blog/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) =>
      res.render("details", { blog: result, title: "Blogs Details" }),
    )
    .catch((err) => console.log(err));
});

router.delete("/blog/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

export default router