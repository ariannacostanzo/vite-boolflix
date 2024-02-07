<script>
  export default {
    name: 'SectionTitle',
    props: {title: String}
  }
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      background-color: #e5e5e5;
      width: 7%;
      height: 2px;
      left: 0;
      top: 110%;
    }
  }
</style>