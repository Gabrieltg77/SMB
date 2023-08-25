<template>
  <div id="login" class="row container">
    <div class="input-field col s12 m6">
      <input id="Name" type="text" class="validate" v-model="name" />
      <label for="Name">Name</label>
    </div>

    <div class="input-field col s12 m6">
      <label for="phone">Telefone</label>
      <input type="tel" id="phone" class="validate" v-model="phoneNumber" v-mask="'(##) #####-####' || '(##) ####-####'"/>
    </div>
    
    <div class="input-field col s12 m6">
      <input id="email" type="email" class="validate" v-model="email" />
      <label for="email">Email</label>
    </div>
    <div class="col s12 m6">
      <label for="">Data de Nascimento</label>
      <input type="date" class="align-left"  v-model="birthDate" >
    </div>
    <div class="right-align">
    <button class="btn waves-effect waves-light red " @click="doRegister">
      Cadastrar
      <i class="material-icons right">send</i>
    </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      birthDate: "",
    };
  },
  methods: {
    doRegister() {
      axios
        .post("client", {
          name: this.name,
          phoneNumber: this.phoneNumber,
          email: this.email,
          birthDate: this.birthDate,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'usuario'});
        })
        .catch((error) => console.log(error));
      this.status = this.nome + " - " + this.senha;
    },
  },
  
};
</script>

<style>
#login{
    padding: 10px;
}

</style>