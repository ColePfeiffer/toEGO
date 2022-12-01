<template>
    <div class="row justify-between items-center q-pa-md">
        <div class="col-10"
            style="font-weight: 600"
            @click="isShowingSettings = !isShowingSettings">
            {{ title }}
        </div>
        <BaseButtonExpandable class="col-1"
            color="auto"
            :isNoteExpanded="isShowingSettings"
            @expand="isShowingSettings = !isShowingSettings">
        </BaseButtonExpandable>
    </div>
    <div v-if="isShowingSettings">
        <slot name="content">
        </slot>
    </div>
</template>
  
<script>
import BaseButtonExpandable from '../../common/BaseButtonExpandable.vue';

export default {
    name: "SettingsTabPanelItemFolder",
    components: { BaseButtonExpandable },
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
  