const express = require("express");

class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:index", this.put.bind(this));
    router.delete("/:index", this.delete.bind(this));
    return router;
  }

  get(req, res) {
    console.log("GET request");
    this.noteService
      .listNote(req.auth.user)
      .then((notesDataParsed) => {
        res.json(notesDataParsed);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  post(req, res) {
    console.log("POST request");
    this.noteService.addNote(req.body.note, req.auth.user).then(() => {
      this.noteService
        .listNote(req.auth.user)
        .then((notesDataParsed) => {
          res.json(notesDataParsed);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  }

  put(req, res) {
    console.log("PUT request");
    this.noteService
      .editNote(req.body.note, req.params.index, req.auth.user)
      .then(() => {
        this.noteService
          .listNote(req.auth.user)
          .then((notesDataParsed) => {
            res.json(notesDataParsed);
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      });
  }

  delete(req, res) {
    console.log("DELETE request");
    this.noteService.deleteNote(req.params.index, req.auth.user).then(() => {
      this.noteService
        .listNote(req.auth.user)
        .then((notesDataParsed) => {
          res.json(notesDataParsed);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  }
}

module.exports = NoteRouter;
