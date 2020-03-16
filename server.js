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

function getNotes(path, encoding) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, encoding, function(err, data) {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

function setNotes(path, content, encoding) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, content, encoding, function(err) {
      if (err) {
        return reject(err);
      }
    });
  });
}

// **Routes**

// notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "notes.html"));
});

// current notes on file
app.get("/api/notes", function(req, res) {
  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
  .then(function(allNotes) {
    return res.json(allNotes);
  })
  .catch(function(err) {
    console.log(err);
  });
});

// Displays a single note, or returns false
app.get("/api/notes/:id", function(req, res) {
  const chosen = req.params.id;
  console.log(chosen);
  
  //get the notes, give back the one at the chosen index
  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
  .then(function(allNotes) {
    const thisNote = allNotes[chosen];
    console.log(`thisNote: ${thisNote}`)
    return res.json(thisNote);
  })
  .catch(function(err) {
    console.log(err);
  });
  return res.json(false);
});

// default (index) page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//add new note
app.post("/api/notes", function(req, res) {
  const newNote = req.body;

  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
  .then((allNotes) => {
    newNote.id = allNotes.length;
    allNotes.push(newNote);
    setNotes(path.join(__dirname, "db", "db.json"), JSON.stringify(allNotes), "utf8")
    .then(() => {
      //nothing?
    })
    .catch(function(err) {
      console.log(err);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
});

//delete a note
app.delete("/api/notes/:id", function(req, res){
  const thisNote = req.body;
  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
  .then((allNotes) => {
    allNotes.splice(thisNote.id, 1);
    setNotes(path.join(__dirname, "db", "db.json"), JSON.stringify(allNotes), "utf8")
    .then(() => {
      //nothing?
    })
    .catch(function(err) {
      console.log(err);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
