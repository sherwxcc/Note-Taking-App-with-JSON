const fs = require("fs");

class NoteService {
  constructor(file) {
    this.file = file;
    this.init();
  }

  init() {
    return new Promise((resolve, reject) => {
      let notesDataJson = fs.readFileSync(__dirname + this.file, "utf-8");
      if (Object.keys(notesDataJson).length > 0) {
        let notesDataParsed = JSON.parse(notesDataJson);
        resolve(notesDataParsed);
      } else {
        let notesDataParsed = {};
        resolve(notesDataParsed);
      }
    });
  }

  write(notesDataParsed) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        __dirname + this.file,
        JSON.stringify(notesDataParsed),
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(this.file);
        }
      );
    });
  }

  listNote(user) {
    return this.init().then((notesDataParsed) => {
      return notesDataParsed[user];
    });
  }

  addNote(note, user) {
    return this.init().then((notesDataParsed) => {
      if (notesDataParsed[user]) {
        notesDataParsed[user].push(note);
        return this.write(notesDataParsed);
      } else {
        notesDataParsed[user] = new Array(note);
        return this.write(notesDataParsed);
      }
    });
  }

  editNote(note, index, user) {
    return this.init().then((notesDataParsed) => {
      notesDataParsed[user][index] = note;
      return this.write(notesDataParsed);
    });
  }

  deleteNote(index, user) {
    return this.init().then((notesDataParsed) => {
      notesDataParsed[user].splice(index, 1);
      return this.write(notesDataParsed);
    });
  }
}

module.exports = NoteService;
