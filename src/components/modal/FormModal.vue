
<template>
  <v-row justify="center">
    <v-dialog
      v-model="formDialog"
      activator="parent"
      width="1024"
      persistent
    >
      <v-container v-if="formDialog">
        <v-form v-model="valid" @submit.prevent="sendUser">
          <v-card>
            <v-card-title class="pa-5">
              <span class="text-h5">{{ isUpdate ? 'Atualizar' : 'Cadastrar'}} Usuário</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="formData.name"
                      label="Name"
                      :rules="rules.nameRules"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="formData.email"
                      :rules="rules.emailRules"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="formData.cpf"
                      :rules="rules.cpfRules"
                      label="CPF"
                      :maxlength="14"
                      required
                      persistent-hint
                      @input="formatCPF"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="formData.is_admin"
                      :items="[
                        { title: 'Admin', value: true },
                        { title: 'Usuário', value: false },
                      ]"
                      label="Tipo de usuário"
                      required
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="cep"
                      label="CEP"
                      persistent-hint
                      :maxlength="8"
                      required
                      @input="cepFormatter"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                  >
                    <v-btn
                      @click="addAddress"
                      icon="mdi-plus"
                    />
                  </v-col>

                  <v-container >
                    <v-data-table-virtual
                      :headers="headers"
                      :items="addresses"
                      class="elevation-1"
                      height="200"
                      item-value="name"
                    >
                      <template #item.acao="{ item }">
                        <v-btn
                          density="comfortable"
                          icon="mdi-delete"
                          @click="removeAddress(item.raw.cep)"
                        ></v-btn>
                      </template>
                    </v-data-table-virtual>
                  </v-container>
                </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeModal"
              >
                Fechar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                type="submit"
              >
                Enviar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </v-dialog>
  </v-row>
</template>
<script>
  import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
  import { CepService } from '@/services/CepService.js'
  import { UserService } from '@/services/UserService.js'
  import { AddressService } from '@/services/AddressService.js'
  import { CPF_REGEX } from '@/enum/CpfRegexEnum.js'
  import { CEP_REGEX } from '@/enum/CepRegexEnum.js'

  const cepServiceInstance = new CepService()
  const userServiceInstance = new UserService()
  const addressServiceInstance = new AddressService()

  export default {
    components: {
      VDataTableVirtual,
    },
    data() {
      return {
        valid: false,
        formData: {
          name: '',
          email: '',
          cpf: '',
          is_admin: false,
        },
        cep: '',
        formDialog: false,
        isUpdate: false,
        headers: [
        {
          title: 'Logradouro',
          align: 'start',
          sortable: false,
          key: 'logradouro',
        },
        { title: 'CEP', align: 'end', key: 'cep' },
        { title: 'Bairro', align: 'end', key: 'bairro' },
        { title: 'Município', align: 'end', key: 'localidade' },
        { title: 'UF', align: 'end', key: 'uf' },
        { title: 'Ação', align: 'end', key: 'acao' },
        ],
        addresses: [],
        rules: {
          nameRules: [
            value => !!value || 'Por favor preencha o campo nome'
          ],
           cpfRules: [
            value => !!value || 'Por favor preencha o CPF',
            cpf => CPF_REGEX.default.test(cpf) || 'CPF inválido'
          ],
          emailRules: [
            value => !!value || 'Por favor preencha o seu e-mail',
            email => /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(email) || 'Por favor preencha um e-mail válido'
          ]
        }
      }
    },

    mounted () {
      this.$eventBus.on('form-modal', (userData) => {
        this.formDialog = true

        if (userData) {
          this.formData = userData
          this.formData.is_admin = !!userData.is_admin
          this.isUpdate = true
        }

      })
    },

    methods: {
      sendUser() {
        if (!this.valid) return

        userServiceInstance
          .createUser(this.formData)
          .then((response) => {
            if (response.status !== 201) {
              throw new Error(response.data.Error)
            }

            this.addresses.forEach(async (address) => {
              await addressServiceInstance.createAddress(this.buildAddressPayload(address, response.data.id))
            })

            this.formDialog = false
          })
          .catch(error => {
            console.error(error)
          })
      },

      closeModal() {
        this.formDialog = false
        this.isUpdate = false
        this.formData = null
      },

      addAddress() {
        if (!this.cep) return

        cepServiceInstance
          .getCepData(this.removeChars(this.cep))
          .then(response => {
            this.addresses.push(response.data)
            this.cep = ''
          })
      },

      removeAddress(cep) {
        const addressPosition = this.addresses.findIndex(item => item.cep === cep)
        this.addresses.splice(addressPosition, 1)
      },

      formatCPF() {
        this.formData.cpf = this.removeChars(this.formData.cpf)

        if (this.formData.cpf.length === 11) {
          this.formData.cpf = this.formData.cpf.replace(
            CPF_REGEX.withoutChars,
            '$1.$2.$3-$4'
          )
        }
      },

      cepFormatter() {
        this.cep = this.removeChars(this.cep)

        if (this.cep.length === 8) {
          this.cep = this.cep.replace(
            CEP_REGEX.withoutChars,
            '$1-$2'
          );
        }
      },

      removeChars(input) {
        return input.replace(/\D/g, '')
      },

      buildAddressPayload(addressRawData, user_id) {
        return {
          cep: this.removeChars(addressRawData.cep),
          public_place: addressRawData.logradouro,
          neighborhood: addressRawData.bairro,
          locality: addressRawData.localidade,
          uf: addressRawData.uf,
          user_id
        };
      }
    },
  }
</script>
