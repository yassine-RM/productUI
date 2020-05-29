<template>
  <v-row justify="center">
    <v-dialog v-model="category.state" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="addCategoryBtn" class="headline">Add now category</span>
          <span v-else class="headline">Update category</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="category">
            <v-container>
              <v-text-field
                :rules="rules.name"
                outlined
                dense
                v-model="category.name"
                label="Name of category *"
                required
              ></v-text-field>
              <v-textarea
                :rules="rules.desc"
                outlined
                dense
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
          <v-btn outlined rounded small color="red darken-1" text @click="categoryForm(false)">
            <v-icon>mdi-close</v-icon>close
          </v-btn>
          <v-btn
            outlined
            rounded
            small
            v-if="addCategoryBtn"
            color="blue darken-1"
            text
            @click="add(category)"
          >
            <v-icon>mdi-content-save-outline</v-icon>save
          </v-btn>
          <v-btn
            outlined
            rounded
            small
            v-else
            color="orange darken-1"
            text
            @click="update(category)"
          >
            <v-icon>mdi-refresh</v-icon>update
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    rules: {
      name: [
        v => !!v || "Name of category is required",
        v => (v && v.length >= 2) || "Name must be 	greater than 2 characters"
      ],
      desc: [
        v => !!v || "Name of category is required",
        v =>
          (v && v.length >= 2) ||
          "Description must be 	greater than 2 characters",
        v =>
          (v && v.length < 255) ||
          "Description must be 	less than 255 characters"
      ]
    }
  }),

  computed: {
    ...mapState(["category", "addCategoryBtn", "user"])
  },

  methods: {
    categoryForm(state) {
      this.$store.commit("setState", { state, type: "category" });
    },
    add(category) {
      if (this.validateForm()) {
        category.UserId = this.user.id;
        console.log("user is->", this.user.id);
        this.$store.dispatch("add", { type: "category", category });
      }
    },
    update(category) {
      if (this.validateForm())
        this.$store.dispatch("update", { type: "category", category });
    },
    validateForm() {
      let confirm = this.$refs.category.validate();
      return confirm;
    }
  }
};
</script>

<style scoped>
</style>