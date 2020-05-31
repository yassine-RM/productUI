<template>
  <div class="nav layout-app">
    <v-navigation-drawer flat app v-model="drawer" mobile-break-point="650" color="$accent">
      <v-list subheader dense shaped>
        <h3 class="mt-3 grey--text text-center">Gestion-Products</h3>
        <v-avatar class="mt-5 mb-1" size="60">
          <img
            :src="'https://source.unsplash.com/collection/'+user.id+'/1600x900'"
            alt="user image"
          />
        </v-avatar>
        <h5 class="text-capitalize text-center">{{user.name}}</h5>
        <div v-for="(link, index) in links" :key="index">
          <div v-if="link.to=='/users'">
            <v-list-item class="mt-2" v-if="user.isAdmin" :to="link.to">
              <v-list-item-content>
                <v-list-item-title class="grey--text" v-text="link.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon small :color="link.color">{{link.icon}}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </div>
          <v-list-item class="mt-2" v-else :to="link.to">
            <v-list-item-content>
              <v-list-item-title class="grey--text" v-text="link.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon small :color="link.color">{{link.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-app-bar-nav-icon small @click="drawer = !drawer"></v-app-bar-nav-icon>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      messages: 3,
      links: [
        {
          id: 2,
          color: "green",
          icon: "mdi-view-grid",
          title: "Categories",
          to: "/"
        },
        {
          id: 1,
          color: "cyan",
          icon: "mdi-account-group",
          title: "Users",
          to: "/users"
        }
      ],
      drawer: true
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "signIn" });
    }
  }
};
</script>

<style scoped lang='scss'>
.layout-app ::v-deep {
  .v-avatar {
    display: block !important;
    margin: auto;
  }
  .v-navigation-drawer {
    background-color: #f5f5f5 !important;
  }
}
</style>