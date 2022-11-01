<template>
    <DiaryBaseSection>
        <template v-slot:content>
            <TheDiaryViewer :backgroundColor="backgroundColor"
                :diaryEntry="diaryEntry"
                :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
                :viewingMode="viewingMode"
                :isDiaryVisible="isDiaryVisible"
                :changeData="changeData"
                @create-diary-entry="createDiaryEntry"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode">
                <template v-slot:editor>
                    <BaseEditor editorTitle="Log"
                        :editorWidth="editorWidth"
                        ref="editorRef1"
                        class="no-border-radius no-box-shadow q-pa-none q-pt-xs"
                        v-model="editor"
                        @save="saveEditor"
                        @show-dialog-template-creator="showTemplateCreator"
                        @show-dialog-template-viewer="showTemplateViewer"
                        @paste-template-from-quicklist="pasteTemplateFromQuicklist"
                        minHeight="445px"
                        type="DIARY" />
                </template>
            </TheDiaryViewer>
        </template>
    </DiaryBaseSection>
</template>

<script>
import DiaryBaseSection from "./Base/DiaryBaseSection.vue";
import TheDiaryViewer from "./TheDiaryViewer.vue";
import BaseEditor from "../ui/BaseEditor.vue";
export default {
    name: "TheSectionForNotes",
    components: { DiaryBaseSection, TheDiaryViewer, BaseEditor },
    emits: ["save-editor", "set-change-data-editor", "go-to-event-set-to-creation-mode", "create-diary-entry"],
    data() {
        return {
        }
    },
    props: {
        diaryEntry: Object,
        viewingMode: String,
        backgroundColor: {
            type: String,
            default: "#f5f5f5",
        },
        changeData: Object,
        isCreatingNewDiaryEntry: Boolean,
    },
    computed: {
        editorWidth() {
            if (this.$store.state.layout.diaryMode != 'retro') {
                return this.$store.state.layout.innerWidth * 0.99;
            } else {
                return this.$store.state.layout.innerWidth * 0.88;
            }
        },
        isDiaryVisible() {
            if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
                return true;
            } else {
                return false;
            }
        },
        editor: {
            get() {
                return this.changeData.editor;
            },
            set(value) {
                this.$emit("set-change-data-editor", value);
            }
        },
    },
    methods: {
        saveEditor() {
            this.$emit("save-editor");
        },
        goToEventSetToCreationMode() {
            this.$emit("go-to-event-set-to-creation-mode");
        },
        showTemplateCreator() {
            this.$store.commit("data/setEditorText", this.changeData.editor);
            let payload = {
                isVisible: true,
                isBackgroundVisible: true,
                nameOfCurrentDialog: "template-creator-for-diary",
            };
            this.$store.commit("data/setDialogVisibility", payload);
        },
        showTemplateViewer() {
            let payload = {
                isVisible: true,
                isBackgroundVisible: true,
                nameOfCurrentDialog: "template-viewer-for-diary",
            };
            this.$store.commit("data/setDialogVisibility", payload);
        },
        pasteTemplateFromQuicklist(template) {
            if (this.changeData.editor != "") {
                this.$emit("set-change-data-editor", this.changeData.editor + "<br>" + template.text);
            } else {
                this.$emit("set-change-data-editor", template.text);
            }
        },
        createDiaryEntry() {
            this.$emit("create-diary-entry");
        },
    }
}
</script>