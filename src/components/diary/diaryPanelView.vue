<template>
  <basePanelWithButtons
    class="secondary"
    :options="options"
    :names="names"
    :hideBordersOnInit="hideBordersOnInit"
    :showNames="showNames"
    :buttonLeftStyle="simplifiedStyle"
    :buttonRightStyle="simplifiedStyle"
  >
    <template v-slot:panelLeftSlot>
      <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
        <q-card class="editorCard shadow-0 text-justify">
          <q-card-section v-html="editor" />
        </q-card>
      </q-scroll-area>
      <div class="row justify-end">
        <q-btn
          class="col=1"
          flat
          icon="fas fa-edit"
          color="secondary"
          @click="changeView('edit')"
        ></q-btn>
      </div>
    </template>
    <!-- right slot -->
    <template v-slot:panelRightSlot>
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
  name: "diaryPanelView",
  components: {
    basePanelWithButtons,
  },
  emits: ["scroll", "changeView"],
  data() {
    return {
      heightForScrollArea: "height: 350px",
      editor:
        "<div style='text-align: left;'><b>What did go well today?</b><br></div><div style='text-align: left;'><span style='text-align: right;'>Got work done. Yaay.</span></div><div style='text-align: left;'><b><br></b></div><div style='text-align: right;'><div style='text-align: right;'><b>What are you grateful for?</b></div><div style='text-align: right;'>Grateful for my boyfriend, my mom, my dad, my sister. Life. Music. Food. Sun.&nbsp;</div></div><div style='text-align: center;'><br></div><div style='text-align: left;'><b>What will you do tomorrow?</b></div>",
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
    changeView(viewMode) {
      this.$emit("change-view", viewMode);
    },
  },
};
</script>

<style scoped>
.test {
  background-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0);
}

.editorCard {
  font-size: 12.5px;
  background-color: rgba(255, 255, 255, 0);
}
</style>
