<template>
  <div>
    <h1>Ninja Reaction Timer</h1>
    <button @click="start" :disabled="isPlaying">Play</button>
    <!----- Block ---->
    <Block v-if="isPlaying" :delay="delay" @end="endGame"></Block>
    <!---- Results --->
    <Results v-if="showresults" :score="score"></Results>
  </div>
</template>

<script>
import Block from "./components/Block";
import Results from "./components/Results";

export default {
  name: "App",
  components: { Block, Results },
  data() {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showresults: false,
    };
  },
  methods: {
    start() {
      this.delay = 2000 + Math.random() * 4000; //random number of seconds btwn 2seconds and 5seconds
      this.isPlaying = true;
      this.showresults = false;
      console.log(this.delay);
    },
    endGame(reactionTime) {
      this.score = reactionTime;
      this.isPlaying = false;
      this.showresults = true;
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
  color: #444;
  margin-top: 60px;
}

button {
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  background: cadetblue;
  border: none;
  cursor: pointer;
  letter-spacing: 1px;
}

button[disabled] {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
