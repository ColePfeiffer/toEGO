import { date } from "quasar";
export default function () {
  return {
    notePreview: {
      date: date.subtractFromDate(new Date(), { days: 2 }),
      expanded: false,
      id: "99999999",
      mood: "las la-grin",
      editor: "This is a preview.",
      title: "Preview",
    },
    userOptions: {
      userHasFinishedHelpForHome: false,
      userHasFinishedHelpForDiary: false,
      userHasFinishedHelpForTemplates: false,
    },
    // add to DB
    messageToMyself: "",
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
