<template>
  <div>
    <div v-for="(pokemon, index) in pokemons" :key="index">
      <PokemonItem :pokemon="pokemon" :key="index" :index="index" />
    </div>

    <div class="buttons is-centered mt-6">
      <button
        class="button is-danger"
        :class="{ 'is-loading': isLoading }"
        :disable="isLoading"
        v-show="previous"
        @click="getPokemons(previous)"
      >
        Previous
      </button>

      <button
        class="button is-primary"
        :class="{ 'is-loading': isLoading }"
        :disable="isLoading"
        v-show="next"
        @click="getPokemons(next)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import PokemonItem from "@/components/pokemon/PokemonItem";

const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

export default {
  name: "PokemonList",
  components: {
    PokemonItem,
  },
  mounted() {
    let loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    this.getPokemons(DEFAULT_URL).finally(() => {
      loader.hide();
    });
  },
  data() {
    return {
      next: null,
      previous: null,
      pokemons: [],
      isLoading: false,
    };
  },
  methods: {
    getPokemons(url) {
      this.isLoading = true;
      return this.axios
        .get(url)
        .then(({ data }) => {
          const { next, previous, results } = data;
          this.next = next;
          this.previous = previous;
          return results;
        })
        .then((results) => {
          return Promise.all(
            results.map((pokemon) => {
              return this.axios.get(pokemon.url).then(({ data }) => data);
            })
          );
        })
        .then((pokemons) => {
          this.pokemons = pokemons;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
