export default function () {
  return {
    modalVisible: false,
    modalComponent: "",
    eventData: {
      id: "",
      mood: "",
      title: "",
      text: "",
      tags: "",
      createdOn: "",
      createdBy: "me", // ref or id
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
