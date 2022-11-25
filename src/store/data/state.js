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
    lastSelectedTheme: "",
    // TODO: add to DB on registration
    defaultUserSettings: {
      hasFinishedHelpForHomeForTheFirstTime: false,
      hasFinishedHelpForDiaryForTheFirstTime: false,
      hasFinishedHelpForTemplatesForTheFirstTime: false,
      messageToMyself: "",
      isMessageShown: false,
      currentTheme: "nightSky", // { 'nightSky' }
      // TODO: add names property to unnamed ones...
      userThemes: {
        // also add these to default... so when user sets stuff to default, default themes will be resetted too.
        nightSky: {
          name: "nightSky",
          backgroundImageURL: "url(https://i.imgur.com/Dryps1y.png)",
          // User Colors
          secondary: "#7689b0",
          accent: "#cdb1de",
          accent2: "#060754",
          // Font Settings
          defaultFont: "PressStart",
          fontsize: "12",
          // Page: Home
          homeLayoutMode: "retro",
          homeBackgroundColor: "#ebebeb59",
          homeBackgroundColorDark: "#000000ad",
          // Cards
          borderColorLeft: "#7689b0",
          borderColorRight: "#7689b0",
          // Cards for notes
          noteBackgroundColor: "#f5f5f5FF",
          noteTitleRowIsColored: true,
          noteTextShadowColorForHome: "#c42d2d00",
          // Page: New Note
          noteLayoutMode: "default",
          notesContainerBackgroundColor: "#f5f5f5fc",
          notesContainerBackgroundColorDark: "#000000ad",
          eventInputBackgroundColor: "#f7f7f700",
          // Page: Diary
          diaryMode: "clear",
          diaryBackgroundColor: "#fafafaed",
          diaryBackgroundColorDark: "#000000ad",
          isDiaryInputColoredSeparately: false,
          isDiaryTitlebarShowingDay: true,
          isDiaryCountingDays: false,
          // Diary Subtitle Styling
          isDiarySubtitleStyleSetToAlternative: false,
          diaryBorderColorAlternative: "#978fc7",
          diaryBorderColor: "#14157a",
          // Diary Cards
          isDiaryInputStyleSetToTodaysNotes: true,
          borderColorLeftForDiary: "#7689b0",
          borderColorRightForDiary: "#7689b0",
          diaryCardBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColoredForDiary: true,
          noteTextShadowColorForDiary: "#c42d2d00",
        },
        clouds: {
          name: "clouds",
          backgroundImageURL: "url(https://i.imgur.com/TPnaBOX.png)",
          // User Colors
          secondary: "#bacbde",
          accent: "#FF7E6B",
          accent2: "#deb4db",
          // Font Settings
          defaultFont: "PressStart",
          fontsize: "12",
          // Page: Home
          homeLayoutMode: "retro",
          homeBackgroundColor: "#ffffff82",
          homeBackgroundColorDark: "#000000ad",
          // Cards
          borderColorLeft: "#57a3eb",
          borderColorRight: "#6bafcf",
          // Cards for notes
          noteBackgroundColor: "#f5f5f5FF",
          noteTitleRowIsColored: true,
          noteTextShadowColorForHome: "#c42d2d00",
          // Page: New Note
          noteLayoutMode: "default",
          notesContainerBackgroundColor: "#f5f5f5fc",
          notesContainerBackgroundColorDark: "#000000ad",
          eventInputBackgroundColor: "#f7f7f700",
          // Page: Diary
          diaryMode: "clear",
          diaryBackgroundColor: "#fafafaed",
          diaryBackgroundColorDark: "#000000ad",
          isDiaryInputColoredSeparately: false,
          isDiaryTitlebarShowingDay: true,
          isDiaryCountingDays: false,
          // Diary Subtitle Styling
          isDiarySubtitleStyleSetToAlternative: true,
          diaryBorderColorAlternative: "#978fc7",
          diaryBorderColor: "#bacbde",
          // Diary Cards
          isDiaryInputStyleSetToTodaysNotes: true,
          borderColorLeftForDiary: "#7689b0",
          borderColorRightForDiary: "#7689b0",
          diaryCardBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColoredForDiary: true,
          noteTextShadowColorForDiary: "#c42d2d00",
        },
        lilacSky: {
          name: "lilacSky",
          backgroundImageURL:
            "url(/images/background_wide2.jpg) no-repeat center center fixed",
          // User Colors
          secondary: "#DFD4F5",
          accent: "#ffc107",
          accent2: "#211761",
          // Font Settings
          defaultFont: "PressStart",
          fontsize: "12",
          // Page: Home
          homeLayoutMode: "retro",
          homeBackgroundColor: "#ffffff54",
          homeBackgroundColorDark: "#000000ad",
          // Cards
          borderColorLeft: "#DFD4F5",
          borderColorRight: "#DFD4F5",
          // Cards for notes
          noteBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColored: false,
          noteTextShadowColorForHome: "#c42d2d00",
          // Page: New Note
          noteLayoutMode: "default",
          notesContainerBackgroundColor: "#f5f5f5fc",
          notesContainerBackgroundColorDark: "#000000ad",
          eventInputBackgroundColor: "#f5f5f5fc",
          // Page: Diary
          diaryMode: "clear",
          diaryBackgroundColor: "#ffffff54",
          diaryBackgroundColorDark: "#000000ad",
          isDiaryInputColoredSeparately: false,
          isDiaryTitlebarShowingDay: true,
          isDiaryCountingDays: false,
          // Diary Subtitle Styling
          isDiarySubtitleStyleSetToAlternative: false,
          diaryBorderColorAlternative: "#978fc7",
          diaryBorderColor: "#bacbde",
          // Diary Cards
          isDiaryInputStyleSetToTodaysNotes: true,
          borderColorLeftForDiary: "#7689b0",
          borderColorRightForDiary: "#7689b0",
          diaryCardBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColoredForDiary: true,
          noteTextShadowColorForDiary: "#c42d2d00",
        },
        theme4: {
          name: "theme4",
          //...
          backgroundImageURL:
            "url(/images/background_wide2.jpg) no-repeat center center fixed",
          // User Colors
          secondary: "#DFD4F5",
          accent: "#ffc107",
          accent2: "#211761",
          // Font Settings
          defaultFont: "PressStart",
          fontsize: "12",
          // Page: Home
          homeLayoutMode: "retro",
          homeBackgroundColor: "#ffffff54",
          homeBackgroundColorDark: "#000000ad",
          // Cards
          borderColorLeft: "#DFD4F5",
          borderColorRight: "#DFD4F5",
          // Cards for notes
          noteBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColored: false,
          noteTextShadowColorForHome: "#c42d2d00",
          // Page: New Note
          noteLayoutMode: "default",
          notesContainerBackgroundColor: "#f5f5f5fc",
          notesContainerBackgroundColorDark: "#000000ad",
          eventInputBackgroundColor: "#f5f5f5fc",
          // Page: Diary
          diaryMode: "clear",
          diaryBackgroundColor: "#ffffff54",
          diaryBackgroundColorDark: "#000000ad",
          isDiaryInputColoredSeparately: false,
          isDiaryTitlebarShowingDay: true,
          isDiaryCountingDays: false,
          // Diary Subtitle Styling
          isDiarySubtitleStyleSetToAlternative: false,
          diaryBorderColorAlternative: "#978fc7",
          diaryBorderColor: "#bacbde",
          // Diary Cards
          isDiaryInputStyleSetToTodaysNotes: true,
          borderColorLeftForDiary: "#7689b0",
          borderColorRightForDiary: "#7689b0",
          diaryCardBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColoredForDiary: true,
          noteTextShadowColorForDiary: "#c42d2d00",
        },
        theme5: {
          name: "theme5",
          // ...
          backgroundImageURL:
            "url(/images/background_wide2.jpg) no-repeat center center fixed",
          // User Colors
          secondary: "#DFD4F5",
          accent: "#ffc107",
          accent2: "#211761",
          // Font Settings
          defaultFont: "PressStart",
          fontsize: "12",
          // Page: Home
          homeLayoutMode: "retro",
          homeBackgroundColor: "#ffffff54",
          homeBackgroundColorDark: "#000000ad",
          // Cards
          borderColorLeft: "#DFD4F5",
          borderColorRight: "#DFD4F5",
          // Cards for notes
          noteBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColored: false,
          noteTextShadowColorForHome: "#c42d2d00",
          // Page: New Note
          noteLayoutMode: "default",
          notesContainerBackgroundColor: "#f5f5f5fc",
          notesContainerBackgroundColorDark: "#000000ad",
          eventInputBackgroundColor: "#f5f5f5fc",
          // Page: Diary
          diaryMode: "clear",
          diaryBackgroundColor: "#ffffff54",
          diaryBackgroundColorDark: "#000000ad",
          isDiaryInputColoredSeparately: false,
          isDiaryTitlebarShowingDay: true,
          isDiaryCountingDays: false,
          // Diary Subtitle Styling
          isDiarySubtitleStyleSetToAlternative: false,
          diaryBorderColorAlternative: "#978fc7",
          diaryBorderColor: "#bacbde",
          // Diary Cards
          isDiaryInputStyleSetToTodaysNotes: true,
          borderColorLeftForDiary: "#7689b0",
          borderColorRightForDiary: "#7689b0",
          diaryCardBackgroundColor: "#f5f5f5ff",
          noteTitleRowIsColoredForDiary: true,
          noteTextShadowColorForDiary: "#c42d2d00",
        },
      },
    },
    userSettings: {},
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
