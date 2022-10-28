<template>
  <q-resize-observer @resize="onResize" />
  <router-view />

</template>

<script>

export default {
  name: "App",
  methods: {
    onResize(size) {
      console.log(size.height, size.width);
      this.$store.commit("layout/setSize", size);
    },
  }
};
</script>

<style>
.text-whitesmoke {
  color: whitesmoke !important;
}

.bg-whitesmoke {
  background: whitesmoke !important;
}

.text-lightgrey {
  color: #d3d3d3 !important;
}

.bg-lightgrey {
  background: #d3d3d3 !important;
}

.text-darkgrey {
  color: #989898 !important;
}

.bg-darkgrey {
  background: #989898 !important;
}

.text-accent2 {
  color: #14157a !important;
}

.bg-accent2 {
  background: #14157a !important;
}

.text-reallydarkgrey {
  color: #4c4c4c !important;
}
</style>
