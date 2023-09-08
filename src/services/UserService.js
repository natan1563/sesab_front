import { axiosClient } from "@/clients/axiosClient";

export class UserService {

  constructor() {
    this.api = axiosClient
  }


  getFilteredUsers(params) {
    return this.api.get('/users/filter', {params})
  }

  createUser(payload) {
    return this.api.post('/users', payload)
  }

  deleteUser(id) {
    return this.api.delete(`/users/${id}`)
  }
}
