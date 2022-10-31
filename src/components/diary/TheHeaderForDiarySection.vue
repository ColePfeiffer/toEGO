<template>
    <DiaryBaseHeader>
        <template v-slot:nameOfTitle
            v-if="isDiaryVisible">
            DIARY
        </template>
        <template v-slot:buttons>
            <!-- Buttons: Left -->
            <div v-if="isDiaryVisible"
                class="col-auto">
                <ButtonForDiarySection v-if="isDiaryInEditMode"
                    textColor="white"
                    icon="bi-chevron-left"
                    label="back"
                    :isShowingLabel="true"
                    :style="$store.getters['layout/getStyleForDiarySectionButton']"
                    @click-button="goBack">
                </ButtonForDiarySection>
                <!-- Button: Enter Fullscreen Button -->
                <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
                    textColor="white"
                    icon="bi-fullscreen"
                    size="8.8px"
                    label=""
                    :style="$store.getters['layout/getStyleForDiarySectionButton']"
                    @click-button="openEntryInFullscreen">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Turn Viewing-Mode on"
                            :delay="
                            15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
            </div>
            <!-- Buttons: Right -->
            <div v-if="isDiaryVisible"
                class="col-auto">
                <!-- Button: Save changes to diaryentry -->
                <ButtonForDiarySection v-if="isDiaryInEditMode"
                    textColor="white"
                    icon="fas fa-save"
                    :isShowingLabel="true"
                    label="save"
                    :style="$store.getters['layout/getStyleForDiarySectionButton']"
                    @click-button="saveChanges">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Save"
                            :delay="15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
                <!-- Button: Edit diaryentry -->
                <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
                    textColor="white"
                    icon="bi-pencil-square"
                    class="q-mr-xs"
                    label="edit"
                    size="10px"
                    :style="$store.getters['layout/getStyleForDiarySectionButton']"
                    @click-button="editDiaryEntry">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Edit diary text"
                            :delay="15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
            </div>
        </template>
    </DiaryBaseHeader>
</template>
    
<script>
import DiaryBaseHeader from "./Base/DiaryBaseHeader.vue";
import BaseTooltip from "../ui/BaseTooltip.vue";
import ButtonForDiarySection from "./Base/ButtonForDiarySection.vue";

export default {
    name: "TheHeaderForDiarySection",
    components: {
        DiaryBaseHeader,
        BaseTooltip,
        ButtonForDiarySection,
    },
    emits: ["set-change-data", "change-view", "set-change-data-editor", "enter-fullscreen-mode", "create-diary-entry", "save-changes", "reset-change-data"],
    props: {
        diaryEntry: Object,
        viewingMode: String,
        changeData: Object,
        isCreatingNewDiaryEntry: Boolean,
    },
    data() {
        return {
        };
    },
    computed: {
        isDiaryVisible() {
            if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
                return true;
            } else {
                return false;
            }
        },
        isDiaryInEditMode() {
            if (this.viewingMode === "edit") {
                return true;
            } else {
                return false;
            }
        },
        areEditAndFullscreenButtonVisible() {
            if (this.viewingMode === "view" && this.editor != undefined && this.editor != "") {
                return true;
            } else {
                return false;
            }
        },
        editor() {
            if (this.diaryEntry === undefined) {
                return undefined;
            } else {
                return this.diaryEntry.editor;
            }
        },
    },
    methods: {
        changeView(newViewMode) {
            this.$emit("change-view", newViewMode);
        },
        setDiaryModeToEdit() {
            this.$emit("create-diary-entry");
        },
        resetChangeData() {
            this.$emit("reset-change-data");
        },
        goBack() {
            this.changeView('view');
            this.resetChangeData();
        },
        openEntryInFullscreen() {
            this.$emit("enter-fullscreen-mode", this.editor);
        },
        saveChanges() {
            this.$emit("change-view", "view");
            this.$emit("save-changes", this.changeData);
        },
        editDiaryEntry() {
            this.changeView("edit");
            this.$emit("set-change-data", {
                id: this.diaryEntry.id,
                date: this.diaryEntry.date,
                editor: this.diaryEntry.editor,
                events: this.diaryEntry.events,
            });
        },
    },

}
</script>
