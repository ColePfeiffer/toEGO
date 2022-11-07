<template>
    <BaseSettingsTabPanelGroup title="Diary"
        :isExpanded="isDiaryGroupExpanded"
        @toggle-expand-state="isDiaryGroupExpanded = !isDiaryGroupExpanded">
        <template v-slot:q-item-section-content>
            <ThePreviewForDiary :layoutMode="diaryMode"
                :backgroundColor="diaryBackgroundColor"
                :isDiaryTitlebarShowingDay="isDiaryTitlebarShowingDay"
                :cardBackground="cardBackgroundColorForPreview"
                :borderColorLeft="borderColorLeftForPreview"
                :borderColorRight="borderColorRightForPreview"
                :textShadowColor="textShadowForPreview"
                :isNoteTitleColorful="isNoteTitleColorfulForPreview"></ThePreviewForDiary>
            <!-- Section: Layout -->
            <div class="row justify-between items-center q-pa-md">
                <div class="col-10"
                    style="font-weight: 600">
                    Page Layout: {{ getTitleForDiary }}
                </div>
                <BaseButtonExpandable class="col-1"
                    :isEventExpanded="isShowingSettingsForDiaryPage"
                    @expand="isShowingSettingsForDiaryPage = !isShowingSettingsForDiaryPage">
                </BaseButtonExpandable>
            </div>
            <div v-if="isShowingSettingsForDiaryPage">
                <BaseItemForSettingsTabPanel title=""
                    dense>
                    <template v-slot:content-without-label>
                        <div class="row justify-center items-center fit">
                            <q-btn-toggle v-model="diaryMode"
                                dense
                                class="col-12 my-custom-toggle"
                                style="width: 119px"
                                color="transparent"
                                square
                                unelevated
                                toggle-color="accent"
                                text-color="lightgrey"
                                toggle-text-color="white"
                                no-caps
                                :options="[
                                    { label: '', icon: 'bi-square', padding: '10px', value: 'clear' },
                                    { label: '', icon: 'bi-window', padding: '10px', value: 'retro' },
                                    { label: '', icon: 'bi-square-fill', padding: '10px', value: 'border' },
                                ]" />

                        </div>
                    </template>
                </BaseItemForSettingsTabPanel>
                <BaseItemForSettingsTabPanel v-if="diaryMode != 'clear'"
                    :color="diaryBackgroundColor"
                    dense
                    icon="bi-square-fill"
                    title="Background"
                    caption="Set color and opacity.">
                    <template v-slot:content>
                        <q-input filled
                            dense
                            hide-bottom-space
                            v-model="diaryBackgroundColor"
                            :rules="['anyColor']"
                            class="color-picker-input">
                            <template v-slot:append>
                                <q-icon name="colorize"
                                    class="cursor-pointer">
                                    <q-popup-proxy cover
                                        transition-show="scale"
                                        transition-hide="scale">
                                        <q-color v-model="diaryBackgroundColor" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                    </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Titlebar is showing date">
                    <template v-slot:content>
                        <q-toggle color="accent"
                            v-model="isDiaryTitlebarShowingDay" />
                    </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Diary is counting days"
                    dense
                    caption="">
                    <template v-slot:content>
                        <q-toggle color="accent"
                            v-model="isDiaryCountingDays" />
                    </template>
                </BaseItemForSettingsTabPanel>
                <q-separator />
                <BaseItemForSettingsTabPanel title="Text Shadow"
                    dense
                    :color="diaryBorderColor"
                    icon="bi-square-fill"
                    v-if="!isDiarySubtitleStyleSetToAlternative">
                    <template v-slot:content>
                        <q-input filled
                            dense
                            hide-bottom-space
                            v-model="diaryBorderColor"
                            :rules="['anyColor']"
                            class="color-picker-input">
                            <template v-slot:append>
                                <q-icon name="colorize"
                                    class="cursor-pointer">
                                    <q-popup-proxy cover
                                        transition-show="scale"
                                        transition-hide="scale">
                                        <q-color v-model="diaryBorderColor" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </template>
                </BaseItemForSettingsTabPanel>
                <BaseItemForSettingsTabPanel title="Border Color"
                    dense
                    :color="diaryBorderColorAlternative"
                    icon="bi-square-fill"
                    v-if="isDiarySubtitleStyleSetToAlternative">
                    <template v-slot:content>
                        <q-input filled
                            dense
                            hide-bottom-space
                            v-model="diaryBorderColorAlternative"
                            :rules="['anyColor']"
                            class="color-picker-input">
                            <template v-slot:append>
                                <q-icon name="colorize"
                                    class="cursor-pointer">
                                    <q-popup-proxy cover
                                        transition-show="scale"
                                        transition-hide="scale">
                                        <q-color v-model="diaryBorderColorAlternative" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </template>
                </BaseItemForSettingsTabPanel>
                <BaseItemForSettingsTabPanel title="Style floating text and buttons"
                    :isOnSameLine="false"
                    caption="Toggles between Border or Shadow, may help with readabilty"
                    dense>
                    <template v-slot:content>
                        <q-toggle color="accent"
                            v-model="isDiarySubtitleStyleSetToAlternative" />
                    </template>
                </BaseItemForSettingsTabPanel>

            </div>
            <q-separator></q-separator>
            <!-- Section: Content -->
            <div class="row justify-between items-center q-pa-md"
                :style="styleForDarkerContainer">
                <div class="col-10"
                    style="font-weight: 600">
                    Content
                </div>
                <BaseButtonExpandable class="col-1"
                    :isEventExpanded="isShowingSettingsForDiaryContent"
                    @expand="isShowingSettingsForDiaryContent = !isShowingSettingsForDiaryContent">
                </BaseButtonExpandable>
            </div>
            <div v-if="isShowingSettingsForDiaryContent"
                :style="styleForDarkerContainer">
                <BaseItemForSettingsTabPanel title="Use style from 'Today's notes'"
                    dense
                    caption="">
                    <template v-slot:content>
                        <q-toggle color="accent"
                            v-model="isDiaryInputStyleSetToTodaysNotes" />
                    </template>
                </BaseItemForSettingsTabPanel>
                <div v-if="!isDiaryInputStyleSetToTodaysNotes">
                    <q-separator />
                    <BaseItemForSettingsTabPanel title="Title and Emoji are colorful">
                        <template v-slot:content>
                            <q-toggle color="accent"
                                v-model="noteTitleRowIsColoredForDiary" />
                        </template>
                    </BaseItemForSettingsTabPanel>
                    <BaseItemForSettingsTabPanel title="Card Background"
                        dense
                        :color="diaryCardBackgroundColor"
                        icon="bi-square-fill"
                        caption="Set color and opacity.">
                        <template v-slot:content>
                            <q-input filled
                                dense
                                hide-bottom-space
                                v-model="diaryCardBackgroundColor"
                                :rules="['anyColor']"
                                class="color-picker-input">
                                <template v-slot:append>
                                    <q-icon name="colorize"
                                        class="cursor-pointer">
                                        <q-popup-proxy cover
                                            transition-show="scale"
                                            transition-hide="scale">
                                            <q-color v-model="diaryCardBackgroundColor" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </template>
                    </BaseItemForSettingsTabPanel>
                    <BaseItemForSettingsTabPanel title="Text Shadow"
                        :color="noteTextShadowColorForDiary"
                        icon="bi-square-fill"
                        caption="Set color and opacity.">
                        <template v-slot:content>
                            <q-input filled
                                dense
                                hide-bottom-space
                                v-model="noteTextShadowColorForDiary"
                                :rules="['anyColor']"
                                class="color-picker-input">
                                <template v-slot:append>
                                    <q-icon name="colorize"
                                        class="cursor-pointer outline">
                                        <q-popup-proxy cover
                                            transition-show="scale"
                                            transition-hide="scale">
                                            <q-color v-model="noteTextShadowColorForDiary" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </template>
                    </BaseItemForSettingsTabPanel>

                    <div class="row justify-between items-center q-pa-md">
                        <div class="col-10">
                            Border
                        </div>
                        <BaseButtonExpandable class="col-1"
                            :isEventExpanded="isShowingBorderOptionsForDiary"
                            @expand="isShowingBorderOptionsForDiary = !isShowingBorderOptionsForDiary">
                        </BaseButtonExpandable>
                    </div>
                    <div v-if="isShowingBorderOptionsForDiary">
                        <BaseItemForSettingsTabPanel :color="borderColorLeftForDiary"
                            icon="bi-square-fill"
                            title="Left Color">
                            <template v-slot:content>
                                <q-input filled
                                    dense
                                    hide-bottom-space
                                    v-model="borderColorLeftForDiary"
                                    :rules="['anyColor']"
                                    class="color-picker-input ">
                                    <template v-slot:append>
                                        <q-icon name="colorize"
                                            class="cursor-pointer">
                                            <q-popup-proxy cover
                                                transition-show="scale"
                                                transition-hide="scale">
                                                <q-color v-model="borderColorLeftForDiary" />
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </template>
                        </BaseItemForSettingsTabPanel>

                        <BaseItemForSettingsTabPanel :color="borderColorRightForDiary"
                            icon="bi-square-fill"
                            title="Right Color">
                            <template v-slot:content>
                                <q-input filled
                                    dense
                                    hide-bottom-space
                                    v-model="borderColorRightForDiary"
                                    :rules="['anyColor']"
                                    class="color-picker-input ">
                                    <template v-slot:append>
                                        <q-icon name="colorize"
                                            class="cursor-pointer">
                                            <q-popup-proxy cover
                                                transition-show="scale"
                                                transition-hide="scale">
                                                <q-color v-model="borderColorRightForDiary" />
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </template>
                        </BaseItemForSettingsTabPanel>
                    </div>

                </div>
            </div>
        </template>
    </BaseSettingsTabPanelGroup>
</template>


<script>
import BaseSettingsTabPanelGroup from './BaseSettingsTabPanelGroup.vue';
import BaseItemForSettingsTabPanel from './BaseItemForSettingsTabPanel.vue';
import BaseButtonExpandable from '../ui/BaseButtonExpandable.vue';
import ThePreviewForDiary from "./ThePreviewForDiary.vue";

export default {
    name: "TheSettingsPageForToday",
    components: { ThePreviewForDiary, BaseSettingsTabPanelGroup, BaseButtonExpandable, BaseItemForSettingsTabPanel },
    props: {
    },
    data() {
        return {
            isDiaryGroupExpanded: false,
            isShowingBorderOptionsForDiary: false,
            isShowingSettingsForDiaryPage: false,
            isShowingSettingsForDiaryContent: false,
        };
    },
    computed: {
        cardBackgroundColorForPreview() {
            if (this.isDiaryInputStyleSetToTodaysNotes) {
                return this.$store.state.layout.noteBackgroundColor;
            } else {
                return this.diaryCardBackgroundColor;
            }
        },
        textShadowForPreview() {
            if (this.isDiaryInputStyleSetToTodaysNotes) {
                return this.$store.state.layout.noteTextShadowColorForHome;
            } else {
                return this.noteTextShadowColorForDiary;
            }
        },
        isNoteTitleColorfulForPreview() {
            if (this.isDiaryInputStyleSetToTodaysNotes) {
                return this.$store.state.layout.noteTitleRowIsColored;
            } else {
                return this.noteTitleRowIsColoredForDiary;
            }
        },
        borderColorLeftForPreview() {
            if (this.isDiaryInputStyleSetToTodaysNotes) {
                return this.$store.state.layout.borderColorLeft;
            } else {
                return this.borderColorLeftForDiary;
            }
        },
        borderColorRightForPreview() {
            if (this.isDiaryInputStyleSetToTodaysNotes) {
                return this.$store.state.layout.borderColorRight;
            } else {
                return this.borderColorRightForDiary;
            }
        },
        diaryBorderColorAlternative: {
            get() {
                return this.$store.state.layout.diaryBorderColorAlternative;
            },
            set(color) {
                this.$store.commit("layout/setDiaryBorderColorAlternative", color);
            }
        },
        isDiaryCountingDays: {
            get() {
                return this.$store.state.layout.isDiaryCountingDays;
            },
            set(bool) {
                this.$store.commit("layout/toggleIsDiaryCountingDays", bool);
            }
        },
        isDiarySubtitleStyleSetToAlternative: {
            get() {
                return this.$store.state.layout.isDiarySubtitleStyleSetToAlternative;
            },
            set(bool) {
                this.$store.commit("layout/setDiarySubtitleStyleToAlternative", bool);
            }
        },
        styleForDarkerContainer() {
            if (this.isDarkModeActive) {
                return { "background-color": "#202020" };
            } else {
                return { "background-color": "#e7e7e7" };
            }
        },
        isDarkModeActive() {
            return this.$store.getters['layout/isDarkModeActive'];
        },
        getTitleForDiary() {
            if (this.diaryMode === 'retro') {
                return "Retro";
            }
            else if (this.diaryMode === 'border') {
                return "Border";
            } else {
                return "Transparent";
            }
        },
        noteTitleRowIsColoredForDiary: {
            get() {
                return this.$store.state.layout.noteTitleRowIsColoredForDiary;
            },
            set(color) {
                this.$store.commit("layout/setNoteTitleRowIsColoredForDiary", color);
            },
        },
        diaryCardBackgroundColor: {
            get() {
                return this.$store.state.layout.diaryCardBackgroundColor;
            },
            set(color) {
                this.$store.commit("layout/setDiaryCardBackgroundColor", color);
            },
        },
        isDiaryInputStyleSetToTodaysNotes: {
            get() {
                return this.$store.state.layout.isDiaryInputStyleSetToTodaysNotes;
            },
            set(value) {
                this.$store.commit("layout/setDiaryInputStyleToTodaysNotes", value)
            },
        },
        isDiaryTitlebarShowingDay: {
            get() {
                return this.$store.state.layout.isDiaryTitlebarShowingDay;
            },
            set(bool) {
                this.$store.commit("layout/toggleIsDiaryTitleBarShowingDay", bool);
            }
        },
        diaryMode: {
            get() {
                return this.$store.state.layout.diaryMode;
            },
            set(mode) {
                let payload = { "page": "diary", "mode": mode };
                this.$store.dispatch("layout/changeMode", payload);
            }
        },
        diaryBackgroundColor: {
            get() {
                return this.$store.getters['layout/getDiaryBackgroundColor'];
            },
            set(value) {
                if (this.$store.getters['layout/isDarkModeActive']) {
                    this.$store.commit("layout/setDiaryBackgroundColorDark", value);
                } else {
                    this.$store.commit("layout/setDiaryBackgroundColor", value);
                }
            }
        },
        borderColorLeftForDiary: {
            get() {
                return this.$store.state.layout.borderColorLeftForDiary;
            },
            set(value) {
                this.$store.commit("layout/setBorderColorLeftForDiary", value);
            },
        },
        borderColorRightForDiary: {
            get() {
                return this.$store.state.layout.borderColorRightForDiary;
            },
            set(value) {
                this.$store.commit("layout/setBorderColorRightForDiary", value);
            },
        },
        diaryBorderColor: {
            get() {
                return this.$store.state.layout.diaryBorderColor;
            },
            set(value) {
                this.$store.commit("layout/setDiaryBorderColor", value);
            },
        },
        noteTextShadowColorForDiary: {
            get() {
                return this.$store.state.layout.noteTextShadowColorForDiary;
            },
            set(value) {
                this.$store.commit("layout/setNoteTextShadowColorForDiary", value);
            },
        },

    },
};
</script>

<style scoped>
.my-custom-toggle {
    border: 1px solid lightgrey;
    border-radius: 0px;
    border-style: solid;
}
</style>