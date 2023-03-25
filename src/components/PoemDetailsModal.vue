<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <PoemDetails :selectedPoem="selectedPoem" :listName="listName" />
    </div>
    <button
      class="close-modal-btn is-large"
      aria-label="close"
      @click="$emit('close')"
    >
      x
    </button>
  </div>
</template>

<script>
import PoemDetails from "./PoemDetails.vue";

export default {
  name: "PoemDetailsModal",
  components: {
    PoemDetails,
  },
  props: {
    selectedPoem: Object,
    listName: String,
    showModal: Boolean,
  },
  watch: {
    showModal: function () {
      if (this.showModal) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
}
.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content {
  background-color: white;
  padding: 3rem;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
  max-width: 1000px;
}
.close-modal-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #bfbfbf;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

/* For tablets: */
@media only screen and (max-width: 750px) {
  .modal-content {
    max-width: 250px;
    max-height: 250px;
  }
}
</style>
