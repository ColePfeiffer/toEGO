<template>
  <BaseItem :item="item"
    :icon="icon"
    @click-item="clickItem"
    :textColorStyle="textColorStyle">
    <!-- Define a named slot to add a button to the item -->
    <template v-slot:buttonSection>
      <q-item-section side>
        <div class="row justify-end items-center q-px-lg">
          <div class="col-1">
            <!-- Add a button to expand or collapse the item -->
            <q-btn dense
              round
              flat
              :icon="iconForButtonSection"
              color="secondary"
              size="10.5px"
              :ripple="false">
            </q-btn>
          </div>
        </div>
      </q-item-section>
    </template>
  </BaseItem>
</template>

<script>
import BaseItem from './BaseItem.vue';
export default {
  name: "BaseItemExpandable",
  emits: ["click-item"],
  props: {
    item: Object, // The item to display
    icon: String, // The icon to display
    currentTemplate: Object,
    isExpanded: Boolean // Whether the item is expanded or not
  },
  components: { BaseItem },
  data() {
    return {
    };
  },
  methods: {
    clickItem() {
      this.$emit("click-item", this.item);
    },
  },
  computed: {
    textColorStyle() {
      // Calculate the text color style based on whether the item is expanded and the current mode
      if (this.isExpanded) {
        return { color: "#d3d3d3 " };
      } else {
        if (this.$store.getters["data/isDarkModeActive"]) {
          return { color: "white" };
        } else {
          return { color: "black" };
        }
      }
    },
    iconForButtonSection() {
      // returns the icon for the button based on whether the item is expanded
      if (this.isExpanded) {
        return "bi-chevron-up"
      } else {
        return "bi-chevron-down";
      }
    }
  },

};
</script>
