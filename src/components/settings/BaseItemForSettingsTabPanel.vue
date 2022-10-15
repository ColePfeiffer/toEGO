<template>
  <q-item tag="label"
    :v-ripple="false">
    <div v-if="isOnSameLine"
      class="row full-width justify-between items-center"
      :style="$store.getters['layout/getNonDefaultFont']">
      <q-item-section class="col-6">
        <q-item-label>{{title}}</q-item-label>
        <q-item-label caption>{{caption}}</q-item-label>
      </q-item-section>
      <div class="col-6 text-right self-end">
        <slot name="content">
        </slot>
      </div>
    </div>
    <div v-else
      class="row full-width justify-between"
      :style="$store.getters['layout/getNonDefaultFont']">
      <q-item-section class="col-12">
        <q-item-label>{{title}}</q-item-label>
        <q-item-label caption>{{caption}}</q-item-label>
      </q-item-section>
      <div class="col-12 text-right ">
        <slot name="content">
        </slot>
      </div>


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
