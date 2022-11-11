import { date } from "quasar";

export default function () {
  return {
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
