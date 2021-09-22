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
const myAuthorizer = (usernameInput, passwordInput, callback) => {
  const USERS = fs.readFileSync(
    "./data/userData.json",
    "utf-8",
    async (err, data) => {
      if (err) {
        throw err;
      }
      return await data;
    }
  );
  let parsed = JSON.parse(USERS);
  let user = parsed.users.filter((user) => user.username == usernameInput);
  if (
    user[0].username === usernameInput &&
    user[0].password === passwordInput
  ) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};
app.use(
  basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: "Note Taking App",
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
