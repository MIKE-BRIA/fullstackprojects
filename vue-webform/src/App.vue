<template>
  <div>
    <Signup></Signup>
  </div>
</template>

<script>
import Signup from "./components/Signup";

export default {
  name: "App",
  components: { Signup },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  background: #eee;
  height: 100vh;
}
</style>
