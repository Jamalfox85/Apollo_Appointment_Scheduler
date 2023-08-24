<template lang="">
  <div class="clients_wrapper">
    <div class="clients-header">
      <h1>Clients</h1>
    </div>
    <div class="clients-main">
      <n-spin size="medium" v-if="tableData.length == 0" />
      <n-data-table v-else :columns="columns" :data="tableData" :pagination="pagination" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    </div>
    <add-event :show="showAddEventModal" @closeModal="showAddEventModal = false" :activeClientId="activeClient.id" />
  </div>
</template>
<script>
import { h, defineComponent } from "vue";
import { supabase } from "../lib/supabaseClient";
import { NDataTable, NSpin, NButton } from "naive-ui";
import AddEvent from "../components/modals/AddEvent.vue";

export default {
  components: { NDataTable, NSpin, NButton, AddEvent },
  data() {
    return {
      tableData: [],
      showAddEventModal: false,
      activeClient: {},
      columns: this.createColumns(),
      checkedRowKeys: [],
      pagination: {
        pageSize: 5,
      },
      rowKey: (row) => row.address,
      handleCheck(rowKeys) {
        this.checkedRowKeys = rowKeys;
      },
    };
  },
  methods: {
    createColumns() {
      let bookClient = (row) => {
        this.showAddEventModal = true;
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
          title: "Action",
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
      ];
    },
  },
  async mounted() {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    let authUserId = authData.session.user.id;
    let { data: clients, error } = await supabase.from("clients").select("*").eq("business_id", authUserId);
    this.tableData = clients.map((client) => {
      return {
        id: client.id,
        name: client.first_name + " " + client.last_name,
        phone: client.phone,
        email: client.email,
      };
    });
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
