<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text: '',
    }),

    mounted () {
      this.$eventBus.on('active-snackbar', (text) => {
        this.snackbar = true;
        this.text = text;
      });
    },

    destroyed () {
      this.$eventBus.off('active-snackbar');
    },
  }
</script>
