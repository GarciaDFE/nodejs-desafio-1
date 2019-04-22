const express = require("express");
const nunjucks = require("nunjucks");
const appd1 = express();

/* CONFIGURAÇÃO DAS VIEWS */
nunjucks.configure("views", {
  autoescape: true,
  express: appd1,
  watch: true
});

appd1.use(express.urlencoded({ extended: false }));
appd1.set("view engine", "njk");

/* MIDDLEWARE */
const checkAge = (req, res, next) => {
  console.log(req);
  //   if (x != "") {
  //     console.log("vazio");
  //   } else {
  //     console.log("cheio");
  //   }
  return next();
};
checkAge.major = 18;

/* ROTAS */
appd1.get("/", (req, res) => {
  return res.render("form");
});

appd1.post("/check", (req, res) => {
  if (req.body.age >= checkAge.major) {
    return res.redirect("/major");
  } else {
    return res.redirect("/minor");
  }
});

appd1.get("/major", checkAge, (req, res) => {
  return res.render("major");
});

appd1.get("/minor", checkAge, (req, res) => {
  return res.render("minor");
});

appd1.listen(3000);
