//creating a vue app

const app = Vue.createApp({
  //data and functions
  data() {
    return {
      showBooks: true,
      url: "http://www.google.com/books",
      x: 0,
      y: 0,
      books: [
        {
          title: "name the widow",
          author: "Michael Smith",
          img: "assets/1.jpg",
          isFav: true,
        },
        {
          title: "the way of kings",
          author: "Brian white",
          img: "assets/2.jpg",
          isFav: false,
        },
        {
          title: "home",
          author: "lewis jedin",
          img: "assets/3.jpg",
          isFav: true,
        },
        {
          title: "blue roses",
          author: "Suzan Smith",
          img: "assets/4.jpg",
          isFav: false,
        },
      ],
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
    handleEvent(e, data) {
      console.log(e, e.type);
      if (data) {
        console.log(data);
      }
    },
    handlemousemove(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    toggleFav(book) {
      book.isFav = !book.isFav;
    },
  },

  computed: {
    filterBooks() {
      return this.books.filter((book) => book.isFav);
    },
  },
});

//telling the vue app which part of the app we want to use
app.mount("#app");
