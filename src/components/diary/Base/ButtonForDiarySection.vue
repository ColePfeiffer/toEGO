<template>
  <div class="col-auto text-right q-pl-lg">
    <q-btn padding="none"
      flat
      :color="textColor"
      :icon="icon"
      :label="getLabel(label)"
      @click="clickButton(label)"
      :style="style"
      size="10px">

    </q-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonForDiarySection",
  emits: ["click-button"],
  props: {
    textColor: String,
    icon: String,
    label: String,
    style: Object
  },
  data() {
    return {
    };
  },
  methods: {
    clickButton() {
      this.$emit("click-button", this.label);
    },
    getLabel(labelname) {
      if (this.$q.screen.lt.sm === true && this.$store.state.data.isShowingLabelsForDiarySection) {
        return labelname;
      } else {
        return "";
      }
    },
  },
};
</script>

<style >

</style>
