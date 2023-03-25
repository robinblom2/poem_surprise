<template>
  <div class="app-container">
    <div class="btn-container">
      <button class="fetch-btn" role="button" @click="fetchPoems">
        Fetch Poems
      </button>
      <select class="filter-select" @change="filterPoems($event)">
        <option value="" selected disabled>Sort poems by...</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
    </div>
    <div class="poems-container" v-if="this.poemStore.poemList.length > 0">
      <div class="poem-list-container">
        <PoemList
          :listTitle="'Poems:'"
          :poems="poemStore.poemList"
          :listName="poems"
        />
      </div>
      <div
        class="poem-list-container"
        v-if="this.poemStore.favoritePoemsList.length > 0"
      >
        <PoemList
          :listTitle="'Favorites:'"
          :poems="poemStore.favoritePoemsList"
          :listName="favorites"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/Api";
import PoemList from "./components/PoemList.vue";
import { usePoemStore } from "./stores/PoemStore";

export default {
  name: "App",
  components: {
    PoemList,
  },
  setup() {
    const poemStore = usePoemStore();
    const poems = "";
    const favorites = "";
    return { poems, favorites, poemStore };
  },
  methods: {
    async fetchPoems() {
      this.poemStore.poemList = await api.getRandomPoems();
    },
    filterPoems(event) {
      if (event.target.value === "title") {
        this.poemStore.poemList.sort((a, b) => a.title.localeCompare(b.title));
      } else if (event.target.value === "author") {
        this.poemStore.poemList.sort((a, b) =>
          a.author.localeCompare(b.author)
        );
      }
    },
  },
};
</script>

<style>
body {
  background-image: url("./assets/img/bg4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.app-container {
  padding: 1rem;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
}
.poems-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.fetch-btn {
  width: 150px;
  background-color: #fff;
  color: #41403e;
  cursor: pointer;
  font-size: 1rem;
  line-height: 23px;
  padding: 0.5rem;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  font-family: "Esteban", serif;
}

.fetch-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.fetch-btn:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}

.filter-select {
  padding: 5px;
  border-radius: 2px;
  margin-left: 2rem;
  margin-right: 1rem;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Esteban", serif;
}

/* For tablets: */
@media only screen and (max-width: 750px) {
  .poems-container {
    flex-direction: column;
  }
  html,
  body {
    margin: 0;
    height: 100vh;
    overflow: auto;
  }
}
</style>
