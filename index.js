const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes-controller");

yargs(hideBin(process.argv))
  .version(pkg.version)
  .command({
    command: "add",
    describe: "Add new note list",
    builder: {
      title: {
        type: "string",
        describe: "Note title",
        demandOption: true,
      },
    },
    handler(argv) {
      addNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "Print all notes",
    handler() {
      printNotes();
    },
  })
  .command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
      id: {
        type: "string",
        describe: "Note uniq id",
        demandOption: true,
      },
    },
    handler(argv) {
      removeNote(argv.id);
    },
  })
  .parse();
