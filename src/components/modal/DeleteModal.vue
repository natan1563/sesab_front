<template>
    <v-dialog
      v-model="deleteDialog"
      activator="parent"
      width="auto"
    >
      <v-card v-if="currentUser">
        <v-card-title  class="text-h5 pa-5">
         Tem certeza que deseja excluir usuário do CPF: {{ currentUser?.cpf }}?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="text"
            @click="deleteUser(currentUser?.id)"
          >
            Continuar
          </v-btn>
          <v-btn
            color="secondary"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { UserService } from '@/services/UserService'
  const userServiceInstance = new UserService()

  export default {
    data() {
      return {
        deleteDialog: false,
        currentUser: null
      }
    },

    mounted () {
      this.$eventBus.on('delete-modal', (userData) => {
        this.currentUser = userData
      })
    },

    methods: {
      deleteUser(id) {
        userServiceInstance.deleteUser(id)
        .then(() => {
          this.$eventBus.emit('refresh-search')
          this.deleteDialog = false
        })
      },
    },
  }
</script>
