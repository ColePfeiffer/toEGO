import { date } from "quasar";

export default function () {
  return {
    diaryEntriesDownloaded: false,
    notesDownloaded: false,
    diaryEntryRef: "",
    currentNote: {
      id: "",
      mood: "las la-meh-blank",
      title: "",
      editor: "",
      date: "",
      expanded: false,
    },
    diaryEntries: [],
    /*
    notes: {
      notesContainer: {
        note1: "",
        note2: ""
      },
    }  */
    notes: {},
  };
}
