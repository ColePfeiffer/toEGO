<template>
  <baseMethod
    :icon="icon"
    :name="name"
    :refName="refName"
    :maxWidthOfExpansionItems="maxWidthOfExpansionItems"
    @onShow="onShow"
  >
    <template v-slot:content>
      <ul style="text-align: left">
        <li>
          Name
          <strong style="color: purple">five</strong> things you can see.
        </li>
        <li>
          Name
          <strong style="color: purple">four</strong> things you can touch.
        </li>
        <li>
          Name
          <strong style="color: purple">three</strong>
          things you can hear.
        </li>
        <li>
          Name
          <strong style="color: purple">two</strong> things you can smell.
        </li>
        <li>
          Name
          <strong style="color: purple">one</strong> thing you can taste.
        </li>
      </ul>
      <q-btn>yesss</q-btn>
    </template></baseMethod
  >
</template>


<script>
import baseMethod from "./baseMethod.vue";

export default {
  components: { baseMethod },
  data() {
    return {
      id: 0,
      icon: "task_alt",
      name: "5-to-1 Methode",
      refName: "oneToFiveMethode",
      maxWidthOfExpansionItems: { "max-width": "350px" },

      // user input gets loaded from here
      UserInputs: [],
    };
  },
  methods: {
    onShow() {
      this.$emit("onShow", this.refName);
    },
  },
};
</script>