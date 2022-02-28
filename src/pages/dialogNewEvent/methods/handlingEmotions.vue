<template>
  <baseExpansionItem
    :icon="icon"
    :name="name"
    :refName="refName"
    :maxWidthOfExpansionItems="maxWidthOfExpansionItems"
    @onShow="onShow"
  >
    <template v-slot:content>
      <div class="column">
        <div class="col">
          Accept that the problem is there and surrender fighting it. Pay
          attention to your body. Is there any tension?
          <strong style="color: white">Breathe in, breathe out.</strong>
          <div class="col">
            <strong style="font-style: bold">
              Is there something you can do about your problem?</strong
            >
          </div>
          <div class="col">
            <q-radio
              keep-color
              v-model="radioButtonIsBeyondControl"
              val="yes"
              label="yes"
              color="teal"
            />
            <q-radio
              keep-color
              v-model="radioButtonIsBeyondControl"
              val="no"
              label="no"
              color="orange"
            />
          </div>
          <div v-if="radioButtonIsBeyondControl === 'yes'">
            What are you going to do and when can you start?

            <q-input
              class="input"
              v-model="textWhatICanDo"
              autogrow
              filled
              label="
                                   What and when?"
              input-style="max-height: 150px; min-height: 20px;"
              :rules="[
                (val) =>
                  val.length <= 500 || 'Please use maximum 500 characters',
              ]"
            />
          </div>
          <div v-else>
            <q-separator />
            Even if you can't control a situation, you can control your response
            to it. Recognize that you are feeling anxiety. Remind yourself that
            worrying about something outside your control won't change the
            outcome. Challenge your self-talk. Focus your attention on the
            things which are in your power.
            <q-separator />
          </div>
        </div>

        <!-- 
        <div class="promptTitle">
          Imagine a friend is struggling with this problem. They ask for your
          advice.
        </div>

    
        <q-input
          class="input"
          v-model="textFriendAdvice"
          autogrow
          filled
          label="What would you tell
                              them?"
          input-style="max-height: 150px; min-height: 20px;"
          :rules="[
            (val) => val.length <= 500 || 'Please use maximum 500 characters',
          ]"
        />-->

        <div></div></div></template
  ></baseExpansionItem>
</template>


<script>
import baseExpansionItem from "../../../components/ui/baseExpansionItem.vue";

export default {
  components: { baseExpansionItem },
  data() {
    return {
      id: 1,
      icon: "spa",
      name: "Handling Emotions",
      refName: "handlingEmotions",
      maxWidthOfExpansionItems: { "max-width": "350px" },

      // user input gets loaded from here
      UserInputs: [{ id: 1, value: "false" }],

      textWhatICanDo: "",
      radioButtonIsBeyondControl: "yes",
      //toggleBoxShowFriendAdvicePrompt: "false",
      textFriendAdvice: "",
    };
  },

  methods: {
    onCreationMaybe() {
      //methods: [{id: 1, textFriendAdvice: "", buttonPressed: "", btnPressed: False}],
      let methodDataFromEvent = methods.find((method) => method.id === "1");
    },
    onShow() {
      this.$emit("onShow", this.refName);
    },
  },
};
</script>