<template>
  <div class="container">
    <h2 class="poem-title">{{ this.listTitle }}</h2>
    <div class="poem-wrapper">
      <ul class="poem-list" v-if="this.poemStore.poemList">
        <li
          class="poem"
          v-for="(poem, index) in poems"
          :key="'poem' + index"
          @click="selectPoem(poem)"
        >
          <a class="card" href="#">
            <h3>{{ poem.title }}</h3>
            <p>{{ poem.author }}</p>
          </a>
        </li>
      </ul>
      <PoemDetailsModal
        :selectedPoem="selectedPoem"
        :showModal="showModal"
        :listName="listTitle.toLowerCase()"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import PoemDetailsModal from "./PoemDetailsModal.vue";
import { usePoemStore } from "../stores/PoemStore";

export default {
  name: "PoemList",
  components: {
    PoemDetailsModal,
  },
  data() {
    return {
      selectedPoem: null,
      showModal: false,
    };
  },
  props: {
    listTitle: String,
    poems: Array,
  },
  setup() {
    const poemStore = usePoemStore();
    return { poemStore };
  },
  methods: {
    selectPoem(poem) {
      this.selectedPoem = poem;
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Esteban", serif;
}

.poem {
  margin: 10px;
  border-radius: 5px;
  list-style: none;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background-color: rgb(185, 129, 45);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.poem-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: rgba(146, 127, 105, 0.185);
  border-radius: 25px;
  width: 80%;
  border: 1px solid rgb(0, 0, 0);
}

.poem-title {
  color: rgb(247, 236, 236);
  font-size: 30px;
}

.card {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}
.card:hover {
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #cccccc;
  background-color: white;
}
.card:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #000000;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}
.card:hover:before {
  transform: scale(2.15);
}

@import url("https://fonts.googleapis.com/css2?family=Esteban&family=Roboto:wght@500&display=swap");

/* For tablets: */
@media only screen and (max-width: 750px) {
  .container {
    width: 100vw;
    align-items: flex-start;
  }
  .poem-list {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 5px;
  }
  .poem-wrapper {
    width: 100vw;
  }
  .poem {
    width: auto;
  }
}
</style>
