<template lang="">
  <div class="clients_dashboard_wrapper">
    <h1>Clients</h1>
    <n-button class="add-client-button" style="margin-left: 1em" color="#222a68" @click="showAddUserDrawer = true">+</n-button>
    <n-spin size="medium" v-if="tableData.length == 0" />
    <n-data-table v-else :columns="columns" :data="tableData" :pagination="pagination" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    <add-event :show="showAddEventModal" @closeModal="showAddEventModal = false" :activeClientId="activeClient.id" />
    <n-drawer v-model:show="showAddUserDrawer" :width="502" placement="left">
      <n-drawer-content title="New Client">
        <n-form
          :model="model"
          label-placement="left"
          require-mark-placement="right-hanging"
          size="medium"
          label-width="auto"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="First Name">
            <n-input v-model:value="model.first_name" placeholder="Alan" path="first_name" />
          </n-form-item>
          <n-form-item label="Last Name" path="last_name">
            <n-input v-model:value="model.last_name" placeholder="Watts" />
          </n-form-item>
          <n-form-item label="Phone" path="phone">
            <n-input v-model:value="model.phone" placeholder="(444) 444-4444" />
          </n-form-item>
          <n-form-item label="Email" path="email">
            <n-input v-model:value="model.email" placeholder="email@email.com" />
          </n-form-item>
        </n-form>
        <n-button @click="addNewClient" type="primary"> Submit </n-button>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script>
import { h, defineComponent } from "vue";
import { supabase } from "../../lib/supabaseClient";
import AddEvent from "../../components/modals/AddEvent.vue";
import { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NForm } from "naive-ui";
export default {
  components: { NDataTable, NButton, NSpin, NDrawer, NDrawerContent, NFormItem, NInput, NForm, AddEvent },
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
      showAddUserDrawer: false,
      model: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
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
    async addNewClient() {
      const { data: authData, error: authError } = await supabase.auth.getSession();
      let authUserId = authData.session.user.id;
      let newClientData = this.model;
      newClientData.business_id = authUserId;
      const { data, error } = await supabase.from("clients").insert([newClientData]).select();
      if (data) {
        console.log("DATA :", data);
      }
      this.showAddUserDrawer = false;
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
.clients_dashboard_wrapper {
  width: 50%;
  position: relative;
  padding: 1em;
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
</style>
