<template>
  
  <nav>
    <div class="nav-wrapper red">
      <ul id="nav-mobile" class="left hide-on-med-and-down"><router-link to="/">Home</router-link></ul>
        <ul class="left hide-on-med-and-down"> <router-link to="/">Usuario</router-link></ul>
       <ul class="left hide-on-med-and-down"><router-link to="/cadastro">Cadastro</router-link></ul>
    </div>
  </nav>

  <router-view/>

</template>
