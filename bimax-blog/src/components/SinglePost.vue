<template>
  <div>
    <h3>{{ post.title }}</h3>
    <p>{{ snippet }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["post"],
  setup(props) {
    const snippet = computed(() => {
      // Check if post and post.body are defined before accessing properties
      if (props.post && props.post.body) {
        return props.post.body.substring(0, 9) + "....";
      } else {
        return props.post; // Handle the case where post or post.body is null or undefined
      }
    });

    return { snippet };
  },
};
</script>

<style></style>
