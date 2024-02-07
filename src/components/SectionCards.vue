<script>

  export default {
    name: 'SectionCards',
    props: {
        elements: Array
    }
  }
</script>

<template>
    <div v-if="elements.length >= 20" class="row">
        <div v-for="element in elements" :key="element.id" class="card">
            <p>{{ element.title }}</p>
            <p> {{ element.original_title }}</p>
            <p>{{ element.language }}</p>
            <p> {{ element.vote }}</p>
        </div>
    </div>
  

</template>

<style scoped>
  /* style here */
</style>