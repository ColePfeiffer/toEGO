export default function () {
  return {
    // in databae
    // templates / uid / templates, categories, folders
    // templates: "templateID" = {id: .. , type: ,... };
    // categories:
    editorText: "",
    templatesDownloaded: false,
    categoriesDownloaded: false,
    foldersDownloaded: false,
    defaultTemplates: [
      {
        id: 0,
        type: "DIARY",
        name: "Morning Prompts",
        text: "<div>Intention of the day:<br></div><div>What do you need to get done today?<br></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 1,
        type: "DIARY",
        name: "Evening",
        text: "<div><b>What am I grateful for today?</b><br></div><div><br></div><div><b>Something I accomplished...</b></div><div><br></div><div><b>Lesson I learned or something I could have done differently today?</b></div><div><br></div><div><b>Who did I help or connect with today?</b></div><div><br></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 2,
        type: "DIARY",
        name: "Planning",
        text: "<div>Imagine you are having a great day. Describe in detail how you feel...</div></div><div>What are you scared of today and&nbsp;</div><div>Why is today an opportunity instead of another day to get through?<br></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 3,
        type: "DIARY",
        name: "Reflecting",
        text: "<div>How are my thoughts lately? Are they serving me or holding me back?<br></div><div>Are all of your obligations today real or are some imagined?<br></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 4,
        type: "DIARY",
        name: "Venting",
        text: "<div>Is there anything you need to get off your chest?<br></div><div>What are the words you need to hear?<br></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 5,
        type: "EVENT",
        name: "Grounding: 5-to-1",
        text: "<div style='text-align: left;'>This technique can be used when feeling anxious or overwhelmed. Before you start, become mindful to your breathing. Take a couple of deep breaths. Then pay attention to your surroundings.</div><ol><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(255, 102, 99);'>five</strong><span style='text-align: left;'> things you can see around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(254, 177, 68);'>four</strong><span style='text-align: left;'> things you can touch around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 224, 158);'>three</strong><span style='text-align: left;'> things you can hear right now.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 193, 207);'>two</strong><span style='text-align: left;'> things you can smell.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(204, 153, 201);'>one</strong><span style='text-align: left;'> thing you can taste.</span><br></li></ol>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 6,
        type: "EVENT",
        name: "Todo",
        text: "<div>✔️❌&nbsp;<b>Todo</b><br></div><div><ul><li><br></li></ul></div>",
        isSetToDefault: false,
        isFavorite: false,
      },
      {
        id: 7,
        type: "DIARY",
        name: "Goals",
        text: "(Use this to write something about your long term goals!)",
        isSetToDefault: false,
        isFavorite: false,
      },
    ],
    defaultCategories: [
      { id: 0, type: "DIARY", name: "@Daytime", storedIDs: [0, 1] },
      { id: 1, type: "DIARY", name: "@Topic", storedIDs: [2, 3, 4] },
      { id: 2, type: "EVENT", name: "Grounding Methods", storedIDs: [5] },
      { id: 3, type: "EVENT", name: "Tracker", storedIDs: [6] },
      { id: 4, type: "DIARY", name: "Lists", storedIDs: [7] },
    ],
    defaultFolders: [
      { id: 0, type: "DIARY", name: "Journaling", storedIDs: [0, 1] },
      { id: 0, type: "DIARY", name: "Notebook", storedIDs: [4] },
      { id: 1, type: "EVENT", name: "Methods & Reminders", storedIDs: [2] },
    ],
    templates: [],
    categories: [],
    folders: [],
  };
}
