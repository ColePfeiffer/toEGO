export default function () {
  return {
    quicklistForDiary: {
      id: 0,
      name: "Quick List",
      storedIDs: [],
    },
    quicklistForEvents: {
      id: 0,
      name: "Quick List",
      storedIDs: [],
    },
    diaryTemplates: [
      {
        id: 0,
        name: "Morning Prompts",
        text: "<div>Intention of the day:<br></div><div>What do you need to get done today?<br></div>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
      {
        id: 4,
        name: "Evening",
        text: "<div><b>What am I grateful for today?</b><br></div><div><br></div><div><b>Something I accomplished...</b></div><div><br></div><div><b>Lesson I learned or something I could have done differently today?</b></div><div><br></div><div><b>Who did I help or connect with today?</b></div><div><br></div>",
        icon: "",
        isSetToDefault: false,
      },
      {
        id: 1,
        name: "Planning",
        text: "<div>Imagine you are having a great day. Describe in detail how you feel...</div></div><div>What are you scared of today and&nbsp;</div><div>Why is today an opportunity instead of another day to get through?<br></div>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
      {
        id: 2,
        name: "Reflecting",
        text: "<div>How are my thoughts lately? Are they serving me or holding me back?<br></div><div>Are all of your obligations today real or are some imagined?<br></div>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
      {
        id: 3,
        name: "Venting",
        text: "<div>Is there anything you need to get off your chest?<br></div><div>What are the words you need to hear?<br></div>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
    ],
    foldersForDiary: [{ id: 0, name: "Journaling", storedIDs: [2, 3] }],
    categoriesForDiary: [
      { id: 2, name: "@Daytime", storedIDs: [0, 4] },
      { id: 3, name: "@Topic", storedIDs: [1, 2, 3] },
    ],
    foldersForEvents: [{ id: 0, name: "Methods & Reminders", storedIDs: [0] }],
    categoriesForEvents: [
      {
        id: 0,
        name: "Grounding Methods",
        storedIDs: [0],
      },
      { id: 1, name: "Tracker", storedIDs: [1] },
    ],
    eventTemplates: [
      {
        id: 0,
        name: "Grounding: 5-to-1",
        text: "<div style='text-align: left;'>This technique can be used when feeling anxious or overwhelmed. Before you start, become mindful to your breathing. Take a couple of deep breaths. Then pay attention to your surroundings.</div><ol><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(255, 102, 99);'>five</strong><span style='text-align: left;'> things you can see around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(254, 177, 68);'>four</strong><span style='text-align: left;'> things you can touch around you.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 224, 158);'>three</strong><span style='text-align: left;'> things you can hear right now.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(158, 193, 207);'>two</strong><span style='text-align: left;'> things you can smell.</span><br></li><li><span style='text-align: left;'>Acknowledge </span><strong style='text-align: left; color: rgb(204, 153, 201);'>one</strong><span style='text-align: left;'> thing you can taste.</span><br></li></ol>",
        icon: "fas fa-sun",
        isSetToDefault: false,
      },
      {
        id: 1,
        name: "Todo",
        text: "<div>✔️❌&nbsp;<b>Todo</b><br></div><div><ul><li><br></li></ul></div>",
        icon: "",
        isSetToDefault: false,
      },
    ],
  };
}
