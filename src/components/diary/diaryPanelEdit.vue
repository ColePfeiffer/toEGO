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
            <div class="row justify-end">
        <q-btn
          class="col=1"
          flat
          icon="fas fa-angle-left"
          color="secondary"
          @click="changeView('view')"
        ></q-btn>
        <q-btn class="col=1" flat icon="fas fa-save" color="secondary" @click="saveChanges"></q-btn>
      </div>
      <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
        <q-editor
          class="editor shadow-3 text-justify"
          v-model="diaryEntryChangeData.editor"
          min-height="17rem"
          :toolbar="[
        [{
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }, 'bold', 'italic', 'strike', 'underline'],
        ['token', 'hr', 'link', 'custom_btn'],
      
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'courier_new',
              'lucida_grande',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo', 'viewsource', 'fullscreen', ]
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
        />
      </q-scroll-area>

    </template>
    <!-- right slot -->
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
  name: "diaryPanelEdit",
  components: {
    basePanelWithButtons,
  },
  emits: ["scroll", "change-view", "save-changes"],
  data() {
    return {
      diaryEntryChangeData: {
            id: this.diaryEntry.id,
        date: this.diaryEntry.date,
        editor: this.diaryEntry.editor,
        events: this.diaryEntry.events
        },
      heightForScrollArea: "height: 350px",
        //"<div style='text-align: left;'><b>What did go well today?</b><br></div><div style='text-align: left;'><span style='text-align: right;'>Got work done. Yaay.</span></div><div style='text-align: left;'><b><br></b></div><div style='text-align: right;'><div style='text-align: right;'><b>What are you grateful for?</b></div><div style='text-align: right;'>Grateful for my boyfriend, my mom, my dad, my sister. Life. Music. Food. Sun.&nbsp;</div></div><div style='text-align: center;'><br></div><div style='text-align: left;'><b>What will you do tomorrow?</b></div>",
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
    props: {
    diaryEntry: Object,
  },
  computed: {
    editorD(){
      return this.diaryEntry.editor;
    }
  },
  methods: {
    scroll(offset) {
      this.$emit("scroll", offset);
    },
    changeView(viewMode) {
      this.$emit("change-view", viewMode);
    },
    saveChanges(){
    this.$emit("save-changes", this.diaryEntryChangeData);
    this.$emit("change-view", 'view');
    },
  },
};
</script>

<style scoped>
.test {
  background-color: rgba(255, 255, 255, 0.3);
}

.editor {
  font-size: 12.5px;
}

.templateSelector {
  font-size: 12.5px;
}
</style>
