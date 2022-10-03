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
      expandIcon: "expand_more",
    };
  },
  computed: {
    getIcon() {
      if (this.isEventExpanded) {
        return "expand_less";
      } else {
        return "expand_more";
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
