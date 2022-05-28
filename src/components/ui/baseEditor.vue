<template>
  <q-editor
    class="editor shadow-3 text-justify"
    min-height="17rem"
    :toolbar="[
      ['templates', 'undo', 'redo', 'viewsource', 'fullscreen'],
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
      ['hr', 'link', 'custom_btn'],
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
        ref="tokenRef"
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
            <div>
              <q-item tag="label" clickable @click="addTemplate('default')">
                <q-item-section side>
                  <q-icon name="sun" />
                </q-item-section>
                <q-item-section>Default</q-item-section>
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
    addTemplate(id) {
      // add template to editor text
    },
  },
  computed: {},
};
</script>

<style scoped src="98.css"></style>
