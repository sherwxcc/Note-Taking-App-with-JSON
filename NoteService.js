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
        console.log("I'm adding note (user = true)");
        return this.write(notesDataParsed);
      } else {
        notesDataParsed[user] = new Array(note);
        console.log("I'm adding note (user = false)");
        return this.write(notesDataParsed);
      }
    });
  }

  editNote(note, index, user) {
    return this.init().then((notesDataParsed) => {
      notesDataParsed[user][index] = note;
      console.log("I'm editing note, index = ", index);
      return this.write(notesDataParsed);
    });
  }

  deleteNote(index, user) {
    return this.init().then((notesDataParsed) => {
      notesDataParsed[user].splice(index, 1);
      console.log("I'm deleting note, index = ", index);
      return this.write(notesDataParsed);
    });
  }
}

module.exports = NoteService;

// read() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(__dirname + this.file, "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// }
