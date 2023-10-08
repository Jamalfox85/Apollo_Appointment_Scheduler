<template lang="">
  <div class="clients_dashboard_wrapper">
    <div class="clients-header">
      <h2>Top Clients</h2>
      <n-tag class="top-clients-tag" :bordered="false" round :color="{ color: this.$colors.primary, textColor: this.$colors.white }">{{ getClients.length }}</n-tag>
      <n-button class="new-client-bttn" :color="this.$colors.secondary" ghost @click="showAddClientDrawer = true">New Client</n-button>
    </div>
    <n-spin size="medium" v-if="getClients.length == 0" />
    <n-data-table class="client-table" v-else :columns="columns" :data="getClients" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
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
import { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NTag, NForm } from "naive-ui";
export default {
  components: { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NTag, NForm, AddEvent, AddClient, DeleteClient },
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
      let clientData = clients.map((client) => {
        return {
          id: client.id,
          name: client.first_name + " " + client.last_name,
          phone: client.phone,
          email: client.email,
        };
      });
      return clientData.slice(0, 3);
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
<style lang="scss" scoped>
.clients_dashboard_wrapper {
  flex-grow: 1;
  position: relative;
  padding: 1em;
  display: flex;
  flex-direction: column;
  .clients-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
    h2 {
      font-size: 1em;
    }
    .top-clients-tag {
      margin: 0 auto 0 1em;
    }
    .new-client-bttn {
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      &:hover {
        background-color: var(--primary);
        transition: 0.1s ease-in;
      }
    }
  }
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
