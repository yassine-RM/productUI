import axios from "axios";
const token = localStorage.getItem("token");
export default axios.create({
  baseURL: "https://productserv.herokuapp.com/api/",
  headers: { authorization: `Bearer ${token}` },
});
