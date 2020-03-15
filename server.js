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

//read notes from file, returns notes as obj
function getNotes(){
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", function(err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
}

//save notes to file
function setNotes(allNotes){
  fs.writeFile(path.join(__dirname, "db", "db.json"), allNotes, function(err){
    if (err) {
        throw err;
    } 
    else {
        console.log("notes saved");
    }
  });
}

// **Routes**

// notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "notes.html"));
});

// current notes on file
app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", function(err, data) {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

// Displays a single ch, or returns false
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
  let allNotes;
  console.log(newNote);
  
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", function(err, data) {
    if (err) throw err;
    allNotes = JSON.parse(data);
  });
  console.log(`allNotes: ${allNotes}`);
  allNotes.push(newNote);

  fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(allNotes), function(err){
    if (err) throw err;
    else {
        console.log("notes saved");
    }
  });

});

// default (index) page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
