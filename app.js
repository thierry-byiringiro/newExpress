import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.listen(3000);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirecting
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 - Error page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
