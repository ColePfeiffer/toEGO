import { date } from "quasar";
export default function () {
  return {
    quickListForDiary: {
      id: 0,
      name: "Quick List",
      templatesById: [],
    },
    foldersForDiary: [
      { id: 1, name: "Help for bad days", categoriesByID: [3, 4] },
    ],
    categoriesForDiary: [
      {
        id: 1,
        name: "Daytimes",
        templatesByID: [],
        isInFolder: false,
      },
      {
        id: 2,
        name: "Writing prompts",
        templatesByID: [],
        isInFolder: false,
      },
      { id: 3, name: "Journaling", templatesByID: [], isInFolder: true },
      { id: 4, name: "Methods", templatesByID: [], isInFolder: true },
    ],
    categoriesForNewEvent: [],
    newEventIsInCreationMode: true,
    isShowingExpandButtonOfEventCardsOnDiaryPage: false,
    eventsOnDiaryPageAreExpanded: false,
    buttonFlatStyleTransparent: {
      "box-shadow": "none",
      "background-color": "transparent",
    },
    sFontColor: "black",
    // button fixed size, just icon
    buttonFlatOnlyIcon: {
      "background-color": "transparent",
      "border-style": "unset",
      "box-shadow": "none",
      "min-width": "20px",
      "max-width": "20px",
      "min-height": "20px",
    },
    // button flat color; no borders
    buttonFlatStyle: {
      "min-width": "83px",
      "max-width": "83px",
      "min-height": "23px",
      "box-shadow": "none",
      "background-color": "var(--q-secondary)",
    },
    // button flat color for accent buttons; no borders
    buttonFlatStyleAccentColor: {
      "min-width": "83px",
      "max-width": "83px",
      "min-height": "23px",
      "box-shadow": "none",
      "background-color": "var(--q-accent)",
    },
    sTextBasicBlackFont: {
      "font-color": "black",
      //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
      "text-shadow": "2px 2px 3px rgba(255,255,255,0.1)",
    },
    sTextBasicShadowBlackFont: {
      "text-shadow": "var(--q-secondary) 2px 2px 2px",
      color: "black !important",
    },
    sTextBasicShadowDarkWhiteFont: {
      "text-shadow": "2px 2px #000000",
      "text-shadow": "rgb(0 0 0) 2px 2px 2px",
      color: "white !important",
    },
    sTextAccentShadow: {
      color: "var(--q-accent)",
      //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
      "text-shadow": "var(--q-info) 2px 2px 2px",
    },
    sTextTitleBar: {
      color: "white",
      //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
      "text-shadow": "var(--q-info) 2px 2px 2px",
    },
    lastSelectedDate: new Date(),
    modalVisible: false,
    modalComponent: "",
    buttonClicked: 0,
    lastButtonClicked: "",
    diaryEntryForCurrentDay: "",
    diaryEntryRef: "",
    eventData: {
      id: "",
      mood: "las la-meh-blank",
      title: "",
      text: "",
      editor: "",
      tags: "",
      createdOn: "",
      createdBy: "me", // ref or id
      expanded: false,
      methods: [
        {
          id: 1,
          radioButtonIsBeyondControl: "yes",
          textFriendAdvice: "",
          textWhatICanDo: "",
        },
        {},
      ],
    },
    debug: true,
    phone: false,
    intentionText: "today's message to myself",
    //dialogs
    eventDialogSettings: { isOpen: false, editMode: false },
    dialogSettings: {
      nameOfCurrentDialog: "test",
      isVisible: false,
      isBackgroundVisible: false,
    },
    diaryEntries: [
      {
        id: "1",
        date: date.subtractFromDate(new Date(), { days: 2 }),
        editor: "I went to the store.",
        events: [
          {
            createdBy: "me",
            createdOn: date.subtractFromDate(new Date(), { days: 2 }),
            expanded: false,
            id: "10314a46-915b-4217-8891-a17497727f7f",
            methods: [],
            mood: "las la-grin",
            tags: "",
            text: "bop",
            title: "biep",
          },
        ],
      },
      {
        id: "2",
        date: date.subtractFromDate(new Date(), { days: 1 }),
        editor:
          "<p style='margin-top: 0.5em; margin-bottom: 0.5em;'>A&nbsp;diary&nbsp;is a record (originally in handwritten format) with discrete entries arranged by&nbsp;<a href='https://en.wikipedia.org/wiki/Calendar_date' title='Calendar date' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>date</a>&nbsp;reporting on what has happened over the course of a day or other period. A personal diary may include a person's experiences, thoughts, and/or feelings, excluding comments on current events outside the writer's direct experience. Someone who keeps a diary is known as a&nbsp;<a href='https://en.wikipedia.org/wiki/List_of_diarists' title='List of diarists' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>diarist</a>. Diaries undertaken for institutional purposes play a role in many aspects of human civilization, including government records (e.g.&nbsp;<a href='https://en.wikipedia.org/wiki/Hansard' title='Hansard' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Hansard</a>), business&nbsp;<a href='https://en.wikipedia.org/wiki/Ledger' title='Ledger' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>ledgers</a>, and military&nbsp;<a href='https://en.wikipedia.org/wiki/Service_record' title='Service record' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>records</a>. In British English, the word may also denote&nbsp;<a href='https://en.wikipedia.org/wiki/Diary_(stationery)' title='Diary (stationery)' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>a preprinted journal format</a>.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'><br></p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>Today the term is generally employed for personal diaries, normally intended to remain private or to have a limited circulation amongst friends or relatives. The word '<a href='https://en.wikipedia.org/wiki/Journal_(disambiguation)' class='mw-redirect mw-disambig' title='Journal (disambiguation)' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>journal</a>' may be sometimes used for 'diary,' but generally a diary has (or intends to have) daily entries (from the Latin word for 'day'), whereas journal-writing can be less frequent.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'><br></p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>Although a diary may provide information for a&nbsp;<a href='https://en.wikipedia.org/wiki/Memoir' title='Memoir' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>memoir</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Autobiography' title='Autobiography' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>autobiography</a>&nbsp;or&nbsp;<a href='https://en.wikipedia.org/wiki/Biography' title='Biography' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>biography</a>, it is generally written not with the intention of being published as it stands, but for the author's own use. In recent years, however, there is internal evidence in some diaries (e.g. those of&nbsp;<a href='https://en.wikipedia.org/wiki/Ned_Rorem' title='Ned Rorem' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Ned Rorem</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Alan_Clark' title='Alan Clark' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Alan Clark</a>,&nbsp;<a href='https://en.wikipedia.org/wiki/Tony_Benn' title='Tony Benn' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Tony Benn</a>&nbsp;or&nbsp;<a href='https://en.wikipedia.org/wiki/Simon_Gray' title='Simon Gray' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>Simon Gray</a>) that they are written with eventual publication in mind, with the intention of self-vindication (pre- or posthumous), or simply for profit.</p><p style='margin-top: 0.5em; margin-bottom: 0.5em;'>By extension, the term&nbsp;diary&nbsp;is also used to mean a printed publication of a written diary; and may also refer to other terms of journal including electronic formats (e.g.&nbsp;<a href='https://en.wikipedia.org/wiki/Blog' title='Blog' style='background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;'>blogs</a>).</p>",
        events: [],
      },
    ], // diary entries go in here
    banana: true,
    events: [],
    /*
        methodsUserInput: [
          {
            idOfMethod: 2,
            userInputs: [
              {
                id: 1,
                text: "I would tell them...",
              },
              { id: 2, value: "yes" },
              { id: 3, text: "I can start right now!" },
            ],
          },
        ],*/
    // all methods are in here
    methods: [
      {
        id: 0,
        icon: "task_alt",
        name: "5-to-1 Methode",
        refName: "oneToFiveMethode",
        maxWidthOfExpansionItems: { "max-width": "350px" },

        // user input gets loaded from here
        UserInputs: [],
      },
      {
        id: 1,
        icon: "spa",
        name: "Handling Emotions",
        refName: "handlingEmotions",
        maxWidthOfExpansionItems: { "max-width": "350px" },
        content: {},
        // user input gets loaded from here
        UserInputs: [{ id: 1, value: "false" }],
      },
    ],
    // all templates for events are in here
    eventTemplates: [],
    diaryTemplates: [
      {
        id: 0,
        name: "default",
        text: "<b>Morning</b><br><div>Intention of the day:<br></div><div>What do you need to get done today?<br></div><div><br></div><div><b>Venting</b></div><div>Is there anything you need to get off your chest?<br></div><div>What are the words you need to hear?<br></div><div><br></div><div><b>Reflecting</b></div><div>How are my thoughts lately? Are they serving me or holding me back?<br></div><div>Are all of your obligations today real or are some imagined?<br></div><div><br></div><div><b>Imagining/Planning</b></div><div><div>Imagine you are having a great day. Describe in detail how you feel...</div></div><div>What are you scared of today and&nbsp;</div><div>Why is today an opportunity instead of another day to get through?<br></div><div><br></div><div><b>Evening</b></div><div>What are you grateful for?<br></div><div><div>2. Something I accomplished</div><div>3. lesson I learned</div><div>4. Who did I help or connect with?</div></div><div><br></div></div></div>",
        icon: "",
        isSetToDefault: false,
      },
      {
        id: 1,
        name: "morning",
        text: "HALLO, GUDN MORGEN!!!!",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
    ],
    eventTemplates: [
      {
        id: 0,
        name: "Grounding: 5-to-1",
        text: "<div><u>Grounding Technique: 5-to-1</u></div><div></div><div><br></div><div style='text-align: left;'>This technique can be used when feeling anxious or overwhelmed. Before you start, become mindful to your breathing. Take a couple of deep breaths. Then pay attention to your surroundings.</div><ol><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(255, 102, 99);'>five</strong><span style='text-align: left;'> things you can see around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(254, 177, 68);'>four</strong><span style='text-align: left;'> things you can touch around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 224, 158);'>three</strong><span style='text-align: left;'> things you can hear right now.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 193, 207);'>two</strong><span style='text-align: left;'> things you can smell.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(204, 153, 201);'>one</strong><span style='text-align: left;'> thing you can taste.</span><br></li></ol>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
    ],
  };
}
