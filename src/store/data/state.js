import { date } from "quasar";
export default function () {
  return {
    userSettingsDownloaded: false,
    notePreview: {
      date: date.subtractFromDate(new Date(), { days: 2 }),
      expanded: false,
      id: "99999999",
      mood: "las la-grin",
      editor: "This is a preview.",
      title: "Preview",
    },
    // add to DB
    defaultUserSettings: {
      hasFinishedHelpForHomeForTheFirstTime: false,
      hasFinishedHelpForDiaryForTheFirstTime: false,
      hasFinishedHelpForTemplatesForTheFirstTime: false,
      messageToMyself: "",
      isMessageShown: false,
      userTheme: {},
    },
    userSettings: {
      hasFinishedHelpForHomeForTheFirstTime: false,
      hasFinishedHelpForDiaryForTheFirstTime: false,
      hasFinishedHelpForTemplatesForTheFirstTime: false,
      messageToMyself: "",
      isMessageShown: false,
      userTheme: {},
    },
    lastSelectedDate: new Date(),
    // Toggles
    newEventIsInCreationMode: true,
    isFabButtonDisabled: false,
    // Dialogs
    dialogTemplateViewerIsSetToDiaryMode: true,
    dialogSettings: {
      nameOfCurrentDialog: "test",
      isVisible: false,
      isBackgroundVisible: false,
    },
    pastedText: "",
    editorText: "",
    // FIXME:
    eventsOnDiaryPageAreExpanded: false,
  };
}
