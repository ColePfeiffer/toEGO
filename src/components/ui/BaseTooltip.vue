<template>
    <q-tooltip class="bg-secondary text-body2"
        :offset="[10, 10]"
        :style="getTextColor"
        :delay="delay">
        {{ text }}
    </q-tooltip>
</template>

<script>
export default {
    name: "BaseTooltip",
    props: {
        text: String,
        delay: {
            type: Number,
            default: 300,
        }
    },
    computed: {
        getTextColor() {
            let style = {};
            style["color"] = this.$store.getters['layout/getTextColorOnSecondary'];
            return style;
        }
    },
};
</script>
