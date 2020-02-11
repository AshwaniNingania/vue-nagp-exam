<template>
    <mdb-card border="light" class="mb-3 card" v-if="mytask">
        <mdb-card-header >
            <mdb-media @click="mytask.showDetails = !mytask.showDetails">
                <router-link :class="mytask.status" :to="`/${mytask.id}`">{{mytask.name}}</router-link>
                <mdb-media-body>
                    <div class="tags">
                      <el-tooltip content="Mark as Completed" placement="top"><el-checkbox button v-if="mytask.status != 'Completed'" class="username" @change="updateTask(mytask, 'Completed')" size="small" >Active</el-checkbox></el-tooltip>
                      <el-tooltip content="Mark as Active" placement="top"><el-checkbox v-if="mytask.status != 'Active'" checked class="username" @change="updateTask(mytask, 'Active')" size="small" >Completed</el-checkbox></el-tooltip>
                      <el-tooltip content="Parmanent delete" placement="top"><el-button type="danger" class="username" icon="el-icon-delete" circle @click="deleteTask(mytask)" size="small" /></el-tooltip>
                      <!-- <el-tooltip content="Mark as Deleted" placement="top"><el-button v-if="mytask.status != 'Deleted'" type="basic"  icon="el-icon-check" circle @click="updateTask(mytask, 'Deleted')" size="small" /></el-tooltip> -->
                      <!-- <el-tooltip content="Top center" placement="top"><el-button type="basic" @click="mytask.showDetails = !mytask.showDetails"  v-if="mytask.showDetails" icon="el-icon-caret-top" circle size="small" /></el-tooltip> -->
                      <!-- <el-tooltip content="Top center" placement="top"><el-button type="basic" @click="mytask.showDetails = !mytask.showDetails"  v-if="!mytask.showDetails" icon="el-icon-caret-bottom" circle size="small" /></el-tooltip> -->
                    </div>
                </mdb-media-body>
            </mdb-media>
        </mdb-card-header>
    </mdb-card>
</template>

<script>
import moment from 'moment'
import { mdbCard, mdbCardHeader, mdbMedia, mdbMediaBody } from 'mdbvue';
/**
 * Display task detail
 */
export default {
    name: 'task',
    props: {
        task: Object
    },
    data() {
        return {
            mytask: ''
        }
    },
    created: function() {
        this.mytask = this.task;
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
            return moment(String(value)).format('DD MMM YYYY hh:mm');
        }
    },
    watch: {
        task: function(task) {
            this.mytask = task;
        }
    },
    components: {
        mdbCard,
        mdbCardHeader,
        mdbMedia,
        mdbMediaBody
    },
    methods: {
        deleteTask(item) {
            // item.status = "Deleted";
            // this.$emit('updateTask', item);
            this.$emit('deleteTask', item);
        },

        updateTask(item, status) {
            item.status = status;
            this.$emit('updateTask', item);
        },

        updateTaskName(item) {
            this.isEdit = false;
            this.$emit('updateTask', item);
        },
    }
}
</script>

<style scoped>
.img {
    display: inline-block;
    vertical-align: middle;
    height: 40px;
    width: 40px;
    border-radius: 30px;
}

.card {
    /* width: 70%; */
    margin: 5px;
    text-align: left;
}

.read-more {
    font-size: .8rem;
    font-weight: 300;
    color: #bbb;
    float: left;
}

.footer {
    padding: 10px;
}

.username {
    margin-left: 15px;
}

.tag {
    color: grey !Important;
    margin-left: 5px;
}

.tags {
    float: right;
}

.user {
    float: left;
}

.fav {
    float: right;
}

.Completed {
    color: green !important;
}
</style>