<template>
  <div>
    <div>
      <h1>Actividades economicas</h1>
      <div style="overflow: auto;">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Codigo Actividad</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lstActividadesEconomicas" :key="item.codigoActividadEconomica">
              <td>{{ (paginaActual * itemsXpagina) + (index + 1) }}</td>
              <td>{{ item.codigoActividadEconomica }}</td>
              <td>{{ item.descripcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px;">
        <div>
          <span class="detallePagineo">
            <strong>{{ totalItems }}</strong> Registros encontrados <strong>|</strong> Pagina
            <strong>{{ paginaActual + 1 }}</strong> de <strong>{{ totalPaginas }}</strong>
          </span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin: 10px; gap: 5px;">
          <button class="mi-boton2" @click="pagineo(paginaActual = 0)" :disabled="paginaActual == 0">&lt;&lt;</button>
          <button class="mi-boton" @click="pagineo(paginaActual--)"
            :disabled="paginaActual == 0">Anterior&nbsp;</button>
          <button class="mi-boton" @click="pagineo(paginaActual++)"
            :disabled="(paginaActual + 1) == totalPaginas">Siguiente</button>
          <button class="mi-boton2" @click="pagineo(paginaActual = totalPaginas - 1)"
            :disabled="paginaActual == totalPaginas - 1">&gt;&gt;</button>
        </div>
      </div>
    </div>

    <div>
      <h1>Clientes</h1>
      <input type="text" class="mi-input" placeholder="buscar cliente" id="inputFiltro" v-model="nombreCliente" @input="filtrarCliente">
      <div style="overflow: auto;">
        <table id="miTabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>direccion</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lstClientes" :key="item.id">
              <td>{{ (paginaActualCliente * itemsXpaginaCliente) + (index + 1) }}</td>
              <td>{{ item.id }}</td>
              <td><span v-html="highlightMatch(item.nombre)"></span></td>
              <td>{{ item.direccion }}</td>
              <td>{{ item.telefono }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 15px;">
        <div>
          <span class="detallePagineo">
            <strong>{{ totalItemsCliente }}</strong> Registros encontrados <strong>|</strong> Pagina
            <strong>{{ paginaActualCliente + 1 }}</strong> de <strong>{{ totalPaginasCliente }}</strong>
          </span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin: 10px; gap: 5px;">
          <button class="mi-boton2" @click="pagineoCliente(paginaActualCliente = 0)"
            :disabled="paginaActualCliente == 0">&lt;&lt;</button>
          <button class="mi-boton" @click="pagineoCliente(paginaActualCliente--)"
            :disabled="paginaActualCliente == 0">Anterior&nbsp;</button>
          <button class="mi-boton" @click="pagineoCliente(paginaActualCliente++)"
            :disabled="(paginaActualCliente + 1) == totalPaginasCliente">Siguiente</button>
          <button class="mi-boton2" @click="pagineoCliente(paginaActualCliente = totalPaginasCliente - 1)"
            :disabled="paginaActualCliente == totalPaginasCliente - 1">&gt;&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { obtenerActividadesEconomicas, obtenerClientes } from '@/servicios/apiService';

export default {

  data() {
    return {
      lstActividadesEconomicas: [],

      totalPaginas: 1,
      paginaActual: 0,
      itemsXpagina: 15,
      totalItems: 0,

      lstClientes: [],
      totalPaginasCliente: 1,
      paginaActualCliente: 0,
      itemsXpaginaCliente: 15,
      totalItemsCliente: 0,

      nombreCliente: ''
    }
  },

  methods: {
    async obtenerActividadesEconomicas(pagina = 0, itemsXpagina = 10) {
      const respuestaServicio = await obtenerActividadesEconomicas(pagina, itemsXpagina)
      if (respuestaServicio) {
        this.totalItems = respuestaServicio.totalItems
        this.paginaActual = respuestaServicio.currentPage
        this.totalPaginas = respuestaServicio.totalPages
        this.lstActividadesEconomicas = respuestaServicio.data
      }
    },
    async pagineo() {
      this.obtenerActividadesEconomicas(this.paginaActual, this.itemsXpagina)
    },
    async pagineoCliente() {
      this.obtenerClientes(this.paginaActualCliente, this.itemsXpaginaCliente, this.nombreCliente)
    },
    async obtenerClientes(pagina = 0, itemsXpagina = 10, filtro = "") {
      const respuestaServicio = await obtenerClientes(pagina, itemsXpagina, filtro.trim())
      if (respuestaServicio) {
        this.totalItemsCliente = respuestaServicio.totalItems
        this.paginaActualCliente = respuestaServicio.currentPage
        this.totalPaginasCliente = respuestaServicio.totalPages
        this.lstClientes = respuestaServicio.data
      }
    },
    filtrarCliente() {
      this.obtenerClientes(0, this.itemsXpaginaCliente, this.nombreCliente)
    },
    highlightMatch(nombre) {
      const regex = new RegExp(`(${this.nombreCliente})`, 'gi');
      return nombre.replace(regex, '<strong>$1</strong>');
    },

  },
  mounted() {
    this.obtenerClientes(0, this.itemsXpaginaCliente, "")
  },
  name: 'ProductosComponent',
};
</script>

<style>
#miTabla strong {
  background-color: #c3dbff; /* Cambia el color según tu preferencia */
}
</style>