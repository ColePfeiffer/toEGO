<template>
  <div class="q-pt-md">
    <div class="row justify-between items-center no-wrap ">
      <div class="col-4  text-left "
        :style="$store.getters['layout/diarySectionHeaderText']">
        <slot name="nameOfTitle">
        </slot>
      </div>
      <div class="col-auto">
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
  name: "DiaryBaseHeader",
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
