import { date } from "quasar";
export default function () {
  return {
    modalVisible: false,
    modalComponent: "",
    buttonClicked: 0,
    lastButtonClicked: "",
    currentDiaryEntry: {
      id: "",
      date: "",
      editor: "No entry here yet.",
      events: [],
    },
    eventData: {
      id: "",
      mood: "las la-meh-blank",
      title: "",
      text: "",
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
    newEventDialogIsOpen: false,
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
        editor: "Love working.",
        events: "",
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
  };
}
