<template>
  <div>
    <crumb :query="$route.query"></crumb>
  </div>
</template>

<script>
  import Crumb from 'components/Crumb'

  export default {
    name: "StaffList",
    components: {
      Crumb
    }
  }

</script>

<style scoped>

</style>