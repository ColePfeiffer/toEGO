<template>
    <BasePreview :layoutMode="layoutMode"
        :heightForContentMultiplier="0.2"
        titleOfPage="Note Creator"
        :backgroundColor="backgroundColor">
        <template v-slot:content>
            <div class="row justify-center items-center text-center  q-px-lg">
                <q-resize-observer @resize="onResize" />
                <NoteSectionHowAreYouFeeling :mood="mood"
                    @set-mood="setMood"></NoteSectionHowAreYouFeeling>
                <NoteSectionInputTitle class="col-10 "
                    :autofocus="false"
                    :title="title"
                    :width="widthForPreviewInputFields"
                    :layoutMode="layoutMode"
                    @set-title="setTitle"></NoteSectionInputTitle>
                <NoteSectionInputEditor class="col-10 "
                    :isPreview="true"
                    :minHeightMultiplicator="0.03"
                    :editor="editor"
                    :width="widthForPreviewInputFields"
                    :layoutMode="layoutMode"
                    @set-editor="setEditor"></NoteSectionInputEditor>
            </div>
        </template>

    </BasePreview>
</template>

<script>
import BasePreview from "../Base/BasePreview.vue";
import NoteSectionHowAreYouFeeling from "../../NoteCreator/NoteSectionHowAreYouFeeling.vue";
import NoteSectionInputTitle from "../../NoteCreator/NoteSectionInputTitle.vue";
import NoteSectionInputEditor from "../../NoteCreator/NoteSectionInputEditor.vue";

export default {
    name: "ThePreviewForNewNote",
    components: { BasePreview, NoteSectionHowAreYouFeeling, NoteSectionInputTitle, NoteSectionInputEditor },
    props: {
        layoutMode: String,
        backgroundColor: String,
    },
    data() {
        return {
            editor: "This is a preview.",
            title: "",
            mood: "",
            newNoteContainerWidth: 200,
        };
    },
    methods: {
        onResize(size) {
            this.newNoteContainerWidth = size.width;
        },
        setEditor(value) {
            this.editor = value;
        },
        setTitle(value) {
            this.title = value;
        },
        setMood(value) {
            this.mood = value;
        },
    },
    computed: {
        widthForPreviewInputFields() {
            return this.newNoteContainerWidth * 0.72;
        },
    },
};
</script>