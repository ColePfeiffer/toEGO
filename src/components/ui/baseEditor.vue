<template>
  <q-editor
    ref="editorRef"
    class="editor shadow-3 text-justify"
    min-height="17rem"
    toolbar-bg="secondary"
    toolbar-text-color="primary"
    toolbar-color="primary"
    :toolbar="[
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
            <q-item tag="label" clickable @click="saveAsTemplate">
              <q-item-section side>
                <q-icon name="save" />
              </q-item-section>
              <q-item-section>Save as Template</q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="editTemplates">
              <q-item-section side>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>Edit Templates</q-item-section>
            </q-item>
            <!-- v-for list of templates -->

            <div v-for="template in templates" :key="template.id">
              <q-item tag="label" clickable @click="addTemplate(template)">
                <q-item-section side>
                  <q-icon :name="template.icon" />
                </q-item-section>
                <q-item-section>{{ template.name }}</q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-slot:test>
      <q-btn-dropdown
        no-caps
        ref="templatesRef"
        no-wrap
        auto-close
        unelevated
        color="primary"
        text-color="accent"
        label="Templates"
      >
        <q-list>
          <div class="column">
            <q-item tag="label" clickable @click="saveAsTemplate">
              <q-item-section side>
                <q-icon name="save" />
              </q-item-section>
              <q-item-section>Save as Template</q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="editTemplates">
              <q-item-section side>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>Edit Templates</q-item-section>
            </q-item>
            <!-- v-for list of templates -->

            <div v-for="template in templates" :key="template.id">
              <q-item tag="label" clickable @click="addTemplate(template)">
                <q-item-section side>
                  <q-icon :name="template.icon" />
                </q-item-section>
                <q-item-section>{{ template.name }}</q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-editor>
</template>

<script>
export default {
  name: "baseEditor",
  emits: ["update-change-data"],
  data() {
    return {};
  },
  methods: {
    saveAsTemplate() {
      console.log("save!");
      // open dialog or something for naming
    },
    editTemplates() {
      console.log("edit templates");
    },
    addTemplate(template) {
      console.log(template.text);
      // add template to editor text

      const edit = this.editorRef;
      console.log("meh? ", edit);

      let blubb = this.$refs.editorRef;
      console.log("meh! ", blubb);
      console.log("value: ", blubb.getContentEl());
      blubb.runCmd("insertHTML", template.text);

      // test
      blubb.runCmd(
        "insertHTML",
        `&nbsp;<div class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${template.name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`
      );

      blubb.focus();
      /* 
      tokenRef.value.hide();
      edit.caret.restore();
      edit.runCmd(
        "insertHTML",
        `&nbsp;<div class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`
      );
      edit.focus();
      */
    },
  },
  computed: {
    templates() {
      return this.$store.state.data.diaryTemplates.slice();
    },
  },
};
</script>



<style scoped src="98.css">
</style>
