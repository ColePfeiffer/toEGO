<template>
  <q-btn flat
    dense
    :icon="getIcon"
    color="accent"
    @click="expand"></q-btn>
</template>

<script>
export default {
  name: "BaseExpandableButton",
  emits: ["expand"],
  props: { isEventExpanded: Boolean },
  data() {
    return {
      expandIcon: "bi-chevron-down",
    };
  },
  computed: {
    getIcon() {
      if (this.isEventExpanded) {
        return "bi-chevron-up";
      } else {
        return "bi-chevron-down";
      }
    }
  },
  methods: {
    expand() {
      this.$emit("expand");
    },
  },
};
</script>
