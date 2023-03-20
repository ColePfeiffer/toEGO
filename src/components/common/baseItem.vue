<template>
  <q-item dense
    clickable
    @click="clickItem"
    color="white"
    style="padding-bottom: 0px"
    :style="textColorStyle">
    <!-- Category/Template Icon -->
    <q-item-section avatar
      class="q-pl-sm">
      <q-icon color="secondary"
        size="xs"
        :name="icon" />
    </q-item-section>
    <!-- Name of Category or Template -->
    <q-item-section>
      {{ itemName }}
    </q-item-section>
    <slot name="buttonSection"></slot>
  </q-item>
</template>

<script>
export default {
  name: "BaseItem",
  emits: ["click-item"],
  props: {
    item: Object, // category, folder or template
    icon: String,
    textColorStyle: Object,
  },
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
    // shortens item-name
    itemName() {
      if (this.item.name.length > 15) { // if item name is longer than 15 characters
        return this.item.name.substring(0, 15) + "..."; // shorten item name and add ellipsis
      } else {
        return this.item.name; // return full item name
      }
    },

  }
};
</script>

<style>
.baseItem {
  width: 250px !important;
}
</style>
