<template>
  <q-editor
    ref="editorRef"
    class="editor shadow-3 text-justify"
    min-height="17rem"
    toolbar-bg="secondary"
    toolbar-text-color="primary"
    toolbar-color="primary"
    :toolbar="[
      ['testerei'],
      ['templates', 'undo', 'redo', 'viewsource', 'fullscreen', 'hr', 'link'],
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify'],
        },
        {
          label: 'Style',
          icon: $q.iconSet.editor.bold,
          fixedLabel: true,
          fixedIcon: true,
          options: ['bold', 'italic', 'strike', 'underline'],
        },
        {
          label: 'Lists',
          icon: 'list',
          fixedLabel: true,
          options: ['unordered', 'ordered', 'outdent', 'indent'],
        },
      ],
      [
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6'],
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
            'verdana',
          ],
        },
        'removeFormat',
      ],
    ]"
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
    <template v-slot:testerei>
      <q-btn label="MEH" icon="add"> </q-btn>
    </template>
    <template v-slot:templates>
      <q-btn-dropdown
        no-caps
        ref="templatesRef"
        no-wrap
        auto-close
        unelevated
        color="primary"
        text-color="accent"
        label="Templates"
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
  components: { dialogCreateTemplate },
  data() {
    return {
      templateHolder: "",
    };
  },
  methods: {
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
  computed: {},
};
</script>



<style scoped src="98.css">
.editor :deep(.q-editor__toolbars-container) {
  display: none;
}
</style>
