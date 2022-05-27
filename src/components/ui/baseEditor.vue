<template>
  <q-editor
    class="editor shadow-3 text-justify"
    min-height="17rem"
    :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify'],
        },
        'bold',
        'italic',
        'strike',
        'underline',
      ],
      ['token', 'hr', 'link', 'custom_btn'],

      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
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
            'size-7',
          ],
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
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

      ['undo', 'redo', 'viewsource', 'fullscreen'],
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
  />
</template>

<script>
export default {
  name: "baseEditor",
  emits: ["update-change-data"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped src="98.css"></style>
