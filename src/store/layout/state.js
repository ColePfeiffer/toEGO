export default function () {
  return {
    theme: "default", // FIXME: ? maybe remove this...
    isDarkModeOn: false,
    // Size
    width: 359,
    height: 500,
    innerWidth: 250,
    innerHeight: 400,
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
    // Background
    backgroundImageURL:
      "url(/images/background_wide2.jpg) no-repeat center center fixed",
    backgroundColor: "#9c9c9c",
    backgrounds: [
      "https://64.media.tumblr.com/45baec53191971ec08c830217b64a3f0/tumblr_inline_mncitwVLMw1qz4rgp.gif",
      "https://64.media.tumblr.com/73966b6acfd978cc2ae90639bd803d73/tumblr_inline_mydbkloJQm1qak244.gif",
      "https://64.media.tumblr.com/1f53852736e2f58f84d1c06f4fa4d17d/tumblr_inline_mkjlph6wcQ1qz4rgp.png",
      "https://64.media.tumblr.com/42e248b655ff41e98e501f2bc475214b/tumblr_inline_nateoe8C4C1qak244.gif",
      "https://64.media.tumblr.com/9c181a9f3f01baa1cdbf45e4f9a279e5/tumblr_inline_natenvWAWX1qak244.gif",
      "https://64.media.tumblr.com/8b250bb0b90cbb3667071d88f3555c70/tumblr_inline_n9qgx3Si4l1qak244.png",
    ],
    // User Colors
    secondary: "#7689b0",
    accent: "#cdb1de",
    accent2: "#060754",
    // Font Settings
    nonDefaultFont: "Inter",
    defaultFont: "PixeloidSans",
    fontsize: "12",
    // Page: Home
    homeLayoutMode: "retro",
    homeBackgroundColor: "#ffffff54",
    homeBackgroundColorDark: "#000000ad",
    // Cards
    borderColorLeft: "#dfd4f5",
    borderColorRight: "#dfd4f5",
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
    diaryBackgroundColor: "#ffffff54",
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
    borderColorLeftForDiary: "#dfd4f5",
    borderColorRightForDiary: "#dfd4f5",
    diaryCardBackgroundColor: "#f5f5f5ff",
    noteTitleRowIsColoredForDiary: true,
    noteTextShadowColorForDiary: "#c42d2d00",
    // Other
    buttonFlatOnlyIcon: {
      "background-color": "transparent",
      "border-style": "unset",
      "box-shadow": "none",
      "min-width": "20px",
      "max-width": "20px",
      "min-height": "20px",
    },
  };
}
