<template>
  <v-app-bar :elevation="3" class="px-5">
      <div class="app-bar">
        <h2>SESAB</h2>
        <img src="@/assets/sesab.png" :width="90"/>
      </div>
  </v-app-bar>
  <v-container>
    <HomeComponent />
  </v-container>
</template>

<script setup>
  import HomeComponent from '@/components/HomeComponent.vue'
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Jost:wght@400;700&display=swap');
  .app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  h2 {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    letter-spacing: 0.3em;
  }
</style>
