<template>
    <div :style="styleForPreviewContainer"
        class="row justify-center items-center fit">
        <BasePage :titleOfPage="titleOfPage"
            :heightForContentMultiplier="heightForContentMultiplier"
            :mode="layoutMode"
            :isResizing="false"
            :backgroundColor="backgroundColor">
            <template v-slot:titlebar>
                <slot name="titlebar"></slot>
            </template>
            <template v-slot:content-without-scrollarea>
                <slot name="content"></slot>
            </template>
        </BasePage>
    </div>
</template>


<script>
import BasePage from "../../common/BasePage.vue"

export default {
    name: "BasePreview",
    components: { BasePage },
    emits: [],
    props: {
        layoutMode: String,
        heightForContentMultiplier: Number,
        titleOfPage: String,
        backgroundColor: String,
    },
    data() {
        return {
        };
    },
    computed: {
        styleForPreviewContainer() {
            return this.$store.getters["layout/getStyleForLayout"];
        },
    },
};
</script>

