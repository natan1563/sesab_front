<template>
  <v-form v-model="valid" @submit.prevent="filterResults" class="mt-5">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="cpf"
            :rules="cpfRules"
            :counter="14"
            :maxlength="14"
            label="CPF"
            required
            @input="formatCPF"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="initialDate"
            :rules="initialDateRule"
            label="Data Inicial"
            type="date"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="finishDate"
            :rules="finishDateRule"
            label="Data final"
            type="date"
            required
          ></v-text-field>
        </v-col>

        <v-row justify="center">
          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              color="success"
              class="mt-4"
              block
              type="submit"
            >
              Filtrar
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              color="info"
              class="mt-4"
              block
            >
              Novo
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { axiosClient } from '../clients/axiosClient'

  const CPF_REGEX = {
    default: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/,
    withoutChars: /(\d{3})(\d{3})(\d{3})(\d{2})/
  }

  export default {
    data: () => ({
      valid: false,
      name: '',
      cpf: '',
      initialDate: '',
      finishDate: '',
      nameRules: [
        value => !!value || 'Por favor preencha o campo nome'
      ],
      cpfRules: [
        value => !!value || 'Por favor preencha o CPF',
        cpf => CPF_REGEX.default.test(cpf) || 'CPF inválido'
      ],
      initialDateRule: [
        value => !!value ||'Por favor preencha a data de início'
      ],

      finishDateRule: [
        value =>!!value || 'Por favor preencha a data final'
      ],
    }),


   methods: {
    formatCPF() {
      this.cpf = this.cpf.replace(/\D/g, '');

      if (this.cpf.length === 11) {
        this.cpf = this.cpf.replace(
          CPF_REGEX.withoutChars,
          '$1.$2.$3-$4'
        );
      }
    },
    filterResults() {
      if (!this.valid) return

      axiosClient.get('/users')
    }
   },
  }
</script>
