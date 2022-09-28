<template>
    <BaseItem
        :item="item"
        :icon="icon"
        @click-item="clickItem"
        :textColorStyle="textColorStyle"
    >
        <template v-slot:buttonSection>
            <q-item-section side>
                <div class="row justify-end items-center q-px-lg">
                    <div class="col-1">
                        <q-btn
                            dense
                            round
                            flat
                            :icon="getIconForButtonSection"
                            color="secondary"
                            size="10.5px"
                            :ripple="false"
                        >
                        </q-btn>
                    </div>
                </div>
            </q-item-section>
        </template>
        >
    </BaseItem>
</template>

<script>
import { updateRadioButtonIsBeyondControl } from 'src/store/data/mutations';
import BaseItem from './baseItem.vue';
export default {
    name: "BaseItemExpandable",
    emits: ["click-item"],
    props: {
        item: Object,
        icon: String,
        currentTemplate: Object,
        isExpanded: Boolean // for setting the button in button section
    },
    components: { BaseItem },
    data() {
        return {
        };
    },
    methods: {
        clickItem() {
        },
    },
    computed: {
        textColorStyle() {
            // sets the text color
            if (this.isExpanded) {
                return {
                    color: "#d3d3d3 ", //lightgrey
                };
            } else {
                return {
                    color: "var(--q-primary)",
                };
            }
        },
        getIconForButtonSection() {
            if (this.isExpanded) {
                return "bi-chevron-up"
            } else {
                return "bi-chevron-down";
            }
        }
    },

};
</script>
    