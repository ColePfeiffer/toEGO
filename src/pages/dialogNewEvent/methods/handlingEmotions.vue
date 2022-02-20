<template>
  <baseMethod
    :icon="icon"
    :name="name"
    :refName="refName"
    :maxWidthOfExpansionItems="maxWidthOfExpansionItems"
    @onShow="onShow"
  >
    <template v-slot:content>
      <div>
        Accept that the problem is there and surrender fighting it. Pay
        attention to your body. Is there any tension?

        <strong style="color: white">Breathe in, breathe out.</strong>

        <br />
        <q-separator />
        <br />

        <div class="promptTitle">
          Imagine a friend is struggling with this problem. They ask for your
          advice.
        </div>

        <q-input
          class="input"
          v-model="friendAdvice"
          autogrow
          filled
          label="What would you tell
                              them?"
          input-style="max-height: 150px; min-height: 20px;"
          :rules="[
            (val) => val.length <= 500 || 'Please use maximum 500 characters',
          ]"
        />

        <div class="promptTitle">
          Is there something you can do about your problem?
        </div>

        <q-radio
          keep-color
          v-model="problemIsBeyondOwnControl"
          val="yes"
          label="yes"
          color="teal"
        />
        <q-radio
          keep-color
          v-model="problemIsBeyondOwnControl"
          val="no"
          label="no"
          color="orange"
        />
        <div v-if="problemIsBeyondOwnControl === 'yes'">
          What are you going to do and when can you start?

          <q-input
            class="input"
            v-model="friendAdvice"
            autogrow
            filled
            label="
                                   What and when?"
            input-style="max-height: 150px; min-height: 20px;"
            :rules="[
              (val) => val.length <= 500 || 'Please use maximum 500 characters',
            ]"
          />
        </div>
        <div v-else>
          <q-separator />
          Even if you can't control a situation, you can control your response
          to it. Recognize that you are feeling anxiety. Remind yourself that
          worrying about something outside your control won't change the
          outcome. Challenge your self-talk. Focus your attention on the things
          which are in your power.
          <q-separator />
        </div></div></template
  ></baseMethod>
</template>


<script>
import baseMethod from "./baseMethod.vue";

export default {
  components: { baseMethod },
  data() {
    return {
      id: 1,
      icon: "spa",
      name: "Handling Emotions",
      refName: "handlingEmotions",
      maxWidthOfExpansionItems: { "max-width": "350px" },

      // user input gets loaded from here
      UserInputs: [{ id: 1, value: "false" }],

      problemIsBeyondOwnControl: "yes",
      showFriendAdvicePrompt: "false",
      friendAdvice: "",
    };
  },

  methods: {
    onShow() {
      this.$emit("onShow", this.refName);
    },
  },
};
</script>