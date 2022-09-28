<template>
    <BaseItem
        :item="item"
        :icon="icon"
        :textColorStyle="textColorStyle"
        @click-item="clickItem"
    >
        <template v-slot:buttonSection>
            <q-item-section side>
                <q-btn
                    dense
                    round
                    flat
                    :color="getIconColor"
                    :icon="getIcon"
                ></q-btn>
            </q-item-section>
        </template>
        >
    </BaseItem>
</template>

<script>
import BaseItem from './baseItem.vue';
export default {
    name: "BaseItemClickable",
    emits: ["click-item"],
    components: { BaseItem },
    props: {
        item: Object,
        parent: {
            type: Object,
            default: null,
        },
        icon: String,
        currentTemplate: Object,
    },
    data() {
        return {};
    },
    methods: {
        clickItem() {
            if (this.parent === null) {
                console.log("bleh")
            } else {
                console.log("okidoki")
                this.manageChildParentRelationship();
            }
        },
        manageChildParentRelationship() {
            let payload = {
                parent: this.parent,
                child: this.item,
            };
            if (this.isItemInParent) {
                this.removeChildFromParent(payload);
            }
            else {
                this.addChildToParent(payload);
            }
        },
        addChildToParent(payload) {
            this.$store.commit("data/addChildToParent", payload);
        },
        removeChildFromParent(payload) {
            this.$store.commit("data/removeChildFromParent", payload);
        },
    },
    computed: {
        isUsingParent() {
            console.log("item name: ", this.item.name, this.parent)
            if (this.parent === null) {
                return false;
            } else {
                console.log("parent name: ", this.parent.name)
                return true;
            }
        },
        getFunction() {
            if (this.isUsingParent) {
                return this.isItemInParent;
            } else {
                return this.isCurrentTemplateInParent;
            }
        },
        isItemInParent() {
            if (this.parent.storedIDs.includes(this.item.id)) {
                return true;
            }
            else {
                return false;
            }
        },
        isCurrentTemplateInParent() {
            console.log("item??", this.item.name, this.item.storedIDs)
            console.log("current template: ", this.currentTemplate)
            if (this.item.storedIDs.includes(this.currentTemplate.id)) {
                return true;
            } else {
                return false;
            }
        },
        textColorStyle() {
            // sets the text color
            if (this.getFunction) {
                return {
                    color: "var(--q-primary)",
                };
            } else {
                return {
                    color: "#d3d3d3 ", //lightgrey
                };
            }
        },

        getIcon() {
            if (this.getFunction) {
                return "bi-dash";
            }
            else {
                return "bi-plus";
            }
        },
        getIconColor() {
            if (this.getFunction) {
                return "orange";
            }
            else {
                return "teal";
            }
        },

    }
};
</script>
    