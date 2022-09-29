<template>
    <div>
        <BaseItemClickable
            v-if="!isShowingTemplates"
            :item="template"
            :parent="parent"
            icon="bi-file-earmark"
            :currentTemplate="currentTemplate"
            @click-item="clickTemplate"
        ></BaseItemClickable>
        <BaseItem
            v-else
            :item="template"
            icon="bi-file-earmark"
            :textColorStyle="textColorStyle"
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
        parent: {
            type: Object,
            default: null,
        },
        currentTemplate: Object,
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
    