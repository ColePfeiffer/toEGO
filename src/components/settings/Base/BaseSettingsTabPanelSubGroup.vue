<template>
  <div class="row justify-between items-center q-pa-md">
    <div class="col-10"
      style="font-weight: 600"
      @click="isShowingSettings = !isShowingSettings">
      {{ title }}
    </div>
    <ButtonExpandable class="col-1"
      color="auto"
      :isNoteExpanded="isShowingSettings"
      @expand="isShowingSettings = !isShowingSettings">
    </ButtonExpandable>
  </div>
  <div v-if="isShowingSettings">
    <slot name="content">
    </slot>
  </div>
</template>

<script>
import ButtonExpandable from '../../common/ButtonExpandable.vue';

export default {
  name: "SettingsTabPanelItemFolder",
  components: { ButtonExpandable },
  props: {
    title: String,
  },
  data() {
    return {
      isShowingSettings: false,
    };
  },
};
</script>
