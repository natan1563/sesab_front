import { axiosClient } from "@/clients/axiosClient";

export class UserService {

  constructor() {
    this.api = axiosClient
  }


  getFilteredUsers(params) {
    return this.api.get('/users/filter', {params})
  }
}
