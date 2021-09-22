const NoteService = require("../NoteService");
const fs = require("fs");
const file = "/tests/tests/tests.json";

describe("Note Service with a properfile", () => {
  beforeEach(() => {
    fs.writeFileSync("./tests/tests.json", "");
    this.noteService = new NoteService(file);
  });

  // Testing initiation
  test("Should list empty note when upon initiation", () => {
    return this.noteService.init().then((notes) => expect(notes).toEqual({}));
  });

  // Testing add note
  test("Should be able to add a note in JSON", () => {
    return this.noteService
      .addNote("testing", "sher")
      .then(() => this.noteService.init())
      .then((notes) => {
        expect(notes).toEqual({
          sher: ["testing"],
        });
      });
  });

  // Testing list note
  test("Should return a note from the user's note array", () => {
    return this.noteService
      .addNote("testing", "sher")
      .then(() => this.noteService.listNote("sher"))
      .then((notes) => {
        expect(notes).toEqual(["testing"]);
      });
  });

  // Testing edit note
  test("Should be able to edit a note", () => {
    return this.noteService
      .addNote("testing", "sher")
      .then(() => this.noteService.editNote("edited this", 0, "sher"))
      .then(() => this.noteService.init())
      .then((notes) => {
        expect(notes).toEqual({
          sher: ["edited this"],
        });
      });
  });

  // Testing delete note
  test("Should be able to delete a note", () => {
    return this.noteService
      .addNote("testing", "sher")
      .then(() => this.noteService.deleteNote(0, "sher"))
      .then(() => this.noteService.init())
      .then((notes) => {
        expect(notes).toEqual({
          sher: [],
        });
      });
  });
});
