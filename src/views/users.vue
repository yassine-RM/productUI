<template>
  <v-row no-getters>
    <v-spacer></v-spacer>
    <v-col md="3">
      <v-text-field
        hide-details
        rounded
        outlined
        dense
        prepend-inner-icon="mdi-account-search-outline"
        label="Search"
        v-model="search"
      ></v-text-field>
    </v-col>
    <v-col md="12">
      <v-data-table
        v-model="props"
        :search="search"
        :headers="headers"
        :items="users"
        :sort-by="['calories', 'fat']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-1"
      >
      
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      props: [],
      search: "",
      headers: [
        {
          text: "Id",
          align: "start",
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Created At", value: "createdAt" },
        { text: "Action", value: "", sortable: false }
      ]
    };
  },
  created() {
    this.$store.dispatch("users");
  },
  computed: {
    ...mapGetters({ users: "getUsers" })
  }
};
</script>

<style lang="scss" scoped>
</style>