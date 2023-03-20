<template>
  <q-scroll-area :thumb-style="thumbStyle"
    :bar-style="barStyle"
    :style="style">
    <slot name="content"></slot>
  </q-scroll-area>
</template>

<script>
export default {
  name: "BaseScrollArea",
  props: {
    style: Object,
    positionToTheRight: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      thumbStyle: {
        right: this.positionToTheRight + 'px',
        borderRadius: '5px',
        backgroundColor: 'var(--q-secondary)',
        width: '8px',
        opacity: 0.75
      },
      barStyle: {
        right: this.positionToTheRight + 'px',
        borderRadius: '9px',
        backgroundColor: "var(--q-info)",
        width: '11px',
        opacity: 0.2
      }
    };
  },
};
</script>
