<template>
  <q-card class="q-px-sm q-pb-none q-mt-lg noBorderRadius"
    :style="$store.getters['layout/getStyleForTransparentCard']">
    <q-card-section class="cardSection">
      <slot name="content">
        <p class="cursor-pointer q-pa-xs q-mb-none text-center"
          :style="$store.getters['layout/getStyleForText']">
          {{ text }}
        </p>
      </slot>
      <div class="tape tape-1"
        :style="getStyleForTape"></div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    text: {
      type: String,
      default: "",
    },
    tapeColor: {
      type: String,
      default: "",
    }
  },
  computed: {
    getStyleForTape() {
      return { 'background': this.tapeColor + '59' }
    }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.noBorderRadius {
  border-radius: 0px;
}

.tape {
  position: absolute;
  top: -12px;
  left: 26%;
  height: 25px;
  width: 128px;
  transform: rotate(1deg);
}
</style>
