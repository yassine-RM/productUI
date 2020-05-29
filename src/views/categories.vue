<template>
  <div class="categories">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn color="cyan" text rounded outlined v-on="on" @click="showCategoryAddForm(true,true)">
          <v-icon>mdi-plus-outline</v-icon>new category
        </v-btn>
      </template>
      <span>New category</span>
    </v-tooltip>
    <new-category />
    <v-row>
      <v-col md="4" v-for="(category, index) in categories" :key="index">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div
                class="mb-4 grey--text caption"
              >{{category.createdAt | moment("dddd, MMMM Do YYYY")}}</div>
              <v-list-item-title class="headline mb-1">{{category.name}}</v-list-item-title>
              <v-list-item-subtitle>{{category.description}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
              <img
                :src="'https://source.unsplash.com/collection/'+category.id+'/1600x900'"
                alt="category image"
              />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn  small color="green"  icon v-on="on" @click="showProductForm(true,category.id)">
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </template>
              <span>Add new product</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn  small color="cyan" icon v-on="on" @click="setCategory(category)">
                  <v-icon>mdi-view-list</v-icon>
                </v-btn>
              </template>
              <span>Show all products</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn  small
                  color="orange"
                  icon
                  v-on="on"
                  @click="showCategoryEditForm(true,false,category)"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
              <span>Edit category</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn  small color="red" icon v-on="on" @click="deleteCategory(category)">
                  <v-icon>mdi-delete-sweep-outline</v-icon>
                </v-btn>
              </template>
              <span>Delete category</span>
            </v-tooltip>

            <new-product />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import product from "@/components/productForm";
import category from "@/components/categoryForm";
export default {
  components: {
    "new-product": product,
    "new-category": category
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("loadCategories", this.user.id);
  },
  computed: {
    ...mapGetters({ categories: "getCategories" }),
    ...mapState(["user"])
  },
  methods: {
    showProductForm(state, category_id) {
      this.$store.commit("setState", { state, category_id, type: "product" });
    },
    deleteCategory(category) {
      this.$store.dispatch("delete",{type:"category",category});
    },
    setCategory(category) {
      console.log(category)
      this.$store.commit("setCategory",category);
    },
    showCategoryEditForm(state, add, category) {
      this.$store.commit("setState", {
        state,
        type: "category",
        category,
        add
      });
    },
    showCategoryAddForm(state, add) {
      this.$store.commit("setState", { state, type: "category", add });
    }
  }
};
</script>

<style scoped>
</style>