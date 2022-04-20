<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar text-color="secondary" :icon="eventData.mood"></q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ eventData.title }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item>
        <q-card-section class="my-card-text">
          {{ mergeText(eventData) }}
        </q-card-section>
      </q-item>
    </q-card>
  </div>
</template>
      
    
   <script>
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    //TimeAgo,
  },
  props: {
    eventData: Object,
  },
  data() {
    return {};
  },
  methods: {
    mergeText(eventData) {
      console.log("blubbb");
      let output = eventData.text;
      // check if text is empty; if so show title
      if (eventData.text == "") {
        output = eventData.title;
      }
      console.log([output][0]);
      return [output][0];
    },
  },
};
</script>
    
<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}

.my-card-text {
  font-size: 12.5px;
}
</style>
    