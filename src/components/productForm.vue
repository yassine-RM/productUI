<template>
  <v-row justify="center">
    <v-dialog v-model="product.state" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="addProductBtn" class="headline">Add now product</span>
          <span v-else class="headline">Update product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="product">
              <v-text-field
                :rules="rules.name"
                outlined
                dense
                v-model="product.name"
                label="Name of product *"
                required
              ></v-text-field>
              <v-text-field
                :rules="rules.price"
                outlined
                dense
                v-model="product.price"
                type="number"
                label="Price of product *"
                required
              ></v-text-field>
            </v-form>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded outlined small color="red darken-1" text @click="productForm(false)"> <v-icon>mdi-close</v-icon> Close</v-btn>
          <v-btn rounded outlined small
            v-if="addProductBtn"
            color="blue darken-1"
            text
            @click="addNewProduct(product)"
          > <v-icon>mdi-content-save-outline</v-icon> Save</v-btn>
          <v-btn rounded outlined small v-else color="orange darken-1" text @click="update(product)"> <v-icon>mdi-refresh</v-icon> Update</v-btn>
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
        v => !!v || "Name of product is required",
        v => (v && v.length >= 2) || "Name must be 	greater than 2 characters"
      ],
      price: [v => !!v || "Price of product is required"]
    }
  }),
  methods: {
    productForm(state) {
      this.$store.commit("setState", { state, type: "product" });
    },
    addNewProduct(product) {
      let confirm = this.$refs.product.validate();
      if (confirm) this.$store.dispatch("add", { type: "product", product });
    },
    update(product) {
      let confirm = this.$refs.product.validate();
      if (confirm) this.$store.dispatch("update", { type: "product", product });
    }
  },
  computed: {
    ...mapState(["product", "addProductBtn"])
  }
};
</script>

<style scoped>
</style>