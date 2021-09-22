# Noted With Thanks :notebook_with_decorative_cover:

A note taking application with with JSON file storage.

This application contain a basic authentication system, and each user can create, update and delete notes that they input.

Responsive UI design that allows dynamic changes of the app to best fit your differently sized viewports.

## Installation :computer:

To start, please clone the application, install the node modules dependencies and run `npm <filename>` before use.

Install via [npm](https://www.npmjs.com/)

```
$ npm install
```

## How To Use

#### LOG IN

- This application make use of express basic authetication.

- A sign in request will show up when you first visit the app, simply enter the correct username and password and hit `Sign in`.

- Within the same browser, you will not need to log in again.

#### CREATE NOTE

- To create a new note, you can type it in the textarea on the left hand side.

- If you want to clear the text, simply click on the `Clear` button on top of the textarea to reset.

- When you are ready with your new note, click on the `Add` button on top to post your note to the server.

- All your created notes should appear on the right hand side of the app.

#### EDIT NOTE

- To edit a note, first click on the target note to initiate the editor mode, a pair of `Tick button` and `Cross button` should appears on the bottom-left.

- Then you can change any text inside the note.

- If you change your mind and want to discard changed made to the note, you can click on the `Cross button` to return and restore.

- If you are ready to save your changes, you can click on the `Tick button` to update your note.

#### DELETE NOTE

- If you wish to delete any uploaded note from the server, simply click on the `Bin button` on the bottom-right of the targeted note.
