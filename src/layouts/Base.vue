
<template lang="pug">
.base-layout-wrapper
  Header
  main.main
    router-view
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import { useStore } from "vuex";

import Header from "../components/Header.vue";




export default defineComponent({
  name: "BaseLayout",
  components: {
    Header,
  },
});
</script>


<style scoped lang="scss">
.base-layout-wrapper {
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column;

  width: 100%;
  height: 100%;

  padding: 0;
  margin: 0;

  background-color: var(--app-ui-bg-light);

  .main {
    position: relative;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column;

    padding-left: var(--app-aside-width);

    width: 100%;
    height: 100%;

    overflow: hidden;
  }
}
</style>
