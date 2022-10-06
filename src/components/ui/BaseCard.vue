<template>
  <q-card class="shadow-3"
    :style="$store.getters['layout/getStyleForRegularCard']">
    <slot name="content">
      <q-card-section :class="{ 'text-center': isTextCentered, 'text-left': isTextLeft }">
        <slot name="contentInsideSection">
        </slot>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    isTextSetToCentered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isTextCentered() {
      if (this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    },
    isTextLeft() {
      if (!this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>
