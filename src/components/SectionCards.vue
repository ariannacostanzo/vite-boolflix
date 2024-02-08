<script>
import ElementCard from './ElementCard.vue'
export default {
    name: 'SectionCards',
    components: {ElementCard},
    props: {
        elements: Array
    }
}
</script>

<template>
    <div class="row">
        <ElementCard v-for="element in elements" :key="element.id" :element="element"/>
    </div>
</template>

<style lang="scss" scoped>
.row {
    padding: 0 8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    color: white;

    
}
</style>