import axios from "axios";
let token = localStorage.getItem("token");
console.log('token',token);

export default axios.create({
  baseURL: "https://productserv.herokuapp.com/api/",
  headers: { authorization: `Bearer ${token}` },
});
