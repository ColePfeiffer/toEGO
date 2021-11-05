<template>
  <q-page class="q-pa-md">
    <div>
      <div class="elements fit row wrap justify-evenly">
        <div
          class="status column justify-evenly"
          style="background-color: orange; max-width: 150px"
        >
          <div class="statuselement row justify-evenly">
            <div>
              <q-btn flat icon="fas fa-book" color="primary" size="md" />
            </div>
            <div class="commentsStatusText">
              <p>X</p>
            </div>
          </div>
          <div class="statuselement row justify-evenly">
            <q-btn flat icon="fas fa-comment-alt" color="primary" size="md" />
            <p class="commentsStatusText">1/3</p>
          </div>
        </div>
        <div
          class="intentionOfTheWeek"
          style="background-color: pink; width: 200px"
        >
          Intention of the Week: Work!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style>
.commentsStatusText {
  padding: 5px;
}
.paddingBox {
  padding: 10px;
}
.status {
  padding: 15px;
}
.intentionOfTheWeek {
  padding: 15px;
}
</style>
