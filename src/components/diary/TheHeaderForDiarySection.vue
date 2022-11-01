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
                <BaseButtonForDialogFooter v-if="isDiaryInEditMode"
                    buttonText="Discard"
                    style="font-size: 11px; border-radius: 0px; max-height: 25px;"
                    @click-button="goBack">
                </BaseButtonForDialogFooter>
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

                <BaseButtonForDialogFooter v-if="isDiaryInEditMode"
                    style="font-size: 11px; border-radius: 0px; max-height: 25px;"
                    buttonText="Save"
                    @click-button="saveChanges">
                </BaseButtonForDialogFooter>

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
import BaseButtonForDialogFooter from "../ui/BaseButtonForDialogFooter.vue";

export default {
    name: "TheHeaderForDiarySection",
    components: {
        DiaryBaseHeader,
        BaseTooltip,
        ButtonForDiarySection,
        BaseButtonForDialogFooter
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
            this.$emit("save-changes");
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
