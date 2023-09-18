<template lang="">
  <div class="clients_wrapper">
    <div class="clients-header">
      <h1>Clients</h1>
      <n-button style="margin-left: 1em" color="#222a68" @click="showAddClientDrawer = true">+</n-button>
    </div>
    <div class="clients-main">
      <n-spin size="medium" v-if="getClients.length == 0" />
      <n-data-table v-else :columns="columns" :data="getClients" :pagination="pagination" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    </div>
    <add-event :show="showAddEventModal" @closeModal="showAddEventModal = false" :activeClientId="activeClient.id" />
    <add-client :show="showAddClientDrawer" @close="showAddClientDrawer = false" />
    <delete-client :show="showDeleteClientDrawer" @close="showDeleteClientDrawer = false" :client="activeClient" />
  </div>
</template>
<script>
import { h } from "vue";
import { useStore } from "../stores/store";
import { NDataTable, NSpin, NButton, NDrawer, NDrawerContent, NFormItem, NInput, NForm } from "naive-ui";
import AddEvent from "../components/modals/AddEvent.vue";
import AddClient from "../components/modals/AddClient.vue";
import DeleteClient from "../components/modals/DeleteClient.vue";

export default {
  components: { NDataTable, NSpin, NButton, AddEvent, NDrawer, NDrawerContent, NFormItem, NInput, NForm, DeleteClient, AddClient },
  data() {
    return {
      activeClient: {},
      columns: this.createColumns(),
      checkedRowKeys: [],
      pagination: {
        pageSize: 10,
      },
      rowKey: (row) => row.address,
      handleCheck(rowKeys) {
        this.checkedRowKeys = rowKeys;
      },
      showAddEventModal: false,
      showAddClientDrawer: false,
      showDeleteClientDrawer: false,
    };
  },
  computed: {
    getClients() {
      let clients = this.store.getClientData;
      return clients.map((client) => {
        return {
          id: client.id,
          name: client.first_name + " " + client.last_name,
          phone: client.phone,
          email: client.email,
        };
      });
    },
  },
  methods: {
    createColumns() {
      let bookClient = (row) => {
        this.showAddEventModal = true;
        this.activeClient = row;
      };
      let deleteClient = (row) => {
        this.showDeleteClientDrawer = true;
        this.activeClient = row;
      };
      return [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Phone",
          key: "phone",
        },
        {
          title: "Email",
          key: "email",
        },
        {
          title: "Book",
          key: "book",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => bookClient(row),
              },
              { default: () => "Book" }
            );
          },
        },
        {
          title: "Delete",
          key: "delete",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => deleteClient(row),
              },
              { default: () => "Delete" }
            );
          },
        },
      ];
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
<style lang="scss">
.clients_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  .clients-header {
    display: flex;
    justify-content: space-between;
  }
  .clients-main {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
