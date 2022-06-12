<template>
  <q-editor
    ref="editorRef"
    class="editor shadow-3 text-justify"
    min-height="17rem"
    :toolbar-bg="toolbarColor"
    toolbar-text-color="primary"
    toolbar-color="primary"
    :toolbar="getToolbar"
    :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana',
    }"
  >

    <template v-slot:fullscreenButton>
      <q-btn
        flat
        no-wrap
        icon="bi-fullscreen"
        :style="ButtonStyleFlatJustIcon"
        btn
        btn-square
        btn-sm
        btn-ghost-blue
        :ripple="false"
        text-color="primary"
        size="xs"
        @click="toggleFullscreen"
      >
      </q-btn>
    </template>

    <template v-slot:placeholderElementSmall>
      <div class="placeholderElementContainer">
        <div class="placeholderElement" style="width: 90px"></div>
      </div>
    </template>

    <template v-slot:toggleMoreOptionsButton>
      <q-btn no-caps @click="changeToolbarMode" :style="ButtonStyleRegularButton" :ripple="false">
        <div class="row items-center no-wrap">
          <q-icon size="8px" left :name="getIconForToggleToolbarButton" />
          <div class="text-center" style="font-size: 12.5px">
            {{ getLabelForToggleToolbarButton }}
          </div>
        </div>
      </q-btn>
    </template>

    <template v-slot:templatesMenuButton>
      <q-btn no-caps :style="ButtonStyleRegularButton" :ripple="false">
        <div class="row items-center no-wrap">
          <q-icon size="8px" left name="bi-layout-text-sidebar-reverse" />
          <div class="text-center" style="font-size: 12.5px">Temps</div>
        </div>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="showTemplateViewer">
              <q-item-section>Show Templates</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="showTemplateCreator">
              <q-item-section>Save as new template</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Quick List</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>

    <dialogCreateTemplate
      @closeDialog="closeDialog"
      @createTemplate="createTemplate"
    ></dialogCreateTemplate>
  </q-editor>
</template>

<script>
import dialogCreateTemplate from "../dialogs/DialogCreateTemplate.vue";
export default {
  name: "baseEditor",
  emits: ["showTemplateCreator", "showTemplateViewer"],
  props: {
    toolbarColor: {
      type: String,
      default: "lightGray",
    },
  },
  components: { dialogCreateTemplate,  },
  data() {
    return {
      isShowingFullToolbar: false,
      isInFullscreenMode: false,
      templateHolder: "",
           ButtonStyleRegularButton: {
        "min-width": "83px",
        "max-width": "83px",
        "min-height": "23px",
      },
      ButtonStyleFlatJustIcon: {
        "background-color": "transparent",
        "border-style": "unset",
        "box-shadow": "none",
        "min-width": "20px",
        "max-width": "20px",
        "min-height": "20px",
      },
      simplifiedStyle: {
        "background-color": "var(--q-accent)",
        color: "black",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
      moreOptions: [
        ["templatesMenuButton", "toggleMoreOptionsButton"],
        [
          {
            label: "Style",
            icon: this.$q.iconSet.editor.bold,
            fixedLabel: true,
            fixedIcon: true,
            options: ["bold", "italic", "strike", "underline"],
          },
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            options: ["left", "center", "right", "justify"],
          },
          {
            label: "Lists",
            icon: "list",
            fixedLabel: true,
            options: ["unordered", "ordered", "outdent", "indent"],
          },
          {
            label: "Font",
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            fixedLabel: true,
            list: "no-icons",
            options: [
              "default_font",
              "arial",
              "courier_new",
              "lucida_grande",
              "verdana",
            ],
          },
          {
            label: "Size",
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "size-1",
              "size-2",
              "size-3",
              "size-4",
              "size-5",
              "size-6",
            ],
          },
        ],
        [
          "undo",
          "redo",
          "fullscreenButton",
          "link",
          "hr",
          "viewsource",
          "removeFormat",
        ],
      ],
      lessOptions: [
        [
          "placeholderElementSmall",
          "templatesMenuButton",
          "toggleMoreOptionsButton",
        ],
        ["placeholderElementSmall"],
        ["undo", "redo", "fullscreenButton"],
      ],
    };
  },
  methods: {
    changeToolbarMode() {
      this.isShowingFullToolbar = !this.isShowingFullToolbar;
    },
    toggleFullscreen() {
      let editorRef = this.$refs.editorRef;
      if (this.isInFullscreenMode) {
        // if the editor already is in fullscreen mode, and he clicks on this button, we want to go back to normal view, and hide the full toolbar.
        this.isShowingFullToolbar = false;
        this.isInFullscreenMode = false;
        editorRef.exitFullscreen();
      } else {
        this.isShowingFullToolbar = true;
        this.isInFullscreenMode = true;
        editorRef.setFullscreen();
      }

      editorRef.refreshToolbar();
      editorRef.focus();
    },
    showTemplateCreator() {
      this.$emit("showTemplateCreator");
    },
    showTemplateViewer() {
      this.$emit("showTemplateViewer");
    },

    pasteTemplate(template) {
      /*
let editorRef = this.$refs.editorRef;
      editorRef.runCmd("insertHTML", template.text);
      editorRef.focus();
 */
    },
  },

  computed: {
    getLabelForToggleToolbarButton() {
      if (this.isShowingFullToolbar) {
        return "less";
      } else {
        return "more";
      }
    },
    getIconForToggleToolbarButton() {
      if (this.isShowingFullToolbar) {
        return "bi-dash-lg";
      } else {
        return "bi-plus-lg";
      }
    },
    getToolbar() {
      if (this.isShowingFullToolbar === false) {
        return this.lessOptions;
      } else {
        return this.moreOptions;
      }
    },
  },
};
</script>
<style>
.q-editor__toolbar-group {
  width: 95px !important;
}
</style>
<style scoped src="98.css">
.editor :deep(.q-editor__toolbars-container) {
  display: none;
}

.placeholderElementContainer {
  width: 20px;
  height: 20px;
  background-color: red;
}

.placeholderElement {
  background-color: green;
}

.button.no-icon i {
  display: none;
}
</style>
