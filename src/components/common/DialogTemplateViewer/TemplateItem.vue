<template>
    <div>
        <BaseItemClickable
            v-if="isShowingButtonSectionWithButtons"
            :currentTemplate="currentTemplate"
            :isShowingTemplates="isShowingTemplates"
            :item="template"
            :parent="parent"
            icon="bi-file-earmark"
            @click-item="clickTemplate"
        ></BaseItemClickable>
        <BaseItem
            v-else
            :isShowingTemplates="isShowingTemplates"
            :item="template"
            :parent="parent"
            :textColorStyle="textColorStyle"
            icon="bi-file-earmark"
            @click-item="clickTemplate"
        >
            <template v-slot:buttonSection>
                <q-item-section side>
                    <div></div>
                </q-item-section>
            </template>
        </BaseItem>
    </div>

</template>

<script>
import BaseItemClickable from 'src/components/ui/BaseItemClickable.vue';
import BaseItem from 'src/components/ui/baseItem.vue';
export default {
    name: "TemplateItem",
    emits: ["click-template"],
    components: { BaseItemClickable, BaseItem },
    props: {
        isShowingTemplates: Boolean,
        template: Object,
        parent: Object,
        icon: String,
        currentTemplate: Object,
        isShowingButtonSectionWithButtons: Boolean,
    },
    data() {
        return {
            textColorStyle: {
                "color": "var(--q-primary)"
            }
        };
    },
    methods: {
        clickTemplate() {
            this.$emit("click-template", this.template);
        },
    },
    computed: {

    },
};
</script>
    