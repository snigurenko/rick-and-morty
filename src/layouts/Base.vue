
<template lang="pug">
.base-layout-wrapper
  Header
  main.main
    router-view
</template>

<script lang="ts">
import { defineComponent} from "vue";

import Header from "../components/Header.vue";

export default defineComponent({
  name: "BaseLayout",
  components: {
    Header,
  },
})
</script>

<style scoped lang="scss">
.base-layout-wrapper {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  width: 100%;
  height: 100%;

  padding: 0;
  margin: 0;

  background-color: var(--app-ui-bg-white);

  .main {
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: center;

    padding: 20px;

    width: 100%;
    max-width: 500px;
    height: 100%;

    overflow-y: auto;
  }

  @media (max-width: 480px) {
    .main {
      min-width: 380px;
    }
  }
}
</style>
