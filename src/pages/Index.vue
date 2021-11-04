<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$q.dark.isActive); // true, false
    this.$q.dark.set(true);
    console.log(this.$q.dark.isActive); // true, false
  },
};
</script>

<style>
</style>
