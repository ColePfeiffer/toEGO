import { date } from "quasar";

export default function () {
  return {
    diaryEntryRef: "",
    currentNote: {
      id: "",
      mood: "las la-meh-blank",
      title: "",
      text: "",
      editor: "",
      createdOn: "",
      expanded: false,
    },
    diaryEntries: [
      {
        id: "id1",
        date: date.subtractFromDate(new Date(), { days: 2 }),
        editor: "I went to the store.",
      },
      {
        id: "id2",
        date: date.subtractFromDate(new Date(), { days: 1 }),
        editor:
          "<p style='margin-top: 0.5em; margin-bottom: 0.5em;'>A&nbsp;diary&nbsp;is a record (originally in handwritten format) with discrete entries arranged by&nbsp;<a href='https://en.wikipedia.org/wiki/Calendar_date' title='Calendar date' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>date</a>&nbsp;reporting on what has happened over the course of a day or other period. A personal diary may include a person's experiences, thoughts, and/or feelings, excluding comments on current events outside the writer's direct experience. Someone who keeps a diary is known as a&nbsp;<a href='https://en.wikipedia.org/wiki/List_of_diarists' title='List of diarists' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>diarist</a>. Diaries undertaken for institutional purposes play a role in many aspects of human civilization, including government records (e.g.&nbsp;<a href='https://en.wikipedia.org/wiki/Hansard' title='Hansard' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Hansard</a>), business&nbsp;<a href='https://en.wikipedia.org/wiki/Ledger' title='Ledger' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>ledgers</a>, and military&nbsp;<a href='https://en.wikipedia.org/wiki/Service_record' title='Service record' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>records</a>. In British English, the word may also denote&nbsp;<a href='https://en.wikipedia.org/wiki/Diary_(stationery)' title='Diary (stationery)' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>a preprinted journal format</a>.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'><br></p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>Today the term is generally employed for personal diaries, normally intended to remain private or to have a limited circulation amongst friends or relatives. The word '<a href='https://en.wikipedia.org/wiki/Journal_(disambiguation)' class='mw-redirect mw-disambig' title='Journal (disambiguation)' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>journal</a>' may be sometimes used for 'diary,' but generally a diary has (or intends to have) daily entries (from the Latin word for 'day'), whereas journal-writing can be less frequent.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'><br></p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>Although a diary may provide information for a&nbsp;<a href='https://en.wikipedia.org/wiki/Memoir' title='Memoir' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>memoir</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Autobiography' title='Autobiography' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>autobiography</a>&nbsp;or&nbsp;<a href='https://en.wikipedia.org/wiki/Biography' title='Biography' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>biography</a>, it is generally written not with the intention of being published as it stands, but for the author's own use. In recent years, however, there is internal evidence in some diaries (e.g. those of&nbsp;<a href='https://en.wikipedia.org/wiki/Ned_Rorem' title='Ned Rorem' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Ned Rorem</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Alan_Clark' title='Alan Clark' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Alan Clark</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Tony_Benn' title='Tony Benn' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Tony Benn</a>&nbsp;or&nbsp;<a href='https://en.wikipedia.org/wiki/Simon_Gray' title='Simon Gray' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Simon Gray</a>) that they are written with eventual publication in mind, with the intention of self-vindication (pre- or posthumous), or simply for profit.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>By extension, the term&nbsp;diary&nbsp;is also used to mean a printed publication of a written diary; and may also refer to other terms of journal including electronic formats (e.g.&nbsp;<a href='https://en.wikipedia.org/wiki/Blog' title='Blog' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>blogs</a>).</p>",
      },
    ],
    notes: {
      id1: {
        "10314a46-915b-4217-8891-a17497727f7f": {
          createdOn: date.subtractFromDate(new Date(), { days: 2 }),
          expanded: false,
          id: "10314a46-915b-4217-8891-a17497727f7f",
          mood: "las la-grin",
          editor: "Read a book. I'm very smart now.",
          title: "biep",
        },
      },
    },
  };
}
