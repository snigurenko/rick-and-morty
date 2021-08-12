<template lang='pug'>
div
  router-link(to='/message') Message / 
  router-link(to='/history') History
  
</template>

<script>

export default {
  name: 'Header',

}
</script>
