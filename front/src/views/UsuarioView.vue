<template>
  <div class="row container">
    <div class="input-field col m12">
      <label for="nome">Nome ou Email</label> <input type="text" v-model="nome" />
          </div>
      <div class="col m12 right-align">
      <button @click="atualizar" class="waves-effect waves-light btn red" >
        buscar   <i class="Tiny material-icons" >search</i>
      </button>
    </div>
    <div class="col s6">
      <label for="dataInicio" >Data de Nascimento Inicial:</label>
  <input type="date" id="dataInicio" v-model="dataInicio" />
    </div>
    <div class="col s6">
  <label for="dataFim">Data de Nascimento Final:</label>
  <input type="date" id="dataFim" v-model="dataFim" />
</div>
<div class="col m12">
  <button @click="buscarDados" class="waves-effect waves-light btn  col m12 red">Buscar por data</button>
  </div>
    <table>
        <thead>
          <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Número de telefone</th>
              <th>Data de Nascimento</th>
              <th>Editar</th>
              <th>Excluir</th>
          </tr>
        </thead>

        <tbody v-for="(usuario, index) in usuarios" :key="index">
          <tr>
            <td> {{ usuario.name }}</td>
            <td> {{ usuario.email }}</td>
            <td>{{ usuario.phoneNumber }}</td>
            <td>{{ new Date(usuario.birthDate).getDate() }}/{{
          new Date(usuario.birthDate).getMonth() + 1
        }}/{{ new Date(usuario.birthDate).getFullYear()
        }}</td>
            <td><a class="btn-flat" @click="redirectToUpdatePage(usuario.id)"><i class="small material-icons">create</i></a></td>
            <td><button @click="deletarDados(usuario.id)" class="btn-flat"><i class="small material-icons">delete_forever</i></button></td>
          </tr>
        </tbody>
      </table>
      
     
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "usuarioView",
  data() {
    return {
      nome: "",
      dataInicio: "",
      dataFim: "",
      usuarios: [],
    };
  },
  methods: {
    atualizar() {
      var url = "client";
      if (this.nome) {
        url = "client?search=" + this.nome;
      }
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.usuarios = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarDados() {
    axios
      .get(`date-search?first=${this.dataInicio}&&last=${this.dataFim}`)
      .then((res) => {
        this.usuarios = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deletarDados(id) {
    axios
      .delete(`/client?id=${id}`)
      .then(() => {
        this.atualizar();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  redirectToUpdatePage(usuario) {
      this.$router.push({ name: 'update', params: { usuario: usuario } });
    },
  },
  created() {
    this.atualizar();
  },
};
</script>
