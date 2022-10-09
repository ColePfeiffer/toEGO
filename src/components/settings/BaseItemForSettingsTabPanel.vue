<template>
  <q-item tag="label"
    :v-ripple="false">
    <div class="row full-width justify-between"
      :style="$store.getters['layout/getNonDefaultFont']">
      <q-item-section class="col">
        <q-item-label>{{title}}</q-item-label>
        <q-item-label caption>{{caption}}</q-item-label>
      </q-item-section>
      <slot name="content"
        class="col-12">
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
    },
    isOnSameLine: {
      type: Boolean,
      default: true
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
