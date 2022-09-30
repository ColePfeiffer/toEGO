<template>
    <div class="q-pt-md">
        <div class="row justify-center items-center no-wrap">
            <div class="col-8 smallText text-left text-white"
                :style="$store.state.data.headlineStyle">
                <slot name="nameOfTitle">
                </slot>
            </div>
            <div class="col-4">
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderForDiarySections",
    props: {
    },
    data() {
        return {
        };
    },
    methods: {

    },
};
</script>
    