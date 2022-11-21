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
      userTheme: {}, // { 'nightSky' }
    },
    userThemes: {
      // also add these to default... so when user sets stuff to default, default themes will be resetted too.
      nightSky: {
        backgroundImage: "url(https://i.imgur.com/Dryps1y.png)",
        secondary: "#7689b0",
        accent: "#cdb1de",
        accent2: "#060754",
        borderColorLeft: "#7689b0",
        borderColorRight: "#7689b0",
        homeMode: "retro",
        homeBackgroundColor: "#ebebeb59",
        noteMode: "default",
        diaryMode: "clear",
        diaryCardBackgroundColor: "#fafafaed",
        isDiaryTitleBarShowingDay: false,
        diarySubtitleStyleIsSetToAlternative: false,
      },
      theme2: {},
      theme3: {},
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

    // FIXME:
    eventsOnDiaryPageAreExpanded: false,
  };
}
