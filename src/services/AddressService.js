import { axiosClient } from "@/clients/axiosClient";

export class AddressService {

  constructor() {
    this.api = axiosClient
  }

  createAddress(payload) {
    return this.api.post('/address', payload)
  }

  deleteAddress(id) {
    return this.api.delete(`/address/${id}`)
  }
}
