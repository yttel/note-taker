//copy & paste section
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// **DATA**
let notes = [{
  "title":"Test Title",
  "text":"Test text"
},{
  "title":"Test Title",
  "text":"Test text"
}];

//read notes from file
function getNotes(){
  const allNotes = "";
  
  return allNotes;
}

//save notes to file
function setNotes(allNotes){
  fs.writeFile("./db/db.json", allNotes, function(err){
    if (err) {
        throw err;
    } 
    else {
        console.log("notes saved");
    }
  });
}

// **Routes**

// default (index) page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// current notes on file
app.get("/api/notes", function(req, res) {
  //read in notes using fs
  return res.json(notes);
});

// Displays a single character, or returns false
app.get("/api/notes/:id", function(req, res) {
  const chosen = req.params.id;

  console.log(chosen);

  for (const i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

//add new note
app.post("/api/notes", function(req, res) {
  const newNote = req.body;

  console.log(newNote);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
