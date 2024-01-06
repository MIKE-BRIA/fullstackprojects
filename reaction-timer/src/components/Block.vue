<template>
  <div class="block" v-if="showBlock" @click="stopTimer">
    <h1>click me</h1>
  </div>
</template>

<script>
export default {
  props: ["delay"],
  data() {
    return {
      showBlock: false,
      timer: null,
      reactionTime: 0,
    };
  },
  mounted() {
    console.log("component mounted");
    setTimeout(() => {
      this.showBlock = true;
      this.startTimer();
    }, this.delay);
  },
  methods: {
    //start timer function
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10;
      }, 10);
    },
    //function that stop timer when the block is clicked
    stopTimer() {
      clearInterval(this.timer);
      //emiting the reaction time to parent(App.vue)
      this.$emit("end", this.reactionTime);
    },
  },
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
</style>
