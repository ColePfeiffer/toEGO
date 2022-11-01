<template>
    <div>
        <slot name="content">
            <slot name="content-in-scroll-area"></slot>
        </slot>
    </div>
</template>

<script>
export default {
    name: "DiaryBaseSection",
    emits: [],
}
</script>