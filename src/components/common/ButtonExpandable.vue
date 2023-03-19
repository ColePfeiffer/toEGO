<template>
  <q-btn flat
    dense
    size="12px"
    :icon="getIcon"
    color="accent"
    @click="expand"></q-btn>
</template>

<script>
export default {
  name: "BaseExpandableButton",
  emits: ["expand"],
  props: { isNoteExpanded: Boolean },
  data() {
    return {
    };
  },
  computed: {
    getIcon() {
      if (this.isNoteExpanded) {
        return "bi-chevron-up";
      } else {
        return "bi-chevron-down";
      }
    }
  },
  methods: {
    expand() {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$emit("expand");
    },
  },
};
</script>
