<template>
  <q-btn flat :icon="eventViewerIcon" color="accent" @click="expand"></q-btn>
</template>

<script>
export default {
  name: "BaseExpandableButton",
  emits: ["expandLess", "expandMore"],
  props: {
    eventData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      eventViewerIcon: "expand_more",
    };
  },
  methods: {
    expand() {
      if (this.eventViewerIcon === "expand_more") {
        // if not expanded yet
        this.eventViewerIcon = "expand_less";
        this.$emit("expandMore");
        // if already expanded
      } else {
        this.eventViewerIcon = "expand_more";
        this.$emit("expandLess");
      }
    },
  },
};
</script>
