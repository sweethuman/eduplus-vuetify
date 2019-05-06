<template>
  <v-layout fill-height fill-width ma-0 align-center justify-center>
    <v-card dark>
      <v-layout
        align-center
        justify-space-between
        :column="$vuetify.breakpoint.mdAndDown"
        :ma-3="$vuetify.breakpoint.xs"
        :ma-4="$vuetify.breakpoint.sm"
        :ma-5="$vuetify.breakpoint.mdAndUp"
      >
        <v-flex shrink lg6>
          <svg :height="svgHeight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="align-self-center">
            <path
              id="dizzy-face"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-33.8-217.9c7.8-7.8 7.8-20.5 0-28.3L196.3 192l17.9-17.9c7.8-7.8 7.8-20.5 0-28.3-7.8-7.8-20.5-7.8-28.3 0L168 163.7l-17.8-17.8c-7.8-7.8-20.5-7.8-28.3 0-7.8 7.8-7.8 20.5 0 28.3l17.9 17.9-17.9 17.9c-7.8 7.8-7.8 20.5 0 28.3 7.8 7.8 20.5 7.8 28.3 0l17.8-17.8 17.8 17.8c7.9 7.7 20.5 7.7 28.4-.2zm160-92.2c-7.8-7.8-20.5-7.8-28.3 0L328 163.7l-17.8-17.8c-7.8-7.8-20.5-7.8-28.3 0-7.8 7.8-7.8 20.5 0 28.3l17.9 17.9-17.9 17.9c-7.8 7.8-7.8 20.5 0 28.3 7.8 7.8 20.5 7.8 28.3 0l17.8-17.8 17.8 17.8c7.8 7.8 20.5 7.8 28.3 0 7.8-7.8 7.8-20.5 0-28.3l-17.8-18 17.9-17.9c7.7-7.8 7.7-20.4 0-28.2zM248 272c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z"
              stroke="#FFFFFF"
              fill="#FFFFFF"
            ></path>
          </svg>
        </v-flex>
        <v-flex grow lg6>
          <v-card-text class="text-xs-center px-0" :class="[textSize]">{{ text }}</v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "ItemNotFound",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    textSize() {
      if (this.$vuetify.breakpoint.mdAndUp) return "display-4";
      if (this.$vuetify.breakpoint.xs) return "display-2";
      return "display-3";
    },
    svgHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "500px";
      return "250px";
    },
  },
};
</script>

<style scoped></style>
