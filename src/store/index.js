import Vue from "vue";
import Vuex from "vuex";
import axios from "@/config/axios.js";
import router from "../router";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    categories: [],
    addCategoryBtn: true,
    category: {
      name: null,
      description: null,
      state: false,
    },
    addProductBtn: true,
    product: {
      CategoryId: 2,
      name: null,
      price: null,
      state: false,
    },
    errors: [],
  },
  mutations: {
    deleteCategoryProduct: (state, prd) => {
      let products = state.category.Products;
      let res = products.filter((product) => product.id != prd.id);
      state.category.Products = res;
    },
    addCategoryProduct: (state, prd) => {
      state.category.Products.push(prd);
    },
    addCategory: (state, ctg) => {
      state.categories.push(ctg);
    },
    setAddBtn: (state, data) => {
      if (data.type == "product") state.addProductBtn = data.state;
      else state.addCategoryBtn = data.state;
    },
    setCategories: (state, categories) => {
      state.categories = categories;
    },
    setState: (state, data) => {
      if (data.type == "product") {
        state.addProductBtn = data.state;
        state.product = {
          state: data.state,
          name: "",
          price: "",
          CategoryId: data.category_id,
        };
      } else {
        state.addCategoryBtn = data.add;
        if (!data.add) {
          let cat = { ...data.category, state:data.state };
          state.category = cat;
          
        } else {
          state.category = {
            state: data.state,
            name: "",
            description: "",
          };
        }
      }
    },
    editProduct: (state, data) => {
      state.product = data.product;
      state.product.state = data.state;
      state.addProductBtn = data.btnAdd;
      console.log("pro", state.product);
    },
    setUser: (state, user) => {
      state.user = user;
    },
  },
  getters: {
    getProduct: (state) => {
      return state.product;
    },
    getCategories: (state) => {
      return state.categories;
    },
  },
  actions: {
    login: ({ commit }, user) => {
      axios
        .post(`sign-in`, user)
        .then(async (res) => {
          let data = res.data;
          localStorage.setItem("token", data.token);
          commit("setUser", data.user);
          await router.push("/");
        })
        .catch((err) => {
          console.log("error :", err);
        });
    },
    loadCategories: ({ commit }) => {
      axios
        .get("categories")
        .then((res) => {
          console.log(res.data);
          commit("setCategories", res.data);
        })
        .catch((err) => {
          console.log("err", err);
          if (err.code === 401) {
            localStorage.removeItem("token");
            router.push({ name: "signIn" });
          }
        });
    },
    add: ({ commit }, data) => {
      if (data.type == "product") {
        let category_id = data.CategoryId;
        axios
          .post(`products/${category_id}`, data.product)
          .then((res) => {
            commit("setState", { type: "product", state: false });
            commit("addCategoryProduct", res.data.product);
          })
          .catch((err) => {
            console.log("error :", err);
          });
      } else if (data.type == "category") {
        data.category.UserId = 4;
        axios
          .post(`categories`, data.category)
          .then((res) => {
            commit("setState", { type: "category", state: false });
            commit("addCategory", res.data.category);
          })
          .catch((err) => {
            console.log("error :", err);
          });
      } else {
        axios
          .post(`sign-up`, data.user)
          .then(async (res) => {
            let result = res.data;
            localStorage.setItem("token", data.token);
            commit("setUser", result.user);
            await router.push("/");
          })
          .catch((err) => {
            console.log("error :", err);
          });
      }
    },
    updateProduct: ({ commit }, product) => {
      axios
        .put(`products/${product.id}`, product)
        .then(() => {
          commit("setProductState", false);
        })
        .catch((err) => {
          console.log("error :", err);
        });
    },
    deleteProduct: ({ commit }, product) => {
      axios
        .delete(`products/${product.id}`)
        .then((res) => {
          commit("deleteCategoryProduct", product);
          console.log("success", res);
        })
        .catch((err) => {
          console.log("error :", err);
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
