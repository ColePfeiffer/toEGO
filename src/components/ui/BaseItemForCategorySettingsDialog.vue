<template>
  <q-item v-if="type === 'folder'" clickable :ripple="false">
    <q-item-section avatar top>
      <q-avatar icon="bi-folder" color="transparent" text-color="secondary" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{  folderOrCategory.name  }}</q-item-label>
      <q-item-label caption>Categories: {{  getAmount()  }}</q-item-label>
    </q-item-section>


    <q-item-section side>
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-btn dense round flat icon="bi-trash" size="10.5px">
          </q-btn>
        </div>
        <div class="col-6 ">
          <q-btn dense round flat icon="expand_more" size="10.5px">
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>

  <q-item v-else clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar icon="bi-collection" color="transparent" text-color="secondary" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{  folderOrCategory.name  }}</q-item-label>
      <q-item-label caption>Templates: {{  getAmount()  }} </q-item-label>
    </q-item-section>




    <q-item-section avatar>
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-btn dense round flat icon="bi-trash" size="10px">
          </q-btn>
        </div>
        <div class="col-6 ">
          <q-btn dense round flat icon="expand_more" size="10px">
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>


<script>
export default {
  name: "BaseItemForCategorySettingsDialog",
  props: {
    type: String,
    folderOrCategory: Object,
  },
  emits: [],
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    getAmount() {
      let amount;
      if (this.folderOrCategory.templatesByID != undefined) {
        amount = this.folderOrCategory.templatesByID.length;
      } else {
        amount = this.folderOrCategory.categoriesByID.length;
      }
      return amount;
    }
  },
};




</script>
