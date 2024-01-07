<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'jobs' }">Jobs</router-link>
    </div>

    <button @click="redirect">Redirect</button>
    <button @click="back">Go back</button>
    <button @click="forward">Go forward</button>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    //redirect by pushing on a new route
    redirect() {
      this.$router.push({ name: "home" });
    },
    //going back through the history
    back() {
      this.$router.go(-1);
    },
    //going forward through the history
    forward() {
      this.$router.go(1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0;
  border-bottom: 1px solid #2c3e50;
  max-width: 60%;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 2rem;
  /* margin-bottom: 0; */
}

#nav a.router-link-exact-active {
  color: #42b983;
  background: crimson;
  padding: 0.4rem;
  border: none;
  border-radius: 10px;
}
button {
  margin: 15px 10px;
  padding: 9px;
  border: none;
  border-radius: 7px;
}

body {
  max-width: 80%;
  margin: auto;
}
</style>
