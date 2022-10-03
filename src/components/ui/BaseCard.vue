<template>
  <q-card class="test my-base-card shadow-3">
    <slot name="content">
      <q-card-section class="card-text"
        :class="{ 'text-center': isTextCentered, 'text-left': isTextLeft }">
        <slot name="contentInsideSection">
        </slot>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script>


export default {
  name: "BaseCard",
  props: {
    isTextSetToCentered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isTextCentered() {
      if (this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    },
    isTextLeft() {
      if (!this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    }
  },
};

</script>

<style>
.my-base-card {
  font-size: 12.5px;
  background: whitesmoke;
  border-width: 1.5px;
  border-color: #FFFFFF var(--q-secondary) var(--q-secondary) #FFFFFF;
  border-style: solid;
  border-radius: 0px;
}

.test {
  background: whitesmoke;
  border-width: 1.5px;
  border-color: #FFFFFF var(--q-secondary) var(--q-secondary) #FFFFFF;
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
