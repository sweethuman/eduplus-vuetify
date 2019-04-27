<template>
  <v-btn class="orange-gradient" flat large @click="$emit('click', $event)">
    <v-avatar size="37px" class="mr-3">
      <v-img
        src="https://source.unsplash.com/500x500/?landscape,nature"
        lazy-src="https://source.unsplash.com/30x30/?landscape,nature"
        alt="profile_picture"
      >
        <template #placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
    </v-avatar>
    {{ $store.state.userManagement.currentUser.forename }}
  </v-btn>
</template>

<script>
export default {
  name: "MyProfileButton",
};
</script>

<style scoped></style>
