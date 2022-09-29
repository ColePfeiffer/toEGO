<template>
  <q-item
    dense
    clickable
    @click="clickItem"
    :style="textColorStyle"
  >
    <!-- Category/Template Icon -->
    <q-item-section
      avatar
      class="q-pl-sm"
    >
      <q-icon
        color="secondary"
        size="xs"
        :name="icon"
      />
    </q-item-section>
    <!-- Name of Category or Template -->
    <q-item-section>
      {{ itemName }}
    </q-item-section>
    <!-- Button to add child to parent or to remove it -->
    <!-- TODO: check if this works 100%? -->
    <slot name="buttonSection">

    </slot>
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
      if (this.item.name.length > 15) {
        return this.item.name.substring(0, 15) + "...";
      } else {
        return this.item.name;
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