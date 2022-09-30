<template>
    <div :style="getWidth">
        <HeaderForDiarySections>
            <template v-slot:nameOfTitle>
                <slot name="nameOfTitle"></slot>
            </template>
            <template v-slot:buttons>
                <ButtonsForDiarySection>
                    <!-- Left-Side Buttons -->
                    <template v-slot:leftSideButton="payload">
                        <ButtonForDiarySection :textColor="payload.textColor"
                            :icon="payload.icon"
                            :label="payload.label"
                            :style="payload.style"
                            @click-button="clickLeftButton" />
                    </template>
                    <!-- Right-Side Button -->
                    <template v-slot:rightSideButton="rightProps">
                        <ButtonForDiarySection :textColor="rightProps.textColor"
                            :icon="rightProps.icon"
                            :label="rightProps.label"
                            :style="rightProps.style"
                            @click-button="clickRightButton" />
                    </template>

                </ButtonsForDiarySection>
            </template>
        </HeaderForDiarySections>


    </div>
    <!-- Content -->
    <div>
        <q-scroll-area :style="getHeightForScrollArea"
            ref="scrollArea">
            <slot name="Content">
            </slot>
        </q-scroll-area>
    </div>
</template>
  
<script>
import HeaderForDiarySections from './HeaderForDiarySections.vue';
import ButtonsForDiarySection from './ButtonsForDiarySection.vue';
import ButtonForDiarySection from './ButtonForDiarySection.vue';
export default {
    name: "TheEventSection",
    emits: ["click-left-button", "click-right-button"],
    props: {
        width: {
            type: Number,
            default: 350,
        },
        heightForScrollArea: {
            type: Number,
            default: 175
        },
        isShowingLeftButton: Boolean,
        isShowingRightButton: Boolean,
    },
    data() {
        return {};
    },
    computed: {
        getWidth() {
            return { width: this.width };
        },
        getHeightForScrollArea() {
            return { height: this.heightForScrollArea + "px", width: this.width + "px" };
        },
    },
    methods: {
        clickLeftButton(buttonName) {
            this.$emit("click-left-button", buttonName);
        },
        clickRightButton(buttonName) {
            this.$emit("click-right-button", buttonName);
        }
    },
    components: { HeaderForDiarySections, ButtonsForDiarySection, ButtonForDiarySection }
}
</script>
  
<style scoped>

</style>
  