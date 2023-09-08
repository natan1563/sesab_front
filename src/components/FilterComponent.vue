<template>
  <v-form v-model="valid" @submit.prevent="filterResults" class="mt-5">
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
            md="2"
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
            md="2"
          >
            <v-btn
              color="info"
              class="mt-4"
              block
              @click="openFormModal"
            >
              Novo
            </v-btn>

            <FormModal />
          </v-col>
        </v-row>
      </v-row>
  </v-form>
</template>

<script>
  import FormModal from './modal/FormModal.vue'

  import { UserService } from '@/services/UserService.js'
  import { CPF_REGEX } from '@/enum/CpfRegexEnum.js'
  import { format, addDays } from 'date-fns'

  const userService = new UserService();

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

    components: {
      FormModal,
    },

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

        userService.getFilteredUsers({
          name: this.name.trim(),
          cpf: this.cpf.trim(),
          initial_date: this.dateToTimestamp(this.initialDate),
          finished_date: this.dateToTimestamp(this.finishDate, true)
        })
        .then(response => {
          this.$emit('update-results', response.data)
        })
      },

      dateToTimestamp(currentDate, isFinishDate = false) {
        let mask = 'yyyy-MM-dd '
        mask += isFinishDate ? '23:59:59' : '00:00:01'

        const response = format(addDays(new Date(currentDate), 1), mask, { timezone: 'America/Sao_Paulo' });

        return response
      },

      openFormModal() {
        this.$eventBus.emit('form-modal')
      }
    },
  }
</script>
