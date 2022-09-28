<template>
    <div>
        <BaseItemClickable
            v-if="!isShowingTemplates"
            :item="category"
            :parent="parent"
            :currentTemplate="currentTemplate"
            icon="bi-collection"
            @click-item="clickCategory"
        ></BaseItemClickable>

        <BaseItemExpandable
            v-else
            :item="category"
            :currentTemplate="currentTemplate"
            icon="bi-collection"
            :isExpanded="menuModel"
            @click-item="clickCategory"
        >

        </BaseItemExpandable>
        <!-- Submenu -->
        <BaseMenu
            v-if="isShowingTemplates"
            :menuModel="menuModel"
            :items="$store.getters['data/getTemplatesFromCategory'](
              category,
              templates
            )"
            @changed-menu-state="changedMenuState"
        >
            <template v-slot:itemsInsideList>
                <!-- Templates inside Category -->
                <TemplateItem
                    v-for="template in $store.getters['data/getTemplatesFromCategory'](
                      category,
                      templates
                    )"
                    :key="template"
                    v-close-popup="2"
                    :currentTemplate="currentTemplate"
                    :buttonSectionState="templateVariantIsSetToClickable"
                    :template="template"
                    :parent="category"
                    @click-template="clickTemplate"
                >
                </TemplateItem>
            </template>
        </BaseMenu>
    </div>

</template>

<script>
import BaseItemClickable from 'src/components/ui/BaseItemClickable.vue';
import BaseItemExpandable from 'src/components/ui/BaseItemExpandable.vue';
import BaseMenu from './BaseMenu.vue';
import TemplateItem from './TemplateItem.vue';

export default {
    name: "CategoryItem",
    emits: ["click-category", "click-template"],
    components: { BaseItemClickable, BaseItemExpandable, BaseMenu, TemplateItem },
    props: {
        // TODO: I only need one of these probably
        isShowingTemplates: {
            type: Boolean,
            default: false,
        },
        isShowingClickableVariant: Boolean,
        category: Object,
        // shows a different section depending on the use case
        templateVariantIsSetToClickable: Boolean,
        parent: {
            type: Object,
            default: null,
        },
        templates: Array, // add default
        currentTemplate: Object,

    },
    data() {
        return {
            menuModel: false,

        };
    },
    methods: {
        clickCategory() {
            this.$emit("click-category", this.category);
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
    