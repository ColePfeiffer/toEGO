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
  <div class="q-px-xs">
    <slot name="content">
      <slot name="content-in-scroll-area"></slot>
    </slot>
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
}
</script>

<style scoped>

</style>
