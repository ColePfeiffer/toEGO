<template>
  <BaseItem :item="item"
    :icon="icon"
    :textColorStyle="textColorStyle"
    @click-item="clickItem">
    <template v-slot:buttonSection>
      <q-item-section side>
        <q-btn dense
          round
          flat
          :color="getIconColor"
          :icon="getIcon"></q-btn>
      </q-item-section>
    </template>
  </BaseItem>
</template>

<script>
import BaseItem from './BaseItem.vue';
export default {
  name: "ItemClickable",
  emits: ["click-item"],
  components: { BaseItem },
  props: {
    item: Object,
    parent: {
      type: Object,
      default: null,
    },
    icon: String,
    currentTemplate: {
      type: Object,
      default: null,
    },
  },
  created() {
    // Sets the currentParent and currentChild data properties based on the parent and item props
    if (this.parent === null) {
      this.currentParent = this.item;
      this.currentChild = this.currentTemplate;
    } else {
      this.currentParent = this.parent;
      this.currentChild = this.item;
    }
  },
  data() {
    return {
      currentParent: this.parent,
      currentChild: this.item,
    };
  },
  methods: {
    clickItem() {
      let payload = {
        parent: this.currentParent,
        child: this.currentChild,
      };
      // Check if the currentChild is already in the currentParent's storedIDs array
      if (this.isItemInParent) {
        this.removeChildFromParent(payload);
      }
      else {
        this.addChildToParent(payload);
      }
    },
    addChildToParent(payload) {
      // Dispatches a Vuex action to add the child to the parent in Firebase
      this.$store.dispatch("templates/firebaseAddChildToParent", payload);
    },
    removeChildFromParent(payload) {
      // Dispatches a Vuex action to remove the child from the parent in Firebase
      this.$store.dispatch("templates/firebaseRemoveChildFromParent", payload);
    },
  },
  computed: {
    isItemInParent() {
      // Checks if the currentChild's ID is in the currentParent's storedIDs array
      if (this.currentParent.storedIDs != undefined) {
        if (this.currentParent.storedIDs.includes(this.currentChild.id)) {
          return true;
        }
      }
      return false;
    },
    textColorStyle() {
      // Set the text color based on whether the item is in the parent or not
      if (this.isItemInParent) {
        if (this.$store.getters["data/isDarkModeActive"]) {
          return { color: "white" };
        } else {
          return { color: "black" };
        }
      } else {
        return { color: "#d3d3d3 " };
      }
    },
    // Set the icon based on whether the item is in the parent or not
    getIcon() {
      if (this.isItemInParent) {
        return "bi-dash";
      }
      else {
        return "bi-plus";
      }
    },
    getIconColor() {
      if (this.isItemInParent) {
        return "orange";
      }
      else {
        return "teal";
      }
    },

  }
};
</script>
