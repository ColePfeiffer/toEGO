<template>
  <q-item tag="label"
    :v-ripple="false">
    <q-item-section>
      <q-item-label>{{title}}</q-item-label>
      <q-item-label caption>{{caption}}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <slot name="content">
      </slot>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "BaseSettingsTabPanel",
  props: {
    title: String,
    caption: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
    };
  },
  methods: {

  },
  computed: {

  },
};
</script>
