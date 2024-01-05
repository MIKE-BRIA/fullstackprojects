<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Welcome ...</p>
    <teleport to=".modals" v-if="showModal">
      <Modal :header="header" :text="text" theme="sale" @close="toggleModal">
        <template v-slot:link>
          <a href="#">Sign up</a>
          <a href="#">more info</a>
        </template>
        <h1>Give away</h1>
        <p>First come</p>
      </Modal>
    </teleport>
    <button @click.alt="toggleModal" class="btn">Open Modal(alt)</button>
    <div>
      <input type="text" ref="name" />
      <button @click="handleClick">Click me</button>
    </div>

    <!----- Another Modal like a component------>
    <teleport to=".modals" v-if="showModalTwo">
      <Modal @close="toggleModalTwo">
        <h1>Give away Food for the Poor Guys</h1>
        <p>First come always first serve</p>
      </Modal>
    </teleport>
    <button @click="toggleModalTwo" class="btn">Open Modal</button>
  </div>
</template>

<!---- the script / javascript side ---->

<script>
import Modal from "./components/Modal";

export default {
  name: "App",
  components: { Modal },
  data() {
    return {
      title: "Welcome to vue once more",
      header: "Am going to be good at this",
      text: "You gotta put in the work !!",
      showModal: false,
      showModalTwo: false,
    };
  },
  methods: {
    handleClick() {
      console.log(this.$refs.name);
      this.$refs.name.classList.add("active");
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModalTwo() {
      this.showModalTwo = !this.showModalTwo;
    },
  },
};
</script>

<!---- css styling ----->

<style>
#app,
.modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  border-bottom: 3px solid #c9c5c5;
  display: inline-block;
  padding-bottom: 10px;
}

.btn {
  margin: 2rem;
}
</style>
