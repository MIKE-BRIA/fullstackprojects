<template>
  <div class="block">
    <h1>Reaction Time : {{ score }} ms</h1>
    <p>{{ rank }}</p>
  </div>
</template>

<script>
export default {
  //prop from Parent (App.vue)
  props: ["score"],
  data() {
    return {
      rank: null,
    };
  },
  mounted() {
    if (this.score < 450) {
      this.rank = "Ninja fingers";
    } else if (this.score < 700) {
      this.rank = "That's a good one";
    } else {
      this.rank = "Are you a slow thinker mate";
    }
  },
};
</script>

<style>
p {
  font-size: 1.7rem;
  color: rgb(155, 33, 192);
}
</style>
