<template>
  <q-editor
    ref="editorRef"
    :content-class="{ 'max-width': '200px' }"
    class="editor shadow-3 text-justify"
    :min-height="minHeight"
    :toolbar-bg="getToolbarBackgroundColor"
    :toolbar-text-color="getToolbarIconColor"
    :toolbar-color="getToolbarIconColor"
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
        :style="$store.state.data.buttonFlatOnlyIcon"
        :ripple="false"
        :text-color="getToolbarIconColor"
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
      <q-btn
        flat
        no-caps
        @click="changeToolbarMode"
        :style="$store.state.data.buttonFlatStyle"
        :ripple="false"
      >
        <div class="row items-center no-wrap">
          <q-icon
            size="8px"
            color="black"
            left
            :name="getIconForToggleToolbarButton"
          />
          <div class="text-center text-black" style="font-size: 12.5px">
            {{ getLabelForToggleToolbarButton }}
          </div>
        </div>
      </q-btn>
    </template>

    <template v-slot:templatesMenuButton>
      <q-btn
        flat
        no-caps
        :style="$store.state.data.buttonFlatStyle"
        :ripple="false"
      >
        <div class="row items-center no-wrap">
          <q-icon
            size="8px"
            color="black"
            left
            name="bi-layout-text-sidebar-reverse"
          />
          <div class="text-center text-black" style="font-size: 12.5px">
            Temps
          </div>
        </div>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="openDialogViewTemplates">
              <q-item-section>Show Templates</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="openDialogCreateTemplate">
              <q-item-section>Save as new template</q-item-section>
            </q-item>
            <q-separator />

            <q-item
              clickable
              :style="pasteQuicklistTextStyle"
              :disable="isQuicklistDisabled"
            >
              <q-item-section>Paste Quick-List</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <!-- Submenu -->
              <q-menu anchor="top end" self="top start" auto-close>
                <q-list>
                  <q-item
                    v-for="template in $store.getters[
                      'data/getQuickListContent'
                    ](type)"
                    :key="template"
                    dense
                    clickable
                    @click="pasteTemplate(template)"
                  >
                    <q-item-section avatar>
                      <q-icon
                        dense
                        size="xs"
                        name="bi-file-font"
                        color="secondary"
                      />
                    </q-item-section>

                    <q-item-section>{{ template.name }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </q-editor>
</template>

<script>
export default {
  name: "baseEditor",
  emits: [
    "openDialogCreateTemplate",
    "openDialogViewTemplates",
    "pasteTemplate",
  ],
  props: {
    minHeight: String,
    type: String,
  },
  data() {
    return {
      styleForToolbarDark: { background: "black" },
      styleForToolbar: { background: "white" },
      isShowingFullToolbar: false,
      isInFullscreenMode: false,
      templateHolder: "",
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
    openDialogCreateTemplate() {
      this.$emit("openDialogCreateTemplate");
    },
    openDialogViewTemplates() {
      this.$emit("openDialogViewTemplates");
    },

    pasteTemplate(template) {
      this.$emit("pasteTemplate", template);
    },
  },

  computed: {
    pasteQuicklistTextStyle() {
      if (this.isQuicklistDisabled) {
        return {
          color: "#d3d3d3 ",
        };
      } else {
        return {
          color: "var(--q-primary)",
        };
      }
    },
    isQuicklistDisabled() {
      let templates = this.$store.getters["data/getQuickListContent"](
        this.type
      );

      if (templates.length < 1) {
        return true;
      } else {
        return false;
      }
    },
    getToolbarIconColor() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return "secondary";
      } else {
        return "black";
      }
    },
    getToolbarBackgroundColor() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return "black";
      } else {
        return "white";
      }
    },
    getStyleForToolbar() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleForToolbarDark;
      } else {
        return this.styleForToolbar;
      }
    },
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
.q-editor__toolbar-group {
  width: 20px;
}

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
