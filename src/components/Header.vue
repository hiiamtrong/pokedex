<template>
  <div>
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <v-icon
            :width="'40px'"
            :height="'40px'"
            name="pokeball"
            class="mr-2"
          ></v-icon>
          <span class="header__title">PokeDex</span>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <a class="navbar-item" href="https://pokeapi.co/" target="_blank">
              Pokeapi.co
            </a>
          </div>
          <div class="navbar-item">
            <a
              class="navbar-item has-text-dark is-flex is-align-items-center"
              href="https://github.com/hiiamtrong"
              target="_blank"
              >Github<v-icon class="ml-2" name="github" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach((el) => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  },
};
</script>

<style>
.header__title,
.navbar-burger {
  color: #eb4d4b !important;
  font-size: 1.5em;
  font-weight: bold;
}
.navbar {
  background-color: #ecf0f1 !important;
}
</style>
