export default function () {
  return {
    // FIXME: ? maybe remove this...
    theme: "default",
    // Size
    width: 359,
    height: 500,
    innerWidth: 250,
    innerHeight: 400,

    // Font Settings
    nonDefaultFont: "Inter",
    defaultFont: "PressStart",
    fontsize: "12",
    // Background
    backgroundImageURL:
      "url(/images/background_wide2.jpg) no-repeat center center fixed",
    backgroundColor: "#9c9c9c",
    // System colors | can't be changed by the user
    whitesmoke: "#f5f5f5",
    blacksmoke: "#2c2c2c",
    dark: "#252425",
    white: "#ffffff",
    lightgrey: "#d3d3d3",
    darkgrey: "#989898",
    primary: "#00080f",
    //  Opacity
    lowOpacity: "30",
    mediumOpacity: "a6",
    // User Colors
    secondary: "#dfd4f5",
    accent: "#ffc107",
    accent2: "#14157a",
    // Sub Colors
    //FIXME: make computed or something  -
    SecondaryLighter: "#f3effc",

    // Page Settings
    isDarkModeOn: false,
    borderColorLeft: "#dfd4f5",
    borderColorRight: "#dfd4f5",
    borderColorLeftForDiary: "#dfd4f5",
    borderColorRightForDiary: "#dfd4f5",
    // Home
    homeMode: "retro",
    homeBackgroundColor: "#ffffff54",
    homeBackgroundColorDark: "#000000ad",
    // Note
    noteTitleRowIsColored: true,
    noteTitleRowIsColoredForDiary: true,
    noteLayoutMode: "default",
    notesContainerBackgroundColor: "#f5f5f5fc",
    notesContainerBackgroundColorDark: "#000000ad",
    noteTextShadowColorForHome: "#c42d2d00",

    noteTextShadowColorForDiary: "#c42d2d00",
    noteBackgroundColor: "#f5f5f5FF",
    eventInputBackgroundColor: "#f7f7f700",
    eventTextShadow: "#dfd4f5 2px 2px 2px", // is calculated
    // Diary
    diaryMode: "clear",
    diaryIsInputColoredSeparately: false,
    diaryBackgroundColor: "#ffffff54",
    diaryBackgroundColorDark: "#000000ad",
    diaryCardBackgroundColor: "#f5f5f5ff",
    isDiaryInputStyleSetToTodaysNotes: true,
    isDiaryTitlebarShowingDay: true,
    isDiaryCountingDays: false,
    isDiarySubtitleStyleSetToAlternative: false,
    diaryBorderColorAlternative: "#978fc7",
    diaryBorderColor: "var(--q-info)",
    //  Backgrounds
    backgrounds: [
      "https://64.media.tumblr.com/45baec53191971ec08c830217b64a3f0/tumblr_inline_mncitwVLMw1qz4rgp.gif",
      "https://64.media.tumblr.com/73966b6acfd978cc2ae90639bd803d73/tumblr_inline_mydbkloJQm1qak244.gif",
      "https://64.media.tumblr.com/1f53852736e2f58f84d1c06f4fa4d17d/tumblr_inline_mkjlph6wcQ1qz4rgp.png",
      "https://64.media.tumblr.com/42e248b655ff41e98e501f2bc475214b/tumblr_inline_nateoe8C4C1qak244.gif",
      "https://64.media.tumblr.com/9c181a9f3f01baa1cdbf45e4f9a279e5/tumblr_inline_natenvWAWX1qak244.gif",
      "https://64.media.tumblr.com/8b250bb0b90cbb3667071d88f3555c70/tumblr_inline_n9qgx3Si4l1qak244.png",
    ],
    dialogWidth: "width: 300px;",

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
  };
}
