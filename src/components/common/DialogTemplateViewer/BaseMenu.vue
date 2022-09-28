<template>
    <!-- Submenu -->
    <q-menu
        dense
        separate-close-popup
        class="no-border-radius"
        v-model="qMenuModel"
    >
        <q-list dense>
            <slot name="itemsInsideList"></slot>
        </q-list>
    </q-menu>
</template>
  
<script>

export default {
    name: "BaseMenu",
    emits: ["click-item-in-menu", "changed-menu-state"],
    components: {},
    props: {
        items: Array,
        menuModel: Boolean,
    },
    data() {
        return {
            qMenuModel: this.menuModel,
        };
    },
    watch: {
        qMenuModel(newValue) {
            this.$emit("changed-menu-state", newValue);
        },
    },
};
</script>
  