<template>
    <div :style="maxWidth">
        <!-- Non-Empty-Folders -->
        <div>
            <FolderItem
                v-for="folder in getNonEmptyFolders"
                :key="folder"
                style="width: 250px"
                :isShowingTemplates="isShowingTemplates"
                :templateVariantIsSetToClickable="isShowingTemplates"
                :currentTemplate="currentTemplate"
                :folder="folder"
                :templates="templates"
                :categories="categories"
                @click-folder="clickFolder"
                @click-category="clickCategoryInsideFolder"
                @click-template="clickTemplateInsideCategoryInsideFolder"
            ></FolderItem>
        </div>
        <q-separator />
        <!-- Categories -->
        <div>
            <!-- Categories which aren't stored in Folders, but hold templates inside -->
            <div v-if="isShowingTemplates">
                <CategoryItem
                    v-for="category in getCategoriesWithoutFoldersButWithTemplates"
                    :key="category"
                    :currentTemplate="currentTemplate"
                    :isShowingTemplates="isShowingTemplates"
                    :templateVariantIsSetToClickable="isShowingTemplates"
                    :isShowingClickableVariant="!isShowingTemplates"
                    :category="category"
                    :templates="templates"
                    @click-category="clickCategory"
                    @click-template="clickTemplateInsideCategory"
                ></CategoryItem>
            </div>
            <!-- Categories which aren't stored in Folders -->
            <div v-else>
                <CategoryItem
                    v-for="category in getCategoriesWithoutFolders"
                    :key="category"
                    :currentTemplate="currentTemplate"
                    :isShowingTemplates="isShowingTemplates"
                    :templateVariantIsSetToClickable="isShowingTemplates"
                    :isShowingClickableVariant="!isShowingTemplates"
                    :category="category"
                    :templates="templates"
                    @click-category="clickCategory"
                    @click-template="clickTemplateInsideCategory"
                ></CategoryItem>
            </div>
        </div>

        <!-- templates which are not in categories -->
        <q-separator />
        <div v-if="isShowingTemplates">
            <TemplateItem
                v-for="template in getTemplatesWithoutCategories"
                :key="template"
                :currentTemplate="currentTemplate"
                :isShowingButtonSectionWithButtons="isShowingTemplates"
                :template="template"
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
        currentTemplate: Object,
        templateVariantIsSetToClickable: Boolean,
        isShowingClickableVariant: Boolean, // kann maybe weg???? later
        categories: Array,
        templates: Array,
        folders: Array,
    },
    data() {
        return {
            maxWidth: { width: "250px" }
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
  