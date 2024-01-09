<template>
  <div>
    <div class="postlist">
      <div v-for="post in posts" :key="post.id">
        <SinglePost :post="post"></SinglePost>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import SinglePost from "./SinglePost.vue";
export default {
  name: "PostList",
  components: { SinglePost },
  props: ["posts"],
  setup(props) {
    onMounted(() => {});
  },
};
</script>

<style></style>
