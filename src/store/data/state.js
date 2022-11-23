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
      clouds: {
        backgroundImage: "url(https://i.imgur.com/TPnaBOX.png)",
        secondary: "#bacbde",
        accent: "#FF7E6B",
        accent2: "#deb4db",
        borderColorLeft: "#57a3eb",
        borderColorRight: "#6bafcf",
        homeMode: "retro",
        homeBackgroundColor: "#ffffff82",
        noteMode: "default",
        diaryMode: "clear",
        diaryCardBackgroundColor: "#fafafaed",
        isDiaryTitleBarShowingDay: false,
        diarySubtitleStyleIsSetToAlternative: true,
        diaryBorderColor: "#bacbde",
      },
      lilacSky: {
        backgroundImage:
          "url(/images/background_wide2.jpg) no-repeat center center fixed",
        fontSize: 12.5,
        defaultFont: "PressStart",
        secondary: "#DFD4F5",
        accent: "#ffc107",
        accent2: "#211761",
        borderColorLeft: "#80d2f2",
        borderColorRight: "#7d5fb8",
        homeMode: "retro",
        homeBackgroundColor: "#ffffff54",
        noteMode: "default",
        notesContainerBackgroundColor: "#f5f5f5fc",
        notesInputBackgroundColor: "#f5f5f5fc",
        diaryMode: "clear",
        diaryBackgroundColor: "ffffff54",
        diaryCardBackgroundColor: "#f5f5f5ff",
        isDiaryTitleBarShowingDay: true,
        diarySubtitleStyleIsSetToAlternative: true,
        diaryBorderColor: "#bacbde",
      },
      theme4: {},
      theme5: {},
      theme6: {},
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
