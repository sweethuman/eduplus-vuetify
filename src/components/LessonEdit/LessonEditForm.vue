<template>
  <v-layout align-center justify-center>
    <v-flex xl8 lg10 xs12>
      <v-card>
        <v-card-text>
          <form class="mx-3 mt-3">
            <v-text-field
              v-model.trim="lessonForm.title"
              prepend-inner-icon="mdi-format-title"
              label="Titlu"
              outline
              clearable
              :error-messages="titleErrors"
              @blur="$v.lessonForm.title.$touch"
              @keyup.enter="focusNextInputOnEvent"
            ></v-text-field>
            <v-text-field
              v-model.trim="lessonForm.description"
              prepend-inner-icon="mdi-text-short"
              label="Descriere"
              outline
              clearable
              :error-messages="descriptionErrors"
              @blur="$v.lessonForm.description.$touch"
              @keyup.enter="focusNextInputOnEvent"
            ></v-text-field>
            <v-text-field
              v-model.trim="lessonForm.testId"
              prepend-inner-icon="mdi-test-tube"
              label="Test ID"
              outline
              clearable
              :error-messages="testIdErrors"
              @blur="$v.lessonForm.testId.$touch"
              @keyup.enter="focusNextInputOnEvent"
            ></v-text-field>
            <v-select
              v-model.trim="lessonForm.style"
              :items="stylesToSelect"
              prepend-inner-icon="mdi-palette-swatch"
              label="Stilul de Invatare"
              outline
              clearable
              :error-messages="styleErrors"
              @blur="$v.lessonForm.style.$touch"
              @keyup.enter="focusNextInputOnEvent"
            ></v-select>
            <v-text-field
              v-if="showYoutubeIdField"
              v-model.trim="lessonForm.youtubeId"
              prepend-inner-icon="mdi-youtube"
              label="Youtube ID"
              outline
              clearable
              :error-messages="youtubeIdErrors"
              @blur="$v.lessonForm.youtubeId.$touch"
              @keyup.enter="focusNextInputOnEvent"
            ></v-text-field>
            <v-textarea
              v-model.trim="lessonForm.content"
              prepend-inner-icon="mdi-page-next-outline"
              label="Continut"
              outline
              height="1000"
              :error-messages="contentErrors"
              @blur="$v.lessonForm.content.$touch"
            ></v-textarea>
          </form>
        </v-card-text>
        <v-alert
          v-model="alert.show"
          :type="alert.type"
          transition="scale-transition"
          dismissible
          mode="in-out"
          class="my-2 mx-5"
        >
          {{ alert.message }}
        </v-alert>
        <v-card-actions class="pb-4 px-5">
          <v-btn dark round :large="$vuetify.breakpoint.mdAndUp" class="wiretap-gradient-halved" @click="deleteLesson">
            <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-delete</v-icon>
            {{ returnEmptyStringOnlyOnXS("Sterge Lectia") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark round :large="$vuetify.breakpoint.mdAndUp" class="kyoo-dark" @click="saveLesson">
            {{ returnEmptyStringOnlyOnXS("Salveaza Lectia") }}
            <v-icon :right="!$vuetify.breakpoint.xsOnly">mdi-content-save-edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";
import lessonStyles from "../../enums/lessonStyles";
import { formUtilitiesMixin } from "../../mixins/formUtilitiesMixin";
import { firestore } from "../../firebase";

function youtubeIdRequired(value) {
  return (
    helpers.req(value) ||
    !(
      this.lessonForm.style === lessonStyles.styleToText.audio ||
      this.lessonForm.style === lessonStyles.styleToText.tactile
    )
  );
}

export default {
  name: "LessonEditForm",
  mixins: [formUtilitiesMixin],
  data() {
    return {
      lessonForm: {
        title: "",
        description: "",
        testId: "",
        style: "",
        youtubeId: "",
        content: "",
      },
      stylesToSelect: [
        lessonStyles.styleToText.visual,
        lessonStyles.styleToText.audio,
        lessonStyles.styleToText.tactile,
        lessonStyles.styleToText.puzzle,
      ],
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  computed: {
    showYoutubeIdField() {
      return (
        this.lessonForm.style === lessonStyles.styleToText.audio ||
        this.lessonForm.style === lessonStyles.styleToText.tactile
      );
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.lessonForm.title.$dirty) return errors;
      !this.$v.lessonForm.title.required && errors.push("Titlul este necesar");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.lessonForm.description.$dirty) return errors;
      !this.$v.lessonForm.description.required && errors.push("Descrirea este necesara");
      return errors;
    },
    testIdErrors() {
      const errors = [];
      if (!this.$v.lessonForm.testId.$dirty) return errors;
      !this.$v.lessonForm.testId.required && errors.push("ID-ul unui Test este necesar");
      return errors;
    },
    styleErrors() {
      const errors = [];
      if (!this.$v.lessonForm.style.$dirty) return errors;
      !this.$v.lessonForm.style.required && errors.push("Selectarea unui stil este obligatorie");
      return errors;
    },
    youtubeIdErrors() {
      const errors = [];
      if (!this.$v.lessonForm.youtubeId.$dirty) return errors;
      !this.$v.lessonForm.youtubeId.youtubeIdRequired &&
        errors.push("ID-ul unui lectii video pe Youtube este necesara");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.lessonForm.content.$dirty) return errors;
      !this.$v.lessonForm.content.required && errors.push("Continutul este necesar");
      return errors;
    },
  },
  watch: {
    "lessonForm.style": {
      immediate: true,
      async handler(newStyle) {
        if (newStyle === "" || newStyle == null) {
          this.lessonForm.content = "";
          return;
        }
        let stringIndex = "";
        for (let index in lessonStyles.styleToText) {
          if (lessonStyles.styleToText[index] === newStyle) {
            stringIndex = index;
            break;
          }
        }
        let styleObject = await firestore
          .collection(
            `/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/${this.$route.params.lesson}/styles`
          )
          .doc(stringIndex)
          .get();
        if (!styleObject.exists) {
          this.lessonForm.youtubeId = "";
          this.lessonForm.content = "";
          return;
        }
        let styleObjectData = styleObject.data();
        this.lessonForm.content = styleObjectData.source;
        this.lessonForm.youtubeId = styleObjectData["youtube-id"] != null ? styleObjectData["youtube-id"] : "";
      },
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadLesson(to);
    if (to.query.style != null && lessonStyles.styleToText[to.query.style] != null) {
      this.lessonForm.style = lessonStyles.styleToText[to.query.style];
    }
    next();
  },
  async created() {
    await this.loadLesson(this.$route);
    if (this.$route.query.style != null && lessonStyles.styleToText[this.$route.query.style] != null) {
      this.lessonForm.style = lessonStyles.styleToText[this.$route.query.style];
    }
  },
  validations: {
    lessonForm: {
      title: { required },
      description: { required },
      testId: { required },
      style: { required },
      youtubeId: { youtubeIdRequired }, //make it required only if style is audio or tactile
      content: { required },
    },
  },
  methods: {
    returnEmptyStringOnlyOnXS(text) {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "";
      }
      return text;
    },
    displayError(message) {
      this.alert.message = message;
      this.alert.type = "error";
      this.alert.show = true;
    },
    displaySuccess(message) {
      this.alert.message = message;
      this.alert.type = "success";
      this.alert.show = true;
    },
    async loadLesson(routeObject) {
      let lessonObject = await firestore
        .collection(`/disciplines/${routeObject.params.discipline}/chapters/${routeObject.params.chapter}/lessons`)
        .doc(routeObject.params.lesson)
        .get();
      let lessonObjectData = lessonObject.data();

      this.lessonForm.title = lessonObjectData.title != null ? lessonObjectData.title : "";
      this.lessonForm.description = lessonObjectData.description != null ? lessonObjectData.description : "";
      this.lessonForm.testId = lessonObjectData["test-id"] != null ? lessonObjectData["test-id"] : "";
    },
    async deleteLesson() {
      this.$wait.start("deleting lesson");
      try {
        await firestore
          .collection(`/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/`)
          .doc(this.$route.params.lesson)
          .delete();
      } catch (e) {
        this.$log.error(e);
        this.$showError(e.message);
      }
      this.$wait.end("deleting lesson");
      this.displaySuccess("Lectia a fost STEARSA!");
    },
    async saveLesson() {
      this.$wait.start("saving lesson");
      this.$v.lessonForm.$touch();
      if (this.$v.lessonForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Inregistrare");
        return;
      }
      let docExistanceQuery = await firestore
        .collection(`/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/`)
        .doc(this.$route.params.lesson)
        .get();
      if (docExistanceQuery.exists) {
        await firestore
          .collection(`/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/`)
          .doc(this.$route.params.lesson)
          .update({
            title: this.lessonForm.title,
            description: this.lessonForm.description,
            "test-id": this.lessonForm.testId,
          });
      } else {
        let lessonQuery = await firestore
          .collection(`/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/`)
          .orderBy("order", "desc")
          .limit(1)
          .get(); //if empty set order 0
        let saveDocOrder;
        if (lessonQuery.empty) {
          saveDocOrder = 0;
        } else {
          saveDocOrder = lessonQuery.docs[0].data().order + 1;
        }
        await firestore
          .collection(`/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/`)
          .doc(this.$route.params.lesson)
          .set({
            title: this.lessonForm.title,
            description: this.lessonForm.description,
            "test-id": this.lessonForm.testId,
            order: saveDocOrder,
          });
      }
      await this.saveStyle();
      this.$wait.end("saving lesson");
      this.displaySuccess("Lectia a fost salvata cu success!");
    },
    async saveStyle() {
      let stringIndex = "";
      for (let index in lessonStyles.styleToText) {
        if (lessonStyles.styleToText[index] === this.lessonForm.style) {
          stringIndex = index;
          break;
        }
      }
      await firestore
        .collection(
          `/disciplines/${this.$route.params.discipline}/chapters/${this.$route.params.chapter}/lessons/${this.$route.params.lesson}/styles`
        )
        .doc(stringIndex)
        .set({
          source: this.lessonForm.content,
          "youtube-id": this.lessonForm.youtubeId !== "" ? this.lessonForm.youtubeId : null,
        });
    },
  },
};
</script>

<style scoped></style>
