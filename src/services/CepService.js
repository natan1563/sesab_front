import { axiosClientViaCep } from "@/clients/axiosClientViaCep";

export class CepService {

  constructor() {
    this.api = axiosClientViaCep
  }


  getCepData(cep) {
    return this.api.get(`/${cep}/json/`)
  }
}
