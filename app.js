// Require node modules
const express = require("express");
const app = express();
const path = require("path");

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main.handlebars" }));
app.set("view engine", "handlebars");

// Set up basic auth
const fs = require("fs");
const basicAuth = require("express-basic-auth");
const myAuthorizer = (users) => {
  return (username, password) => {
    return (
      typeof users[username] !== "undefined" && users[username] === password
    );
  };
};

app.use(
  basicAuth({
    authorizer: myAuthorizer(
      JSON.parse(fs.readFileSync("./data/userData.json"))
    ),
    challenge: true,
  })
);

// Set up static folder & middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

// Set up note service and router
const NoteService = require("./NoteService");
const NoteRouter = require("./NoteRouter");
const noteService = new NoteService("/data/noteData.json");
const noteRouter = new NoteRouter(noteService);

// Set up port
const port = 8080;
app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

// Home-page route
app.get("/", (req, res) => {
  noteService.listNote(req.auth.user).then((notesDataParsed) => {
    res.render("home", {
      user: req.auth.user,
      notes: notesDataParsed,
    });
  });
});

// Note-data route
app.use("/api/notes", noteRouter.router());

module.exports = app;
