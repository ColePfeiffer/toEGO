<template>
  <q-card class="test my-base-card shadow-3 text-justify ">
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

.test {
  background: whitesmoke;
  border-width: 1.5px;
  border-color: #FFFFFF #6e6e6e #6e6e6e #FFFFFF;
  border-style: solid;
  border-radius: 0px;
}

.border {
  font-size: 12.5px;
  display: grid;
  place-items: center;
  border: 8px solid;
}

.radial-repeating {
  border-width: 20px;
  border-image: repeating-radial-gradient(circle at 10px,
      turquoise,
      pink 2px,
      greenyellow 4px,
      pink 2px) 1;
}
</style>
