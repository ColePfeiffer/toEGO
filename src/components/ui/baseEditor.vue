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
    <template v-slot:templates>
      <q-btn-dropdown
        class="no-icon"
        no-caps
        ref="templatesRef"
        no-wrap
        icon="bi-layout-text-sidebar-reverse"
        auto-close
        unelevated
        :ripple="false"
        color="primary"
        text-color="accent"
        size="sm"
      >
        <q-list>
          <div class="column">
            <q-item tag="label" clickable @click="showTemplateCreator">
              <q-item-section side>
                <q-icon name="save" />
              </q-item-section>
              <q-item-section>Save as Template</q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="showTemplateViewer">
              <q-item-section side>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>Open Templates</q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-slot:fullscreenButton>
      <q-btn
        no-caps
        no-wrap
        icon="bi-fullscreen"
        unelevated
        :ripple="false"
        color="primary"
        text-color="accent"
        size="sm"
      >
      </q-btn>
    </template>

    <template v-slot:changeToolbar>
      <baseButton
        :text="''"
        :changeColor="false"
        :setStyleTo="simplifiedStyle"
        :icon="getIconForChangeToolbarButton"
        ref="button1"
        class="FloatingButton"
        @onClick="changeToolbarMode"
      ></baseButton>
    </template>

    <dialogCreateTemplate
      @closeDialog="closeDialog"
      @createTemplate="createTemplate"
    ></dialogCreateTemplate>
  </q-editor>
</template>

<script>
import dialogCreateTemplate from "../dialogs/DialogCreateTemplate.vue";
import baseButton from "./baseButton.vue";
export default {
  name: "baseEditor",
  emits: ["showTemplateCreator", "showTemplateViewer"],
  props: {
    toolbarColor: {
      type: String,
      default: "secondary",
    },
  },
  components: { dialogCreateTemplate, baseButton },
  data() {
    return {
      isToolbarSetToLessOptions: true,
      templateHolder: "",
      simplifiedStyle: {
        "background-color": "var(--q-accent)",
        color: "black",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
      moreOptions: [
        [
          "templates",
          "changeToolbar",
          "undo",
          "redo",
          "viewsource",
          "hr",
          "link",
        ],
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            options: ["left", "center", "right", "justify"],
          },
          {
            label: "Style",
            icon: this.$q.iconSet.editor.bold,
            fixedLabel: true,
            fixedIcon: true,
            options: ["bold", "italic", "strike", "underline"],
          },
          {
            label: "Lists",
            icon: "list",
            fixedLabel: true,
            options: ["unordered", "ordered", "outdent", "indent"],
          },
        ],
        [
          {
            label: this.$q.lang.editor.fontSize,
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
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "default_font",
              "arial",
              "courier_new",
              "lucida_grande",
              "verdana",
            ],
          },
          "removeFormat",
        ],
      ],
      lessOptions: [
        ["templates", "changeToolbar", "undo", "redo", "fullscreen"],
        [
          {
            label: "",
            icon: "add",
            fixedLabel: true,
            options: ["viewsource", "hr", "link"],
          },
        ],
      ],
    };
  },
  methods: {
    changeToolbarMode() {
      this.isToolbarSetToLessOptions = !this.isToolbarSetToLessOptions;
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
    getIconForChangeToolbarButton() {
      if (this.isToolbarSetToLessOptions) {
        return "bi-plus-lg";
      } else {
        return "bi-dash-lg";
      }
    },
    getToolbar() {
      console.log("meh?", this.isToolbarSetToLessOptions);
      if (this.isToolbarSetToLessOptions === true) {
        console.log("less options");
        return this.lessOptions;
      } else {
        console.log("more options");
        return this.moreOptions;
      }
    },
  },
};
</script>

<style scoped src="98.css">
.editor :deep(.q-editor__toolbars-container) {
  display: none;
}

.button.no-icon i {
  display: none;
}
</style>
