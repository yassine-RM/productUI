<template>
  <v-row justify="center">
    <v-dialog v-model="category.state" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="addCategoryBtn" class="headline">Add now category </span>
          <span v-else class="headline">Update category </span>
        </v-card-title>
        <v-card-text>
          <v-form>
          <v-container>
                <v-text-field v-model="category.name" label="Name of category *" required></v-text-field>
                <v-textarea
                  v-model="category.description"
                  label="Description of category *"
                  required
                ></v-textarea>
          </v-container>
          <small>* indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="categoryForm(false)">Close</v-btn>
          <v-btn v-if="addCategoryBtn" color="blue darken-1" text @click="add(category)">Save</v-btn>
          <v-btn v-else color="orange darken-1" text @click="updatecategory(category)">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  methods: {
    categoryForm(state) {
      this.$store.commit("setState", {state,type:'category'});
    },
    add(category) {
      this.$store.dispatch("add", {type:'category',category});
    },
    updateCategory(category) {
      this.$store.dispatch("updateCategory", category);
    }
  },
  computed: {
    ...mapState(["category","addCategoryBtn"])
  }
};
</script>

<style scoped>
</style>