<template>
  <div>
    <router-link
      :to="{
        name: 'detail',
        params: { pokename: pokemon.name, url: pokemon.url },
      }"
    >
      <div
        class="
          pokebox
          is-flex is-justify-content-space-between is-align-items-center
          mt-2
          py-3
          px-5
          box
        "
      >
        <span class="pokename title m-0 is-4"
          >{{ pokemon.id }}. {{ uppercaseName }}</span
        >
        <img :src="pokemon.sprites.front_default" /></div
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "PokemonItem",
  props: ["pokemon", "index"],
  computed: {
    uppercaseName() {
      return this.pokemon.name.toUpperCase();
    },
  },
};
</script>

<style>
</style>
