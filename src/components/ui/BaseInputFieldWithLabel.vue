<template>
  <q-input class="input"
    stack-label
    filled
    square
    :input-style="'max-height: '+ maxHeight +'px; min-height: '+ minHeight + 'px; font-size: ' + $store.state.layout.fontsize + 'px; font-family: '+$store.state.layout.nonDefaultFont"
    :rules="rules" />
</template>

<script>


export default {
  name: "BaseInputFieldWithLabel",
  props: {
    isTextSetToCentered: {
      type: Boolean,
      default: true,
    },
    maxHeight: Number,
    minHeight: Number,
    rules: Object,
  },
};

</script>

<style scoped>
.input {
  color: red;
  font-family: Tahoma;
  min-width: 250px !important;
  max-width: 250px !important;
}
</style>
