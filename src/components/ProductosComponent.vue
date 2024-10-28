<template>
  <div>


    <div class="px-8 py-6 ">
      <h1 class="text-4xl">Clientes</h1>
      <input type="text" class="mi-input" placeholder="buscar cliente" id="inputFiltro" v-model="nombreCliente"
        @input="filtrarCliente">
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
            :disabled="paginaActualCliente === 0 ? true : false">&lt;&lt;</button>
          <button class="mi-boton" @click="pagineoCliente(paginaActualCliente--)"
            :disabled="paginaActualCliente == 0">Anterior&nbsp;</button>
          <input type="number" style="width: 85px; text-align: center;  border-radius: 5px; font-size: 20px;"
            placeholder="buscar cliente" id="inputPagina" v-model="numPaginaSeleccionada" @keyup.enter="cambiarPagina"
            min="1">
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

      nombreCliente: '',
      numPaginaSeleccionada: 1,

      habilitarBtnPrimerR: false,
      habilitarBtnUltimoR: false

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
      try {
        const respuestaServicio = await obtenerClientes(pagina, itemsXpagina, filtro.trim())
        console.log("-->", respuestaServicio)
        if (respuestaServicio) {
          if (respuestaServicio.totalPages <= pagina) {
            this.paginaActualCliente = pagina
          } else {
            this.paginaActualCliente = respuestaServicio.currentPage
          }
          this.totalItemsCliente = respuestaServicio.totalItems
          //this.paginaActualCliente = respuestaServicio.currentPage
          this.totalPaginasCliente = respuestaServicio.totalPages
          this.lstClientes = respuestaServicio.data
        }
      } catch (error) {
        console.log("Sin datos")
      }


    },
    filtrarCliente() {
      this.obtenerClientes(0, this.itemsXpaginaCliente, this.nombreCliente)
    },
    highlightMatch(nombre) {
      const regex = new RegExp(`(${this.nombreCliente})`, 'gi');
      return nombre.replace(regex, '<strong>$1</strong>');
    },
    cambiarPagina() {
      this.obtenerClientes(this.numPaginaSeleccionada - 1, this.itemsXpaginaCliente, this.nombreCliente)
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
  background-color: #c3dbff;
  /* Cambia el color según tu preferencia */
}
</style>