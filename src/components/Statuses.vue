<template>
  <div class="statuses">
    <div v-if="!statuses" class="noTasks">loading statuses ...</div>
    <div v-else-if="statuses.length == 0" class="noTasks">No statuses are here... yet.</div>
    <div v-else id="statusTab">
        <!-- <a href="javascript:void(0)" :class="status"  @click="fetchTasksForStatus(status)">{{status}}</a> -->
      Filter By :
      <el-button v-for="status in statuses" v-bind:key="status" type="basic" circle :class="status" @click="fetchTasksForStatus(status)">{{status}}</el-button>
      <br>
      Sort By : 
      <el-button type="text" circle @click="sortTasksBykey('name')">Task Text</el-button>
      <el-button type="text" circle @click="sortTasksBykey('date')">Date</el-button>
      <el-button type="text" circle @click="sortTasksBykey('status')">Status</el-button>
      <el-button type="warning" circle @click="sortTasksBykey('')">Clear Sorting & Filter</el-button>
    </div>
  </div>
</template>

<script>
/**
 * Display popular statuses on home page.
 */
export default {
  name: "statuses",
  data() {
    return {
      statuses: null
    };
  },
  components: {
  },
  created: function() {
    this.getAllstatuses();
  },
  methods: {
    /**
     * Fetch all statuses
     */
    getAllstatuses: function() {
      this.statuses = ["Active", "Completed"];
    },

    /**
     * Fetch Tasks for a particular status.
     */
    fetchTasksForStatus: function(status) {
      this.$emit("fetchTasksForStatus", status);
    },

    /**
     * Sort Tasks for a particular key.
     */
    sortTasksBykey  : function(key) {
      this.$emit("sortTasksByKey", key);
    }
  }
};
</script>

<style>
.status {
  color: grey!Important;
  margin-left: 5px;
}
.statuses {
  padding: 1rem;
  margin-bottom: 1rem;
  border: lightgrey;
  border-style: dotted;
}

a:hover {
  font-size: 100%;
  cursor: pointer;
}

.Active {
    color: blue !important;
}

.InProgress {
    color: rgb(218, 226, 100) !important;
}

.Completed {
    color: green !important;
}

.Deleted {
    text-decoration: line-through;
}
</style>