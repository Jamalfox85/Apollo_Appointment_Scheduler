<template lang="">
  <div class="clients_wrapper">
    <div class="clients-header">
      <h1>Clients</h1>
      <n-button style="margin-left: 1em" color="#222a68" @click="showAddUserDrawer = true">+</n-button>
    </div>
    <div class="clients-main">
      <n-spin size="medium" v-if="tableData.length == 0" />
      <n-data-table v-else :columns="columns" :data="tableData" :pagination="pagination" :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    </div>
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
import { supabase } from "../lib/supabaseClient";
import { NDataTable, NSpin, NButton, NDrawer, NDrawerContent, NFormItem, NInput, NForm } from "naive-ui";
import AddEvent from "../components/modals/AddEvent.vue";

export default {
  components: { NDataTable, NSpin, NButton, AddEvent, NDrawer, NDrawerContent, NFormItem, NInput, NForm },
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
