<template>
  <div class="block">
    <h1>click me</h1>
  </div>
</template>

<script>
export default {
  props: ["delay"],
};
</script>

<style>
.block {
  width: 15rem;
  border-radius: 20px;
  background: #0faf87;
  color: white;
  text-align: center;
  padding: 100px;
  margin: 40px auto;
}
button {
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
}
</style>
