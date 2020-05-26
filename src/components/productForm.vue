<template>
  <v-row justify="center">
    <v-dialog v-model="product.state" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="addProductBtn" class="headline">Add now product </span>
          <span v-else class="headline">Update product </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="product.name" label="Name of product *" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="product.price"
                  type="number"
                  label="Price of product *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="productForm(false)">Close</v-btn>
          <v-btn v-if="addProductBtn" color="blue darken-1" text @click="addNewProduct(product)">Save</v-btn>
          <v-btn v-else color="orange darken-1" text @click="updateProduct(product)">Update</v-btn>
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
    productForm(state) {
      this.$store.commit("setState", {state,type:'product'});
    },
    addNewProduct(product) {
      this.$store.dispatch("add", {type:'product',product});
    },
    updateProduct(product) {
      this.$store.dispatch("updateProduct", product);
    }
  },
  computed: {
    ...mapState(["product","addProductBtn"])
  }
};
</script>

<style scoped>
</style>