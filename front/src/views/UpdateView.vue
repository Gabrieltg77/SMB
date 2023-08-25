<template>
  <div id="login" class="row container">
    <div class="col s6 m6">
          <label for="Name">Name</label>
      <input :value="user.name" id="Name" class="validate" type="text" @input="updateTempName" />
    </div>

    <div class="col s6 m6">
      <label for="phone">Telefone</label>
      <input :value="user.phoneNumber" type="tel" id="phone" class="validate" @input="updateTempPhone" v-mask="'(##) #####-####' || '(##) ####-####'"/>
    </div>
    
    <div class="col s6 m6">
          <label for="email">Email</label>
      <input :value="user.email" id="email" type="email" class="validate" @input="updateTempEmail"/>

    </div>
    <div class="col s6 m6">
      <label for="">Data de Nascimento</label>
      <input :value="user.birthDate" type="date" class="align-left" @input="updateTempBirth">
    </div>
    <div class="right-align">
    <button class="btn waves-effect waves-light red " @click="doUpdate">
      Atualizar
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
      user: {},
      name: "",
      phoneNumber: "",
      email: "",
      birthDate: "",
    };
  },
  methods: {
    doUpdate() {
      axios
        .put("client", {
          id: this.user.id,
          name: this.name != "" ? this.name: this.user.name,
          phoneNumber: this.phoneNumber != "" ? this.phoneNumber: this.user.phoneNumber,
          email: this.email != "" ? this.email: this.user.email,
          birthDate: this.birthDate != "" ? this.birthDate: this.user.birthDate,
        })
        .then(() => {
          this.$router.push({ name: 'usuario'});
        })
        .catch((error) => console.log(error));
    },
     updateTempName(event) {
      this.name = event.target.value;
    },
    updateTempEmail(event) {
      this.email = event.target.value;
    },
    updateTempBirth(event) {
      this.birthDate = event.target.value;
    },
    updateTempPhone(event) {
      this.phoneNumber = event.target.value;
    },
  },
  mounted() {
    axios
      .get(`/id?id=${this.$route.params.usuario}`)
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
#login{
    padding: 10px;
}

</style>