<template>
  <basePanelWithButtons
    :options="options"
    :names="names"
    :hideBordersOnInit="hideBordersOnInit"
    :showNames="showNames"
    :buttonLeftStyle="simplifiedStyle"
    :buttonRightStyle="simplifiedStyle"
  >
    <template v-slot:panelLeftSlot> </template>
    <template v-slot:panelRightSlot>
      <div class="row justify-end">
        <q-select
          dense
          borderless
          v-model="diaryTemplateModel"
          :options="diaryTemplateOptions"
          label="templates"
          ><template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
      <div class="column">
        <div class="col text-left">Overall Mood</div>
        <div class="col text-center">O O O O O</div>
      </div>
      <div class="col text-left">Weather</div>
      <div class="col text-center">O O O O O</div>
      <div class="col text-left">Tags</div>
      <div class="col text-center">O O O O O</div>
    </template>
  </basePanelWithButtons>
</template>

<script>
import basePanelWithButtons from "../ui/basePanelWithButtons.vue";

export default {
  name: "diaryPanel",
  components: {
    basePanelWithButtons,
  },
  emits: ["scroll"],
  data() {
    return {
      diaryTemplateModel: "default",
      diaryTemplateOptions: ["default", "gratitude"],
      options: [
        { value: "Diary", slot: "diaryBtnSlot" },
        { value: "Status", slot: "statusBtnSlot" },
      ],
      names: ["Diary", "Status"],
      hideBordersOnInit: false,
      showNames: false,
      simplifiedStyle: {
        "background-color": "var(--q-accent)",

        color: "black",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
    };
  },
  methods: {
    scroll(offset) {
      this.$emit("scroll", offset);
    },
  },
};
</script>

