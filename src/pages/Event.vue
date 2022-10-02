<template>
  <BasePage icon="theater_comedy"
    titleOfPage="Creating a new event">
    <template v-slot:title-bar-icon>
      <q-icon name="theater_comedy"
        size="25px" />
    </template>
    <template v-slot:title-bar-controls>
      <q-btn v-if="isShowingEditor"
        :style="$store.state.data.buttonFlatStyleTransparent"
        flat
        icon="bi-blockquote-right"
        @click="toggleVisibilityOfEventText"
        color="$store.state.data.sFontColor">
      </q-btn>
    </template>
    <template v-slot:content>
      <!-- Content: Emoji, Title, What happened? -->
      <q-card v-if="isShowingEditor === false"
        class="transparent no-shadow">
        <q-card-section class="row items-center justify-center">
          <!-- How Are You-Section | Emoji-Selection -->
          <div class="promptContainer col-12 q-mx-md q-pa-md">
            <!-- Title -->
            <div class="row justify-center items-center">
              <div class="col-12 underlined promptTitle"
                :style="getStyleForHeadline">
                How are you feeling?
              </div>
            </div>
            <!-- Emoji Selection via Button Toggle -->
            <div class="emojiSelection q-mt-md row justify-center items-center">
              <div class="col-12">
                <div class="align-center">
                  <q-btn-toggle v-model="mood"
                    toggle-color="accent"
                    padding="none"
                    flat
                    :options="[
                      { value: 'las la-angry', slot: 'angry' },
                      { value: 'las la-sad-tear', slot: 'sad' },
                      { value: 'las la-meh', slot: 'meh' },
                      { value: 'las la-smile', slot: 'content' },
                      { value: 'las la-grin-alt', slot: 'happy' },
                    ]">
                    <template v-slot:angry>
                      <q-btn padding="xs"
                        :style="$store.state.data.buttonFlatStyleTransparent"
                        flat
                        size="15px"
                        icon="las la-angry" />
                    </template>

                    <template v-slot:sad>
                      <q-btn padding="xs"
                        :style="$store.state.data.buttonFlatStyleTransparent"
                        flat
                        size="15px"
                        icon="las la-sad-tear" />
                    </template>

                    <template v-slot:meh>
                      <q-btn padding="xs"
                        :style="$store.state.data.buttonFlatStyleTransparent"
                        flat
                        size="15px"
                        icon="las la-meh" />
                    </template>

                    <template v-slot:content>
                      <q-btn padding="xs"
                        :style="$store.state.data.buttonFlatStyleTransparent"
                        flat
                        size="15px"
                        icon="las la-smile" />
                    </template>

                    <template v-slot:happy>
                      <q-btn padding="xs"
                        :style="$store.state.data.buttonFlatStyleTransparent"
                        flat
                        size="15px"
                        icon="las la-grin-alt" />
                    </template>
                  </q-btn-toggle>
                </div>
              </div>
            </div>
          </div>

          <!-- What Happened-Section -->
          <div class="promptContainer col-12 q-mx-md q-mt-xs q-px-md">
            <!-- Title -->
            <div class="row justify-center items-center"></div>
            <!-- Text Input -->
            <div class="row justify-center q-mt-xs items-center">
              <div class="col-12">
                <q-input class="input"
                  color="primary"
                  v-model="title"
                  stack-label
                  filled
                  square
                  label="Title"
                  input-style="max-height: 50px; min-height: 25px; font-size: 12.5px"
                  :rules="[
                    (val) =>
                      val.length <= 50 || 'Please use maximum 50 characters',
                  ]" />
              </div>
            </div>
            <!-- Text Input -->
            <div class="row justify-center q-mt-xs items-center">
              <div class="col-12">
                <q-input class="input"
                  v-model="text"
                  label="What happened?"
                  stack-label
                  filled
                  square
                  autogrow
                  input-style="max-height: 335px; min-height: 220px; font-size: 12.5px" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <!-- Content: Editor -->
      <div v-else
        class="column">
        <q-scroll-area :style="heightForScrollArea"
          ref="scrollArea">
          <div v-if="isShowingEventText"
            class="defaultFont smallText"
            :style="getStyleForQuotedEventText">
            <q-scroll-area :style="styleEventTextScrollArea">
              <span class="bold">You wrote:</span> <br />
              <span class="text-justify keep-whitespace">{{
              quotedText
              }}</span>
            </q-scroll-area>
          </div>
          <!-- Editor -->
          <div class="row justify-center">
            <div class="col-12">
              <q-scroll-area :style="heightForScrollArea"
                ref="scrollArea">
                <BaseEditor class="no-border-radius no-box-shadow"
                  ref="editorRef1"
                  v-model="editor"
                  minHeight="535px"
                  type="EVENT"
                  @openDialogCreateTemplate="openDialogCreateTemplate"
                  @openDialogViewTemplates="openDialogViewTemplates"
                  @pasteTemplate="pasteTemplate" />
              </q-scroll-area>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </template>
    <template v-slot:footer>
      <q-btn no-caps
        no-wrap
        class="button col-2 q-mr-xs"
        flat
        :style="$store.state.data.buttonFlatStyleAccentColor"
        @click="showEditor">
        <div class="row items-center no-wrap">
          <q-icon size="15px"
            color="black"
            left
            :name="getIconForEditorButton" />
          <div class="text-center text-black">
            {{ getLabelForEditorButton }}
          </div>
        </div>
      </q-btn>
      <q-btn no-caps
        class="button col-2 q-mx-xs"
        :style="$store.state.data.buttonFlatStyle"
        flat
        @click="closeDialog">
        <div class="text-center text-black">Discard</div>
      </q-btn>

      <q-btn no-caps
        class="button col-2 q-ml-xs"
        :style="$store.state.data.buttonFlatStyle"
        flat
        @click="saveChanges">
        <div class="text-center text-black">Create</div>
      </q-btn>
    </template>
  </BasePage>

</template>


<script>
import BasePage from "src/components/ui/BasePage.vue";

export default {
  components: { BasePage, },
  data() {
    return {
      isShowingEditor: false,

    };
  },
  created() {
    console.log("you created me");
    console.log(this.$store.getters["layout/getStyleForHeadline"])
  },
  watch: {

  },
  methods: {
    toggleVisibilityOfEventText() {
      this.isShowingEventText = !this.isShowingEventText;
    },
  },
}
</script>


<style scoped>

</style>
