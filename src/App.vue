// as it's a test project, I decided to show how it possible to use Base layout to keep app.vue file simpler 
// purpose id DRY (don't repeat  yourself)

<template lang='pug'>
router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');

:root {
  --app-ui-bg-white: #ffffff;
  --app-ui-bg-white-1: #FAFFFD;

  --app-ui-darkblue: #324B72;

  --app-ui-blue-1: #4EADC5;
  --app-ui-blue-: #0099cc;

  --app-ui-red-1: #DE212B;

  --app-ui-green: #50C878;
  
  --app-ui-lightgrey: #E0E0E0;
  --app-ui-grey-1: #F4F4F4;
  --app-ui-grey-2: #D6DBE4;
  --app-ui-grey-3: #C4C4C4;



  --app-mobile-width: 480px;
}

* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  
  display: inline;

  width: 100%;
  height: 100%;

  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--app-ui-darkblue);
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

</style>
