<template>
  <div v-if="selectedPoem" class="poem-details-container">
    <span
      class="favorite-icon-container"
      @click="addOrRemoveFavorite(selectedPoem)"
    >
      <font-awesome-icon
        v-if="isFavorite"
        class="favorite-icon"
        :icon="['fas', 'heart']"
      />
      <font-awesome-icon
        v-else
        class="favorite-icon"
        :icon="['far', 'heart']"
      />
    </span>

    <h2 class="poem-title">{{ selectedPoem.title }}</h2>
    <h3 class="poem-author">{{ selectedPoem.author }}</h3>
    <ul class="poemline-list">
      <li
        class="poemLine"
        v-for="(line, index) in poemLines"
        :key="'line' + index"
      >
        {{ line }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { usePoemStore } from "../stores/PoemStore";

export default {
  name: "PoemDetails",
  props: {
    selectedPoem: Object,
    listName: String,
  },
  data() {
    return {
      poemLines: [],
    };
  },
  computed: {
    isFavorite() {
      return this.poemStore.favoritePoemsList.some(
        (p) => p.title === this.selectedPoem.title
      );
    },
  },
  methods: {
    fetchPoemLines() {
      if (!this.selectedPoem) {
        return;
      }
      axios
        .get(`https://poetrydb.org/title/${this.selectedPoem.title}`)
        .then((response) => {
          this.poemLines = response.data[0].lines;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addOrRemoveFavorite(selectedPoem) {
      if (this.isFavorite) {
        this.poemStore.removeFavorite(selectedPoem);
      } else {
        this.poemStore.addFavorite(selectedPoem);
      }
    },
  },
  watch: {
    selectedPoem(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchPoemLines();
      }
    },
  },
  setup() {
    const poemStore = usePoemStore();
    return { poemStore };
  },
};
</script>

<style scoped>
.poem-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.poemline-list {
  padding: 0;
}
.poemLine {
  list-style-type: none;
}

.icon-container {
  margin-left: auto;
  cursor: pointer;
}

.favorite-icon {
  display: inline-block;
  height: 2rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 3.5rem;
  transform: scale(1);
  transition: all ease 0.3s;
  color: red;
  cursor: pointer;
}
.favorite-icon:hover {
  transform: scale(1.15);
}

.favorite-icon-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
