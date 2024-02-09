<script>
import ElementCard from './ElementCard.vue'
  export default {
    name: 'MainSection',
    components: {ElementCard},
    props: {title:String, elements: Array}
  }
</script>

<template>

    <h1>{{ title }}</h1>
    <div class="row">
        <ElementCard v-for="element in elements" :key="element.id" :element="element" :type="title"/>
    </div>

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
      width: 100px;
      height: 2px;
      left: 0;
      top: 110%;
    }
  }

  .row {
    padding: 0 8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    color: white;

    
}
</style>