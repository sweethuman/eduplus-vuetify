<template>
  <div>
    <v-divider class="my-2"></v-divider>
    <v-card-title class="display-1">
      <v-icon v-if="icon" left large>{{ icon }}</v-icon>
      <span v-if="character" class="mr-3 text-xs-center" style="width: 36px">{{ character }}</span>
      {{ title }}
    </v-card-title>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ReferencesItem",
  props: {
    icon: {
      type: String,
      default: undefined,
    },
    character: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
