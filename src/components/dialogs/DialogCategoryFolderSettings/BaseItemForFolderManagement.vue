<template>
  <q-item
    dense
    clickable
    @click="manageChildParentRelationship"
    :style="getTextColor"
  >
    <!-- Category/Template Icon -->
    <q-item-section avatar class="q-pl-sm">
      <q-icon color="secondary" size="xs" :name="icon" />
    </q-item-section>
    <!-- Name of Category or Template -->
    <q-item-section>
      {{ itemName }}
    </q-item-section>
    <!-- Button to add child to parent or to remove it -->
    <q-item-section side>
      <q-btn dense round flat :color="getIconColor" :icon="getIcon"> </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "BaseItemForFolderManagement",
  props: {
    item: Object, // can either be a category or a template
    icon: String,
    parent: Object,
  },
  data() {
    return {};
  },
  computed: {
    itemName() {
      if (this.item.name.length > 15) {
        return this.item.name.substring(0, 15) + "...";
      } else {
        return this.item.name;
      }
    },
    isItemInParent() {
      if (this.parent.storedIDs.includes(this.item.id)) {
        return true;
      } else {
        return false;
      }
    },
    getIcon() {
      if (this.isItemInParent) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getIconColor() {
      if (this.isItemInParent) {
        return "orange";
      } else {
        return "teal";
      }
    },
    getTextColor() {
      if (this.isItemInParent) {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ", //lightgrey
        };
      }
    },
  },
  methods: {
    addChildToParent(payload) {
      this.$store.commit("data/addChildToParent", payload);
    },
    removeChildFromParent(payload) {
      this.$store.commit("data/removeChildFromParent", payload);
    },
    manageChildParentRelationship() {
      let payload = {
        parent: this.parent,
        child: this.item,
      };
      if (this.isItemInParent) {
        this.removeChildFromParent(payload);
      } else {
        this.addChildToParent(payload);
      }
    },
  },
};
</script>
