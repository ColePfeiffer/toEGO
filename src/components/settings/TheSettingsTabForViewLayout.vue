<template>
  <p class="q-pa-md text-justify"
    :style="styleForInfoBox">You can change the look of all main views - <span style="font-style: italic">home</span>,
    <span style="font-style: italic">diary</span> and
    <span style="font-style: italic">note creator</span> - here.
  </p>
  <TheLayoutSectionForToday @setting-changed="settingChanged" />
  <TheLayoutSectionForDiary @setting-changed="settingChanged" />
  <TheLayoutSectionForNoteCreator @setting-changed="settingChanged" />
</template>

<script>
import TheLayoutSectionForToday from "./TheLayoutSectionForToday.vue";
import TheLayoutSectionForDiary from "./TheLayoutSectionForDiary.vue";
import TheLayoutSectionForNoteCreator from "./TheLayoutSectionForNoteCreator.vue";

export default {
  components: {
    TheLayoutSectionForToday,
    TheLayoutSectionForDiary,
    TheLayoutSectionForNoteCreator
  },
  emits: ["setting-changed"],
  props: { hasSettingChanged: Boolean },
  data() {
    return {
    };
  },
  methods: {
    settingChanged(value) {
      this.$emit("setting-changed", value);
    },
  },
  computed: {
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    styleForInfoBox() {
      let style = {};
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      if (this.isDarkModeActive) {
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
