<template>
  <v-container>
    <v-app-bar app flat="">
      <v-spacer></v-spacer>
      
      <v-btn to="/auth/sign-in"  text  small rounded     class="mx-1">Sign In</v-btn>
      <v-btn to="/auth/sign-up" text  small rounded  class="mx-1">Sign Up</v-btn>
    </v-app-bar>

    <router-view />
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>