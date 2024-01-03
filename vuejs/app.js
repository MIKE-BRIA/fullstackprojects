//creating a vue app

const app = Vue.createApp({
  //data and functions
  data() {
    return {
      showBooks: true,
      title: "The Final Empire",
      author: "Joshua Blo",
      age: 35,
    };
  },
  methods: {
    changeTitle() {
      this.title = "Stranger Things";
    },
    increaseAge() {
      this.age++;
      console.log("Age increased to:", this.age);
    },
    resetData() {
      this.title = "The Final Empire";
      this.author = "Joshua Blo";
      this.age = 35;
      console.log("Data reset");
    },
    toggleShowBooks() {
      console.log("toggleShowBooks called");
      this.showBooks = !this.showBooks;
    },
    handleEvent(e) {
      console.log(e, e.type);
    },
  },
});

//telling the vue app which part of the app we want to use
app.mount("#app");
