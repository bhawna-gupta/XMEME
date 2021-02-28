import axios from "axios";

export default axios.create({
  baseURL: "https://bhawna-xmeme.herokuapp.com/",
  // baseURL: "http://localhost:8081/",
  headers: {
    "Content-type": "application/json"
  }
});