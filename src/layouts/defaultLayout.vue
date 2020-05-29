<template>
  <div class="nav">
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650" color="$accent">
      <v-list subheader dense shaped>
        <h3 class="mb-12 mt-3 grey--text text-center">Gestion-Products</h3>
        <v-list-item v-for="(link, index) in links" :key="index" :to="link.to">
          <v-list-item-content>
            <v-list-item-title class="grey--text" v-text="link.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="link.color">{{link.icon}}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-app-bar-nav-icon small  @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on" @click="logOut()" small icon class="mx-1">
            <v-icon small>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>sign out</span>
      </v-tooltip>
    </v-app-bar>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: 1,
          color: "cyan",
          icon: "mdi-account-group",
          title: "Users",
          to: "/users"
        },
        {
          id: 2,
          color: "green",
          icon: "mdi-view-grid",
          title: "Categories",
          to: "/"
        }
      ],
      drawer: true
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "signIn" });
    }
  }
};
</script>

<style scoped>
</style>