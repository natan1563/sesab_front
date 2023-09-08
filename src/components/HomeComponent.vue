<template>
  <FilterComponent
    @update-results="setFilteredUsers"
  />

  <section v-if="desserts.length" class="pt-5">
    <v-divider class="my-5"/>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="desserts"
      item-value="name"
      class="elevation-1 mt-5"
      items-per-page-text="Itens por página"
      page-text="{0}-{1} de {2}"
      :items-per-page-options="[
        { value: 5, title: '5', },
        { value: 10, title: '10' },
        { value: 15, title: '15' },
        { value: 30, title: '30' },
        { value: -1, title: 'Todos' },
      ]"
    >
      <template #item.created_at="{item}">
        {{ formatDate(item.raw.created_at) }}
      </template>

      <template #item.is_admin="{item}">
        {{ item.raw.is_admin == 1 ? 'ADM' : 'USER' }}
      </template>

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
                @click="showUpdateModal(item.raw)"
              ></v-btn>
            </v-col>

           <v-col cols="2">
              <v-btn
                density="comfortable"
                icon="mdi-delete"
                @click="showDeleteModal(item.raw)"
              ></v-btn>
              <DeleteModal />
          </v-col>
        </v-row>
      </template>
    </v-data-table>

  </section>
</template>

<script>
  import FilterComponent from './FilterComponent.vue'
  import DeleteModal from './modal/DeleteModal.vue'

  import { VDataTable } from 'vuetify/labs/VDataTable'
  import { format } from 'date-fns'

  export default {
    components: {
      FilterComponent,
      VDataTable,
      DeleteModal
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
        desserts: [],
      }
    },

    methods: {
      setFilteredUsers(users) {
        if (users && users.length) {
          this.desserts = users
        }
      },
      formatDate(date) {
        console.log(date)
        return format(new Date(date), 'dd/MM/yyyy')
      },
      showDeleteModal(currentUserData) {
        this.$eventBus.emit('delete-modal', currentUserData)
      },
      showUpdateModal(currentUserData) {
        this.$eventBus.emit('form-modal', currentUserData)
      }
    },
  }
</script>
