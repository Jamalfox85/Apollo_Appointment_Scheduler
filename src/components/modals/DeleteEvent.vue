<template>
  <n-drawer v-model:show="modalState" :width="500" placement="left" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" :color="this.$colors.error" @click="closeDrawer()"> Close </n-button>
    </div>
    <n-drawer-content class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Delete Event</h2>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this event?</p>
        <n-button :color="this.$colors.error" @click="deleteEvent()"> Delete </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { useStore } from "../../stores/store";
import { NButton, NDrawer, NDrawerContent } from "naive-ui";

export default {
  components: { NButton, NDrawer, NDrawerContent },
  props: ["show", "event"],
  data() {
    return {};
  },
  computed: {
    modalState() {
      return this.show;
    },
  },
  methods: {
    deleteEvent() {
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
