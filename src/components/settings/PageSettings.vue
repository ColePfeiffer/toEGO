<template>
  <p class="q-pa-md text-justify"
    :style="styleForInfoBox">You can change the look of all main pages - <span style="font-style: italic">home</span>,
    <span style="font-style: italic">diary</span> and
    <span style="font-style: italic">new event</span> - here. If you want to reset everything to default, just pick a
    theme via the design settings.
  </p>
  <TheSettingsPageForToday />
  <TheSettingsPageForDiary />
  <TheSettingsPageForNewNote />
</template>

<script>
import TheSettingsPageForToday from "./TheSettingsPageForToday.vue";
import TheSettingsPageForDiary from "./TheSettingsPageForDiary.vue";
import TheSettingsPageForNewNote from "./TheSettingsPageForNewNote.vue";

export default {
  components: {
    TheSettingsPageForToday,
    TheSettingsPageForDiary,
    TheSettingsPageForNewNote
  },
  emits: ["setting-changed"],
  props: { hasSettingChanged: Boolean },
  data() {
    return {
    };
  },
  computed: {
    isDarkModeActive() {
      return this.$store.getters['layout/isDarkModeActive'];
    },
    styleForInfoBox() {
      let style = {};
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
      } else {
        style["background-color"] = "whitesmoke";
        style["color"] = "black";
      }
      return style;
    },
    // TODO: sortiere das weg
    backgroundColorForPreview() {
      if (this.isDarkModeActive) {
        return this.$store.state.layout.blacksmoke;
      } else {
        return this.noteBackgroundColor;
      }
    },

  }
};
</script>