const express = require("express");
const path = require("path");
const {
  getNotes,
  addNote,
  editNote,
  removeNote,
} = require("./notes.controller");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (request, response) => {
  response.render("index", {
    title: "Express application",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (request, response) => {
  await addNote(request.body.title);
  response.render("index", {
    title: "Express application",
    notes: await getNotes(),
    created: true,
  });
});

app.put("/:id", async (request, response) => {
  await editNote(request.params.id, request.body.title);
  response.render("index", {
    title: "Express application",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (request, response) => {
  await removeNote(request.params.id);
  response.render("index", {
    title: "Express application",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
