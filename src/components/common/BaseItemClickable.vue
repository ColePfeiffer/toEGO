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
    currentTemplate: {
      type: Object,
      default: null,
    },


  },
  created() {
    // FIXME: maybe use different thingie instead of created, dunno if right choice???
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
      if (this.isItemInParent) {
        this.removeChildFromParent(payload);
      }
      else {
        this.addChildToParent(payload);
      }
    },
    addChildToParent(payload) {
      this.$store.dispatch("templates/firebaseAddChildToParent", payload);
    },
    removeChildFromParent(payload) {
      this.$store.dispatch("templates/firebaseRemoveChildFromParent", payload);
    },
  },
  computed: {
    isItemInParent() {
      if (this.currentParent.storedIDs != undefined) {
        if (this.currentParent.storedIDs.includes(this.currentChild.id)) {
          return true;
        }
      }
      return false;
    },
    textColorStyle() {
      // sets the text color
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
