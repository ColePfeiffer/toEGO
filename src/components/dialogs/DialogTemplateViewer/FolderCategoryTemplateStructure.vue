<template>
    <div>
        <!-- Non-Empty-Folders -->
        <div>
            <FolderItem
                v-for="folder in getNonEmptyFolders"
                :key="folder"
                :isShowingTemplates="isShowingTemplates"
                :folder="folder"
                :categories="categories"
                :templates="templates"
                :currentTemplate="currentTemplate"
                @click-folder="clickFolder"
                @click-category="clickCategoryInsideFolder"
                @click-template="clickTemplateInsideCategoryInsideFolder"
            ></FolderItem>
        </div>
        <q-separator />
        <!-- Categories -->
        <div>
            <!-- Categories which aren't stored in Folders -->
            <CategoryItem
                v-for="category in displayedCategories"
                :key="category"
                :categoryMode="categoryMode"
                :isShowingTemplates="isShowingTemplates"
                :category="category"
                :currentTemplate="currentTemplate"
                :templates="templates"
                @click-category="clickCategory"
                @click-template="clickTemplateInsideCategory"
            ></CategoryItem>
        </div>

        <!-- templates which are not in categories -->
        <q-separator />
        <div v-if="isShowingTemplates">
            <TemplateItem
                v-for="template in getTemplatesWithoutCategories"
                :key="template"
                :isShowingTemplates="isShowingTemplates"
                :template="template"
                :currentTemplate="currentTemplate"
                @click-template="clickTemplate"
            ></TemplateItem>
        </div>

    </div>
</template>
  
<script>
import FolderItem from './FolderItem.vue';
import CategoryItem from './CategoryItem.vue';
import TemplateItem from './TemplateItem.vue';

export default {
    name: "FolderCategoryTemplateStructure",
    components: { FolderItem, CategoryItem, TemplateItem },
    emits: ["click-folder", "click-category", "click-template"],
    props: {
        isShowingTemplates: {
            type: Boolean,
            default: false,
        },
        categoryMode: String,
        currentTemplate: Object,
        categories: Array,
        templates: Array,
        folders: Array,
    },
    data() {
        return {
        };
    },
    methods: {

        clickFolder(folder) {
            this.$emit("click-folder", folder);
        },
        clickCategoryInsideFolder() {

        },
        clickTemplateInsideCategoryInsideFolder(template) {
            this.clickTemplate(template);
        },
        clickCategory(category) {
            this.$emit("click-category", category);
        },
        clickTemplateInsideCategory() {

        },
        clickTemplate(template) {
            console.log("template ", template.name, " was clicked.");
            this.$emit("click-template", template);
        },
    },
    computed: {
        displayedCategories() {
            if (this.isShowingTemplates) {
                return this.getCategoriesWithoutFoldersButWithTemplates
            } else {
                return this.getCategoriesWithoutFolders;
            }
        },
        getCategoriesWithoutFolders() {
            return this.$store.getters["data/getCategoriesWithoutFolders"]({
                folders: this.folders,
                categories: this.categories,
            });
        },
        getNonEmptyFolders() {
            return this.$store.getters["data/getNonEmptyFolders"](
                this.folders,
                this.categories
            );
        },
        // only returns category-items that are not stored in any folder and hold at least one template-item
        getCategoriesWithoutFoldersButWithTemplates() {
            return this.getCategoriesWithoutFolders.filter((category) => {
                category.storedIDs.length > 0;
            });
        },
        getTemplatesWithoutCategories() {
            return this.$store.getters["data/getTemplatesWithoutCategories"]({
                templates: this.templates,
                categories: this.categories,
            });
        },
    }
};
</script>
  