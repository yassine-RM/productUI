<template>
  <div class="products">
    <v-row>
      <v-col cols="12">
       <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="cyan" icon v-on="on" @click="addProduct(true,7)">
                  <v-icon>mdi-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>New product</span>
            </v-tooltip>
       <new-product/>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" v-for="(product, index) in category.Products" :key="index">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div
                class="mb-4 grey--text caption"
              >{{product.createdAt | moment("dddd, MMMM Do YYYY")}}</div>
              <v-list-item-title class="headline mb-1">{{product.name}}</v-list-item-title>
              <v-list-item-title class="caption font-weight-bold grey--text">{{product.price}} $</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="grey">
              <img
                :src="'https://source.unsplash.com/collection/'+product.id+'/1600x900'"
                alt="product image"
              />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="green" icon v-on="on" @click="showProductForm(true,false,product)">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
              <span>Edit product</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="red" icon v-on="on" @click="deleteProduct(product)">
                  <v-icon>mdi-delete-sweep-outline</v-icon>
                </v-btn>
              </template>
              <span>Delete product</span>
            </v-tooltip>
          </v-card-actions>

          <edit-product />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import product from "@/components/productForm.vue";
export default {
  components: {
    "edit-product": product,
    "new-product": product
  },
  data() {
    return {};
  },
  created() {
    console.log(this.category);
  },
  computed: {
    ...mapState(["category", "product"])
  },
  methods: {
    showProductForm(state, btnAdd, product) {
      this.$store.commit("editProduct", { state, btnAdd, product });
    },
    addProduct(state,category_id) {
      this.$store.commit("setProductState", { state,category_id });
    },
    deleteProduct(product) {
      this.$store.dispatch("deleteProduct", product);
    }
  }
};
</script>

<style scoped>
</style>