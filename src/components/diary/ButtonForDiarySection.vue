<template>
    <q-btn class="col-2"
        flat
        dense
        :color="textColor"
        :icon="icon"
        :label="getLabel(label)"
        @click="clickLeftButton(label)"
        :style="style"
        size="10px">
    </q-btn>

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
            console.log("q-screen: ", this.$q.screen.lt.sm);
            if (this.$q.screen.lt.sm === true && this.$store.state.data.isShowingLabelsForDiarySection) {
                return labelname;
            } else {
                return "";
            }
        },
    },
};
</script>
    