<script>

  export default {
    name: 'SectionCards',
    props: {
        elements: Array
    }
  }
</script>

<template>
    <div class="row">
        <div v-for="element in elements" :key="element.id" class="card">
            <p><strong>Title: </strong>{{ element.title }}</p>
            <p><strong>Original title: </strong>{{ element.originalTitle }}</p>
            <p><strong>Language: </strong>{{ element.language }}</p>
            <p><strong>Vote: </strong>{{ element.vote }}</p>
        </div>
    </div>
  

</template>

<style lang="scss" scoped>
  .row {
    display: flex;
    flex-wrap: wrap;

    .card {
        flex-basis: 20%;
        padding: 1rem 0;
    }
  }
</style>