<template lang="">
  <div class="clients_dashboard_wrapper">
    <h1>Clients</h1>
    <n-button class="add-client-button" style="margin-left: 1em" size="small" color="#222a68" @click="showAddClientDrawer = true">+</n-button>
    <n-spin size="medium" v-if="getClients.length == 0" />
    <n-data-table class="client-table" v-else :columns="columns" :data="getClients" :pagination="pagination" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    <add-event :show="showAddEventDrawer" @close="showAddEventDrawer = false" :activeClientId="activeClient.id" />
    <add-client :show="showAddClientDrawer" @close="showAddClientDrawer = false" />
    <delete-client :show="showDeleteClientDrawer" @close="showDeleteClientDrawer = false" :client="activeClient" />
  </div>
</template>
<script>
import { h, defineComponent } from "vue";
import { useStore } from "../../stores/store";
import AddEvent from "../../components/modals/AddEvent.vue";
import AddClient from "../../components/modals/AddClient.vue";
import DeleteClient from "../../components/modals/DeleteClient.vue";
import { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NForm } from "naive-ui";
export default {
  components: { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NForm, AddEvent, AddClient, DeleteClient },
  data() {
    return {
      activeClient: {},
      columns: this.createColumns(),
      checkedRowKeys: [],
      pagination: {
        pageSize: 3,
      },
      rowKey: (row) => row.address,
      handleCheck(rowKeys) {
        this.checkedRowKeys = rowKeys;
      },
      showAddEventDrawer: false,
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
        this.showAddEventDrawer = true;
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
          key: "actions",
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
          key: "actions",
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
.clients_dashboard_wrapper {
  width: 50%;
  position: relative;
  padding: 1em;
  display: flex;
  flex-direction: column;
}
.add-client-button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
.n-data-table__pagination {
  position: absolute;
  top: -3em;
  right: 40%;
}
.n-data-table-table {
  height: 250px;
}
</style>
