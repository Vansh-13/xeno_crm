import axios from "axios";

const api= axios.create({
  baseURL: "https://xeno-crm-backend-rky0.onrender.com",
    withCredentials:true,
});
export default api;