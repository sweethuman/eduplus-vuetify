<template>
  <div>
    <v-scale-transition hide-on-leave>
      <v-btn v-if="!content" icon @click="triggerEdit"><v-icon>mdi-pencil</v-icon></v-btn>
    </v-scale-transition>
    <v-scale-transition hide-on-leave>
      <v-btn v-if="content" icon color="error" @click="triggerClose"><v-icon>mdi-close-outline</v-icon></v-btn>
    </v-scale-transition>
    <v-scale-transition hide-on-leave>
      <v-btn v-if="content" icon color="success" @click="triggerSave"><v-icon>mdi-content-save-outline</v-icon></v-btn>
    </v-scale-transition>
  </div>
</template>

<script>
export default {
  name: "EditButtons",
  props: {
    value: Boolean,
    preventEdit: {
      type: Boolean,
      default: false,
    },
    preventSave: {
      type: Boolean,
      default: false,
    },
    preventClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: false,
    };
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
  },
  methods: {
    updateState() {
      this.content = !this.content;
      this.$emit("input", this.content);
    },
    triggerSave() {
      this.$emit("click:save");
      if (this.preventSave) return;
      this.updateState();
    },
    triggerClose() {
      this.$emit("click:close");
      if (this.preventClose) return;
      this.updateState();
    },
    triggerEdit() {
      this.$emit("click:edit");
      if (this.preventEdit) return;
      this.updateState();
    },
  },
};
</script>

<style scoped></style>
