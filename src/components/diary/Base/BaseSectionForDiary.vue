<template>
  <div>
    <HeaderForDiarySections>
      <template v-slot:nameOfTitle>
        <slot name="nameOfTitle"></slot>
      </template>
      <template v-slot:buttons>
        <slot name="leftSideButton">
        </slot>
        <slot name="rightSideButton">
        </slot>
      </template>
    </HeaderForDiarySections>
  </div>
  <!-- Content -->
  <div>
    <q-scroll-area :style="getHeightForScrollArea"
      ref="scrollArea">
      <slot name="content">
      </slot>
    </q-scroll-area>
  </div>
</template>

<script>
import HeaderForDiarySections from './HeaderForDiarySections.vue';
export default {
  name: "BaseSectionForDiary",
  emits: [],
  components: {
    HeaderForDiarySections,
  },
  props: {
    heightForScrollArea: {
      type: Number,
      default: 175
    },
  },
  computed: {
    getHeightForScrollArea() {
      return { height: this.heightForScrollArea + "px" };
    },
  },
}
</script>

<style scoped>

</style>
