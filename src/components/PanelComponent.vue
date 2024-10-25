<template>
    <div>
      <h1>Panel</h1>
      <nav>
        <router-link to="/productos">Ir a Productos</router-link>
        <router-link to="/servicios">Ir a Servicios</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PanelComponent',
  };
  </script>


<style scoped>
.panel {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

h1 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav a {
  padding: 10px 20px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #0056b3;
}

.router-view {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>