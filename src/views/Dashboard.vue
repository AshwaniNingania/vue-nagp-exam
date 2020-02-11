<template>
  <div>
    <div class="banner home-1" v-if="!username">
      <p>
        A place to add your tasks. Please login.
        <br />Username : admin
        <br />Password : admin
        <br />// This is a dummy user as we dont have login/logout functionality
      </p>
    </div>
    <mdb-container class="home-1">
      <mdb-row>
        <mdb-col col="9">
          <b-tabs v-model="tabIndex" content-class="mt-3">
            <b-tab title="Your Tasks" v-if="username">
              <Tasks :feed="username" v-if="tabIndex == 0" :sortKey="sortKey"/>
            </b-tab>
            <b-tab :title="`${status}`">
              <Tasks :status="status.substring(1)" v-if="status" />
            </b-tab>
          </b-tabs>
        </mdb-col>
        <mdb-col col="3">
          <Statuses @fetchTasksForStatus="fetchTasksForStatus" @sortTasksByKey="sortTasksByKey" />
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Statuses from '@/components/Statuses'
import Tasks from '@/components/Tasks'
import { mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "dashboard",
  components: {
    Tasks,
    Statuses,
    mdbContainer,
    mdbRow,
    mdbCol
  },
  data() {
    return {
      status: "",
      tabIndex: 0,
      sortKey: ''
    };
  },
  watch: {
    tabIndex: function(tabIndex) {
      if (tabIndex == 0 && !this.username) {
        this.status = "";
      } else if (tabIndex == 0 && this.username) {
        this.status = "";
      }
    }
  },
  created: function() {
    this.tabIndex = 0;
    this.$store.commit("setUser", {
      username: "Admin",
      password: "admin"
    });
  },
  computed: {
    username() {
      return this.$store.getters["username"];
    }
  },
  methods: {
    fetchTasksForStatus: function(status) {
      this.status = "#" + status;
      this.tabIndex = this.username ? 1 : 0;
    },

    sortTasksByKey: function(key) {
      this.tabIndex = 0;
      this.status = "";
      this.sortKey = key;
    }
  }
};
</script>

<style scoped>
.banner {
  background: #5cb85c;
  color: #fff;
  background: #5cb263;
}

.home-1 {
  padding: 1rem;
  margin-bottom: 1rem;
}

.disableTab {
  cursor: default;
}
</style>
