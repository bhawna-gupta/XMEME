import http from "../http-common";

class MemeDataService {
  getAll() {
    return http.get("/memes");
  }

  get(id) {
    return http.get(`/memes/${id}`);
  }

  create(data) {
    return http.post("/memes", data);
  }

  update(id, data) {
    return http.patch(`/memes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/memes/${id}`);
  }

  deleteAll() {
    return http.delete(`/memes`);
  }

  findByName(name) {
    return http.get(`/memes?name=${name}`);
  }
}

export default new MemeDataService();
