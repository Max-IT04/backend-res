const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const pkg = require('./package.json');
const { addNote, printNotes, removeNote } = require('./notes-controller');

const argv = yargs(hideBin(process.argv))
  .version(pkg.version)
  .command({
    command: 'add',
    describe: 'Add new note list',
    builder: {
      title: {
        type: 'string',
        describe: 'Note title',
        demandOption: true
      }
    },
    handler(title) {
      addNote(title)
    }
  })
  .command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
      async function printNotes() {
        printNotes();
      }}
  })
  .command({
    command: 'remove',
    describe: 'Print note by id',
    builder: {
      id: {
        type: 'string',
        describe: 'Note uniq id',
        demandOption: true
      }
    },
    async handler({ id }) {
      removeNote();
    }
  })
  .parse();

console.log(argv);