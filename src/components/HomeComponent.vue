<template>
  <FilterComponent />

  <section class="pt-5">
    <v-divider class="my-5"/>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="desserts"
      item-value="name"
      class="elevation-1 mt-5"
    >
      <template #item.action="{item}">
        <v-row justify="space-around">
           <v-col cols="2">
              <v-btn
                density="comfortable"
                icon="mdi-information"
              ></v-btn>
            </v-col>

           <v-col cols="2">
              <v-btn
                density="comfortable"
                icon="mdi-pencil"
              ></v-btn>
            </v-col>

           <v-col cols="2">
              <v-btn
                density="comfortable"
                icon="mdi-delete"
              ></v-btn>
          </v-col>
        </v-row>
      </template>

      <template #item.is_admin="{item}">
        {{ item.raw.is_admin == 1 ? 'ADM' : 'USER' }}
      </template>
    </v-data-table>
  </section>
</template>

<script>
  import FilterComponent from './FilterComponent.vue'
  import { VDataTable } from 'vuetify/labs/VDataTable'

  export default {
    components: {
      FilterComponent,
      VDataTable
    },
     data () {
      return {
        itemsPerPage: 5,
        headers: [
          {
            title: 'ID',
            align: 'start',
            sortable: false,
            key: 'id',
          },
          { title: 'Data cadastro', sortable: false, align: 'center', key: 'created_at' },
          { title: 'Nome', sortable: false, align: 'center', key: 'name' },
          { title: 'CPF', sortable: false, align: 'center', key: 'cpf' },
          { title: 'E-mail', sortable: false, align: 'center', key: 'email' },
          { title: 'Perfil', sortable: false, align: 'center', key: 'is_admin' },
          { title: 'Ação', sortable: false, align: 'center', key: 'action' },
        ],
        desserts: [
          {
            id: 1,
            name: "Natã Romão",
            cpf: "03275325533",
            email: "madarap901@gmail.com",
            is_admin: 1,
            created_at: "2023-09-07 00:32:45",
          },
        ],
      }
    },
  }
</script>
