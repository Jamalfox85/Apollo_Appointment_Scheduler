<template>
  <n-drawer v-model:show="modalState" :width="500" placement="left" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Delete Event</h2>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this event?</p>
        <n-button type="error" @click="deleteEvent"> Delete </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { useStore } from "../../stores/store";
import { VueFinalModal } from "vue-final-modal";
import { NButton, NDrawer, NDrawerContent } from "naive-ui";

export default {
  components: { VueFinalModal, NButton, NDrawer, NDrawerContent },
  props: ["show", "event"],
  data() {
    return {
      model: {
        title: null,
        service: null,
        client: null,
        paid: false,
        notes: null,
      },
    };
  },
  computed: {
    modalState() {
      return this.show;
    },
  },
  methods: {
    async deleteEvent() {
      this.store.deleteEvent(this.event.id);
      this.closeDrawer();
    },
    closeDrawer() {
      this.$emit("close");
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>

<style lang="scss">
.n-button {
  margin-right: 1em;
}
</style>
