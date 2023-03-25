import { defineStore } from "pinia";

export const usePoemStore = defineStore("poemStore", {
  state: () => ({
    poemList: [],
    favoritePoemsList: [],
  }),
  actions: {
    addFavorite(selectedPoem) {
      if (
        !this.favoritePoemsList.some(
          (poem) => poem.title === selectedPoem.title
        )
      ) {
        this.favoritePoemsList.push(selectedPoem);
        this.poemList = this.poemList.filter(
          (poem) => poem.title !== selectedPoem.title
        );
      }
    },
    removeFavorite(selectedPoem) {
      const index = this.favoritePoemsList.findIndex(
        (poem) => poem.title === selectedPoem.title
      );
      if (index > -1) {
        this.favoritePoemsList.splice(index, 1);
        this.poemList.push(selectedPoem);
      }
    },
  },
});
