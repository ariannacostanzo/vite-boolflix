<script>
  export default {
    name: 'AppHeader'
  }
</script>

<template>
    <header>
        <h1>Boolflix</h1>
        <form>
            <input type="text">
            <button>Cerca</button>
        </form>
    </header>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;

  }
</style>