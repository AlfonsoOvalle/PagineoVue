<template>
    <div class="not-found">
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <router-link to="/">Volver al Panel</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 2rem;
    color: #d9534f;
  }
  
  p {
    margin: 20px 0;
  }
  </style>