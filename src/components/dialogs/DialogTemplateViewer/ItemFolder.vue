<template>
    <div>
        <BaseItemExpandable :item="folder"
            icon="bi-folder"
            :isExpanded="menuModel"
            :currentTemplate="currentTemplate"
            @click-item="clickFolder">
        </BaseItemExpandable>
        <!-- Submenu -->
        <BaseMenu :menuModel="menuModel"
            :items="$store.getters['templates/getFolderContent'](
                folder,
                categories
            )"
            @changed-menu-state="changedMenuState">
            <template v-slot:itemsInsideList>
                <!-- Templates inside Category -->
                <!-- TODO: -->
                <!-- TODO: ADD PROPS -->
                <CategoryItem v-for="category in $store.getters['templates/getFolderContent'](
                    folder,
                    categories
                )"
                    :key="category"
                    clickable
                    :isShowingTemplates="isShowingTemplates"
                    :category="category"
                    :parent="folder"
                    :currentTemplate="currentTemplate"
                    :templates="templates"
                    @click-category="clickCategory"
                    @click-template="clickTemplate">
                </CategoryItem>
            </template>
        </BaseMenu>
    </div>

</template>

<script>
import BaseItemExpandable from 'src/components/common/BaseItemExpandable.vue';
import BaseMenu from './Base/BaseMenu.vue';
import CategoryItem from './ItemCategory.vue';
export default {
    name: "FolderItem",
    emits: ["click-folder", "click-category", "click-template"],
    components: { BaseItemExpandable, BaseMenu, CategoryItem },
    props: {
        // TODO: I only need one of these probably
        isShowingTemplates: Boolean,
        folder: Object,
        categories: Array,
        templates: Array,
        currentTemplate: Object,
    },
    data() {
        return {
            menuModel: false,
        };
    },
    methods: {
        clickFolder() {
            this.$emit("click-folder", this.folder);
        },
        clickCategory(category) {
            this.$emit("click-category", category);
        },
        clickTemplate(template) {
            this.$emit("click-template", template);

        },
        changedMenuState(newValue) {
            this.menuModel = newValue;
        }
    },
    computed: {
    },
};
</script>
    