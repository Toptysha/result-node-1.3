const yargs = require("yargs");
const { getNotes, addNote, removeNote } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: { type: "string", describe: "Note title", demandOption: true },
  },
  handler({ title }) {
    addNote(title);
    console.log("Note added successfully", title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    const notes = await getNotes();
    console.log("Here is the list of notes:");
    notes.forEach(({ id, title }) => console.log(id, title));
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: { type: "string", describe: "Note id", demandOption: true },
  },
  handler({ id }) {
    removeNote(id);
    console.log("Note deleted successfully");
  },
});

yargs.parse();
