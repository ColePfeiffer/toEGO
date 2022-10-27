<template>
    <div class="q-px-md q-mt-xl q-pt-lg stepper-container"
        :style="getStepperStyle">
        <q-stepper v-model="computedStep"
            class="my-stepper"
            vertical
            ref="stepper"
            color="primary"
            done-color="secondary"
            active-color="black"
            inactive-color="grey-4"
            animated>
            <q-btn icon="bi-x"
                class="close-button-for-stepper absolute-top-right"
                size="11px"
                dense
                flat
                color="secondary"
                @click="finish">
            </q-btn>
            <slot name="steps">

            </slot>

            <div class="q-pa-md row justify-center items-center">
                <slot name="step-content">
                </slot>

                <div class="col-12">
                    <slot name="stepper-navigation">
                        <q-stepper-navigation>
                            <div class="row justify-end items-center">
                                <q-img class="col-3 q-mr-sm"
                                    :src="'/images/ghost-pink-hue.gif'"
                                    style="height: 50px; max-width: 50px; opacity: 0.5"
                                    spinner-color="white" />
                                <q-btn class="col-3 q-mr-sm"
                                    v-if="step != 1"
                                    flat
                                    @click="goStepBack"
                                    color="primary"
                                    label="Back" />
                                <div class="col-3 q-mr-sm"
                                    v-else>
                                </div>
                                <q-btn v-if="step != numberOfSteps"
                                    class="col-3 q-mr-sm"
                                    @click="goStepForward"
                                    color="primary"
                                    label="Next" />
                                <q-btn class="col-3 q-mr-sm"
                                    v-else
                                    @click="finish"
                                    color="primary"
                                    label="Finish" />
                            </div>
                        </q-stepper-navigation>
                    </slot>
                </div>
            </div>
        </q-stepper>
    </div>
</template>

<script>
export default {
    name: "BaseStepper",
    emits: ["go-step-forward", "go-step-backward", "finish"],
    props: {
        numberOfSteps: Number,
        step: Number
    },
    data() {
        return {
        }
    },
    methods: {
        goStepForward() {
            if (this.step != this.numberOfSteps) {
                this.$emit("go-step-forward");

            }
        },
        goStepBack() {
            if (this.step != 1) {
                this.$emit("go-step-backward");
            }
        },
        finish() {
            this.$emit("finish");
        }
    },
    computed: {
        getStepperStyle() {
            let style = {};
            let width = this.$store.state.layout.innerWidth;
            style["font-family"] = "Inter";
            style["min-height"] = "400px";
            style["width"] = width + "px";
            style["margin-left"] = -width / 2 + "px"
            return style;
        },
        computedStep: {
            get() {
                return this.step;
            },
            set() {
            }
        }
    }
};
</script>

<style lang="sass">
.my-stepper
  .q-stepper__nav
    padding-top: 0px
    padding-bottom: 5px

.my-stepper
  .q-stepper__step-inner
    padding: 0px
.stepper-container 
    position: absolute
    z-index: 1
    left: 50%



.close-button-for-stepper
    margin-top: 25px
    margin-right: 20px
    padding: 10px
    z-index: 1
    

</style>