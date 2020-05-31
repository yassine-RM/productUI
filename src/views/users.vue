<template>
  <v-row no-getters class="users">
    <v-spacer></v-spacer>
    <v-col md="3">
      <v-text-field
        hide-details
        outlined
        dense
        prepend-inner-icon="mdi-account-search-outline"
        label="Search"
        v-model="search"
      ></v-text-field>
    </v-col>
    <v-col md="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="users"
        :sort-by="['calories', 'fat']"
        :sort-desc="[false, true]"
        class="elevation-1"
        
      >
      <template  v-slot:item.isAdmin="{item}">
      <v-switch small color="success" v-model="item.isAdmin"></v-switch>
      </template>
     
      <template  v-slot:item.action="{item}">
        <v-btn color="red" icon   @click="remove(item.id)">
          <v-icon>mdi-delete-sweep-outline</v-icon>
        </v-btn>
      </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {

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
        { text: "Is-admin", value: "isAdmin", sortable: false    },
        { text: "Action", value: "action", sortable: false }
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
.users ::v-deep{
.v-data-table {
  // background-color: #def0ff !important;
}
  
}
</style>