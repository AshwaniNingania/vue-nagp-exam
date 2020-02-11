<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="/"><img class="app_logo" src="../assets/logo.png"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <!-- Right aligned nav items -->
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item right disabled>{{username}}</b-nav-item>
            <!-- <b-nav-item right><router-link to="/"><b>Dashboard</b></router-link></b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
/**
 * Nav bar of application.
 * login/logout disabled
 */
export default {
    name: 'NavBar',
    computed: {
      username() {
        return this.$store.getters["username"];
      }
    }
}
</script>

<style>
a {
    color: #825b5b;
}
.app_logo {
    height: 40px;
}
.user_img {
  height: 30px;
  width: 30px;
  border-radius: 20px;
  margin-right: 3px;
}
</style>