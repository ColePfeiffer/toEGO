<template>
  <div class="q-pt-md">
    <div class="row justify-between items-center no-wrap ">
      <div class="col-8 smallText text-left text-white"
        :style="$store.state.layout.headlineStyle">
        <slot name="nameOfTitle">
        </slot>
      </div>
      <div class="col-4 smallText">
        <div class="row justify-end items-center no-wrap">
          <slot name="buttons">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderForDiarySections",
  props: {
  },
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>
