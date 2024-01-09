<template>
  <div class="home">
    <h1>Home</h1>
    <PostList :posts="posts"></PostList>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import { ref } from "vue";

export default {
  name: "HomeView",
  components: { PostList },
  setup() {
    const posts = ref([
      {
        title: "Welcome to the blog post",
        body: "lorem ipsum dolor sit amet, consectetur",
        id: 1,
      },
      {
        title: "It's not the easiest thing to do",
        body: "lorem ipsum dolor sit amet",
        id: 2,
      },
      {
        title: "Just another day looking for meaning",
        body: "lorem ipsum dolor sit amet",
        id: 3,
      },
    ]);

    return { posts };
  },
};
</script>
