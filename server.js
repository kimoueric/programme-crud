let express = require("express");
let bodyParser = require("body-parser");
var session = require("express-session");

var app = express();

app.use(
  session({
    secret: "nlabla",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("./middlewares/flash"));

app.get("/", (request, response) => {
  response.render("./pages/index");
});
app.get("/inserer", (request, response) => {
  response.render("./pages/inserer");
});
app.get("/utilisateurs", (request, response) => {
  let Utilisateurs = require("./models/utilisateurs");
  Utilisateurs.allUser(function (utilisateurs) {
    response.render("./pages/utilisateurs", { utilisateurs: utilisateurs });
  });
});

app.post("/inserer", (request, response) => {
  let Utilisateurs = require("./models/utilisateurs");
  let lenom = request.body.nom;
  let leprenom = request.body.prenom;
  let laprofession = request.body.profession;

  Utilisateurs.createUser(lenom, leprenom, laprofession, function () {
    request.flash("succes", "Votre utilisateur a ete ajoute");
    response.redirect("/inserer");
  });
});
app.get("/supprimer/:id", (request, response) => {
  let Utilisateurs = require("./models/utilisateurs");
  Utilisateurs.deleteUser(request.params.id, function (row) {
    response.redirect("/utilisateurs");
  });
});

app.get("/modifier/:id", (request, response) => {
  let leid = request.params.id;
  let Utilisateurs = require("./models/utilisateurs");
  Utilisateurs.OnUser(leid, function (utilisateurs) {
    response.render("./pages/modifier", { utilisateurs: utilisateurs });
  });
});

app.post("/modifier/:id", (request, response) => {
  let leid = request.params.id;
  let lenom = request.body.nom;
  let leprenom = request.body.prenom;
  let laprofession = request.body.profession;
  let Utilisateurs = require("./models/utilisateurs");
  Utilisateurs.UpdateUser(leid, lenom, leprenom, laprofession, function (row) {
    response.redirect("/utilisateurs");
  });
});

app.listen(3000);
