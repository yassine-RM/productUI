import Vue from "vue";
import Vuex from "vuex";
import axios from "@/config/axios.js";
import router from "../router";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    users: [],
    categories: [],
    addCategoryBtn: true,
    category: {
      name: null,
      description: null,
      state: false,
      Products:[]
    },
    addProductBtn: true,
    product: {
      CategoryId: 2,
      name: null,
      price: null,
      state: false,
    },
    error:{},
  },
  mutations: {
    deleteCategoryProduct: (state, prd) => {
      let products = state.category.Products;
      let res = products.filter((product) => product.id != prd.id);
      state.category.Products = res;
    },
    deleteCategory: (state, cat) => {
      let categories = state.categories;
      let res = categories.filter((category) => category.id != cat.id);
      state.categories = res;
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
    setUsers: (state, users) => {
      state.users = users;
    },
    setError:(state,error)=>{
      state.error=error
    },
    setCategory:(state,category)=>{
     state.category=category
     router.push('/products')
    },
    updateCategory: (state, category) => {
      state.categories.forEach(cat=>{
        if (cat.id===category.id) {
          console.log(cat.name);
          return cat=category
          
        }
      })
    },
    setState: (state, data) => {
      if (data.type == "product") {
        state.addProductBtn = data.state;
        state.product = {
          state: data.state,
          name: "",
          price: "",
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
    getError:(state)=>{
       return state.error
    },
    getUsers:(state)=>{
       return state.users
    }
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
          if (err.response.status===401) {
            commit('setError',"Sorry login or password incorrect !!!")
          }
        });
    },
    loadCategories: ({ commit },userId) => {
      axios
        .get(`categories/${userId}`)
        .then((res) => {
          commit("setCategories", res.data);
        })
        .catch((err) => {
          console.log("err", err);
          // if (err.response.status === 401) {
          //   localStorage.removeItem("token");
          //   router.push({ name: "signIn" });
          // }
        });
    },
    users: ({ commit }) => {
      axios
      .get('users')
      .then((res) => {
        console.log("users",res.data);
        commit("setUsers", res.data);
        })
        .catch((err) => {
          console.log("err", err);
          // if (err.response.status === 401) {
          //   localStorage.removeItem("token");
          //   router.push({ name: "signIn" });
          // }
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
        axios
          .post(`categories`, data.category)
          .then((res) => {
            console.log("res:",res);
            
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
            localStorage.setItem("token", result.token);
            commit("setUser", result.user);
            await router.push("/");
          })
          .catch((err) => {
            if (err.response.status===422) {
              commit('setError',"Sorry error durring registred user !!!")
            }
          });
      }
    },
    update: ({ commit }, data) => {
      if (data.type=="product") {
        axios
        .put(`products/${data.product.id}`, data.product)
        .then(() => {
          commit("setState",{ state:false,type:'product'});
        })
        .catch((err) => {
          console.log("error :", err);
        });
      }else if (data.type=="category") {
        
        axios
        .put(`categories/${data.category.id}`, data.category)
        .then(() => {
          commit("updateCategory",data.category);
          commit("setState",{ state:false,type:'category'});
        })
        .catch((err) => {
          console.log("error :", err);
        });
      }
    },
    delete: ({ commit }, data) => {
      if (data.type=="product") {
        axios
        .delete(`products/${data.product.id}`)
        .then((res) => {
          commit("deleteCategoryProduct", data.product);
          console.log("success", res);
        })
        .catch((err) => {
          console.log("error :", err);
        });
      }else if (data.type=="category") {
        axios
        .delete(`categories/${data.category.id}`)
        .then((res) => {
          commit("deleteCategory", data.category);
          console.log("success", res);
        })
        .catch((err) => {
          console.log("error :", err);
        });
        console.log("ok");
        
      }
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
