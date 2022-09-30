<template>
  <q-card class="my-base-card shadow-3 text-justify">
    <q-card-section class="card-text text-center">
      <slot name="content">

      </slot>
    </q-card-section>
  </q-card>
</template>

<style>
.my-base-card {
  font-size: 12.5px;
}
</style>
