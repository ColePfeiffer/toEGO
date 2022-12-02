<template>
    <div class="q-px-md q-pb-md"
        style="position: absolute;
  left: 0;
  right: 0;
  padding-left: 10px;
  padding-right: 10px;
  bottom: 2px;
  font-family: PixeloidSans;
  font-size: 12px;
  margin: 0 auto; max-width: 400px; z-index: 100">
        <q-chat-message :bg-color="backgroundColor"
            :text-color="textColor"
            s
            :text="getMessages">
            <template v-slot:avatar>
                <q-avatar square
                    class="q-mr-sm q-mt-sm q-pt-sm">
                    <img src="/images/ghost-pink-hue.gif">
                </q-avatar>
            </template>
            <template v-slot:stamp
                v-if="ghostIsTyping"><q-spinner-dots size="2em" /></template>
        </q-chat-message>
        <div style="font-weight:600; text-shadow: 2px 2px 1px var(--q-info);"
            class="text-white q-ml-xs text-left">
            Friendly Ghost
        </div>
        <div class="row justify-end items-center"
            style="font-family: PixeloidSans; font-size: 11.5px">
            <q-btn v-if="(messageIndex > 1)"
                class="col-3"
                @click="goBack"
                flat
                label="Back" />
            <q-btn v-if="(messageIndex != numberOfMessages)"
                class="col-3 q-ml-sm"
                @click="showNextMessage"
                color="primary"
                label="Next" />
            <q-btn class="col-3 q-ml-sm"
                v-else
                @click="finish"
                color="primary"
                label="Finish" />
        </div>

    </div>
</template>


<script>
export default {
    name: "BaseGhostHelper",
    emits: ['finish', "show-next", "show-last"],
    props: {
        numberOfMessages: Number,
        messages: Array,
        backgroundColor: {
            default: "whitesmoke",
            type: String
        },
        textColor: {
            default: "black",
            type: String
        }
    },
    data() {
        return {
            messageIndex: 0,
            ghostIsTyping: true,
        };
    },
    methods: {
        showNextMessage() {
            this.messageIndex = this.messageIndex + 1;
            this.$emit("show-next", this.messageIndex);
            if (this.messageIndex === this.numberOfMessages) {
                this.ghostIsTyping = false;
            }
        },
        finish() {
            this.$emit("finish");
        },
        reset() {
            this.messageIndex = 0;
            this.ghostIsTyping = true;
        },
        goBack() {
            this.messageIndex = this.messageIndex - 1;
            this.$emit("show-last");
        }
    },
    computed: {
        getMessages() {
            return this.messages;
        },
    }
};
</script>

