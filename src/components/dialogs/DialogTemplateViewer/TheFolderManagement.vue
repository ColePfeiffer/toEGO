<template>
    <div class="row items-center justify-center q-pt-md q-px-md">
        <div class="col-10 col-xs-12 col-sm-12 col-lg-9">
            <q-list bordered
                :style="styleForFolderManagerContainer"
                padding>
                <TheFolderSection :type="type"
                    :itemsToDisplay="folders"></TheFolderSection>
                <q-separator spaced />
                <TheCategorySection :type="type"
                    :itemsToDisplay="categories"
                    @delete-category="deleteCategory"></TheCategorySection>
            </q-list>
        </div>
    </div>
</template>
  
<script>
import TheFolderSection from "./TheFolderSection.vue";
import TheCategorySection from "./TheCategorySection.vue";

export default {
    name: "TheFolderManagement",
    emits: [],
    components: {
        TheFolderSection,
        TheCategorySection
    },
    props: {
        type: String,
    },
    data() {
        return {
        };
    },
    methods: {
        deleteCategory(categoryToDelete) {
            let payload = {
                parents: this.folders,
                child: categoryToDelete,
            };
            this.$store.dispatch(
                "templates/firebaseDeleteCategory",
                payload
            );
        },
    },
    computed: {
        folders() {
            return this.$store.getters["templates/getFoldersByType"](this.type);
        },
        categories() {
            return this.$store.getters["templates/getCategoriesByType"](this.type);
        },
        styleForFolderManagerContainer() {
            let style = {};
            style['max-height'] = this.$store.state.layout.height * 0.75 + "px";
            style["padding-bottom"] = "12px";
            style['font-family'] = this.$store.state.layout.nonDefaultFont;
            if (this.$store.getters["layout/isDarkModeActive"]) {
                style["background-color"] = "var(--q-dark)";
            } else {
                style["background-color"] = "white";
            }
            return style;
        },
    }
};
</script>
  