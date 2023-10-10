<template>
  <n-drawer v-model:show="modalState" :width="500" placement="left" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" :color="this.$colors.error" @click="closeDrawer()"> Close </n-button>
    </div>
    <n-drawer-content class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Delete Client</h2>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this client?</p>
        <n-button :color="this.$colors.error" @click="deleteClient"> Delete </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { useStore } from "../../stores/store";
import { NButton, NDrawer, NDrawerContent } from "naive-ui";

export default {
  components: { NButton, NDrawer, NDrawerContent },
  props: ["show", "client"],
  data() {
    return {};
  },
  computed: {
    modalState() {
      return this.show;
    },
  },
  methods: {
    deleteClient() {
      this.store.deleteClient(this.client.id);
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
