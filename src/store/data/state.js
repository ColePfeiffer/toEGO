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
    diaryEntryForCurrentDay: "",
    diaryEntryRef: "",
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
    eventDialogSettings: { isOpen: false, editMode: false },
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
    diaryTemplates: [
      {
        id: 0,
        name: "default",
        text: "<b>Morning</b><br><div>Intention of the day:<br></div><div>What do you need to get done today?<br></div><div><br></div><div><b>Venting</b></div><div>Is there anything you need to get off your chest?<br></div><div>What are the words you need to hear?<br></div><div><br></div><div><b>Reflecting</b></div><div>How are my thoughts lately? Are they serving me or holding me back?<br></div><div>Are all of your obligations today real or are some imagined?<br></div><div><br></div><div><b>Imagining/Planning</b></div><div><div>Imagine you are having a great day. Describe in detail how you feel...</div></div><div>What are you scared of today and&nbsp;</div><div>Why is today an opportunity instead of another day to get through?<br></div><div><br></div><div><b>Evening</b></div><div>What are you grateful for?<br></div><div><div>2. Something I accomplished</div><div>3. lesson I learned</div><div>4. Who did I help or connect with?</div></div><div><br></div></div></div>",
        icon: "",
      },
      {
        id: 1,
        name: "morning",
        text: "HALLO, GUDN MORGEN!!!!",
        icon: "fas fa-sun",
      },
    ],
  };
}
