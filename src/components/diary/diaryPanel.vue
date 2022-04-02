<template>
  <basePanelWithButtons
    :options="options"
    :names="names"
    :hideBordersOnInit="hideBordersOnInit"
    :showNames="showNames"
    :buttonLeftStyle="simplifiedStyle"
    :buttonRightStyle="simplifiedStyle"
  >
    <template v-slot:panelLeftSlot>
      <div class="row justify-end">
        <q-btn
          class="col=1"
          flat
          icon="fas fa-folder-open"
          color="secondary"
        ></q-btn>
        <q-select
          dense
          borderless
          v-model="statusTemplateModel"
          :options="statusTemplateOptions"
          label="templates"
        >
        </q-select>
      </div>

      <div class="column items-center">
        <div class="col text-center q-pt-md">What did go well today?</div>
        <div class="col">_________________</div>
        <div class="col text-center">What can I do differently tomorrow?</div>
        <div class="col">_________________</div>
        <div class="col text-center">I am grateful for...</div>
        <div class="col">_________________</div>
      </div>
    </template>
    <template v-slot:panelRightSlot>
      <div class="row justify-end">
        <q-btn
          class="col=1"
          flat
          icon="fas fa-folder-open"
          color="secondary"
        ></q-btn>
        <q-select
          dense
          borderless
          v-model="statusTemplateModel"
          :options="statusTemplateOptions"
          label="templates"
        >
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
      statusTemplateModel: "default",
      statusTemplateOptions: ["default", "gratitude"],
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

