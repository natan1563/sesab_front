import { axiosClient } from "@/clients/axiosClient";

export class UserService {

  constructor() {
    this.api = axiosClient
  }


  getFilteredUsers(params, noCacheHeader = false) {
    const headers = {};
    if (noCacheHeader) {
      headers['Cache-Control'] = 'no-cache'
    }

    return this.api.get('/users/filter', {params, headers})
  }

  createUser(payload) {
    return this.api.post('/users', payload)
  }

  updateUser({name, cpf, email, is_admin, id}) {
    const payload = { name, cpf, email, is_admin }
    return this.api.put(`/users/${id}`, payload)
  }

  deleteUser(id) {
    return this.api.delete(`/users/${id}`)
  }
}
