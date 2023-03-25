import axios from "axios";

export default {
  async getRandomPoems() {
    try {
      const res = await axios.get("https://poetrydb.org/random/20");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  async getPoemLines(selectedPoem) {
    try {
      const res = await axios.get(
        `https://poetrydb.org/lines/${selectedPoem.title};${selectedPoem.author}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
