import { date } from "quasar";
export default function () {
  return {
    isFabButtonDisabled: false,
    dialogTemplateViewerIsSetToDiaryMode: true,
    pastedText: "",
    editorText: "",
    isShowingLabelsForDiarySection: false,
    messageToMyself: "",
    notePreview: {
      createdOn: date.subtractFromDate(new Date(), { days: 2 }),
      expanded: false,
      id: "99999999",
      mood: "las la-grin",
      editor: "This is a preview.",
      title: "Preview",
    },
    newEventIsInCreationMode: true,
    eventsOnDiaryPageAreExpanded: false,
    lastSelectedDate: new Date(),
    lastButtonClicked: "",

    debug: true,
    dialogSettings: {
      nameOfCurrentDialog: "test",
      isVisible: false,
      isBackgroundVisible: false,
    },
  };
}
