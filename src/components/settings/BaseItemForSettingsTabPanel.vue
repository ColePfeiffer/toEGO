<template>
  <q-item tag="label"
    :v-ripple="false">
    <div class="row full-width justify-between"
      :style="$store.getters['layout/getNonDefaultFont']">
      <q-item-section class="col">
        <q-item-label>{{title}}</q-item-label>
        <q-item-label caption>{{caption}}</q-item-label>
      </q-item-section>
      <slot name="content">
      </slot>
    </div>
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
