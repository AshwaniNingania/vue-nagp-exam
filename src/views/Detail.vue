<template>
    <mdb-card border="light" class="mb-3 card" v-if="mytask">
        <mdb-card-header >
            <mdb-media @click="mytask.showDetails = !mytask.showDetails">
                <div :class="mytask.status">{{mytask.name}}</div>
                <mdb-media-body>
                    <div class="tags">
                      <el-tooltip content="Mark as Completed" placement="top"><el-checkbox button v-if="mytask.status != 'Completed'" class="username" @change="updateTask(mytask, 'Completed')" size="small" >Active</el-checkbox></el-tooltip>
                      <el-tooltip content="Mark as Active" placement="top"><el-checkbox v-if="mytask.status != 'Active'" checked class="username" @change="updateTask(mytask, 'Active')" size="small" >Completed</el-checkbox></el-tooltip>
                      <el-tooltip content="Parmanent delete" placement="top"><el-button type="danger" class="username" icon="el-icon-delete" circle @click="deleteTask(mytask)" size="small" /></el-tooltip>
                      <!-- <el-tooltip content="Mark as Deleted" placement="top"><el-button v-if="mytask.status != 'Deleted'" type="basic"  icon="el-icon-check" circle @click="updateTask(mytask, 'Deleted')" size="small" /></el-tooltip> -->
                      <el-tooltip content="Top center" placement="top"><el-button type="basic" @click="mytask.showDetails = !mytask.showDetails"  v-if="mytask.showDetails" icon="el-icon-caret-top" circle size="small" /></el-tooltip>
                      <el-tooltip content="Top center" placement="top"><el-button type="basic" @click="mytask.showDetails = !mytask.showDetails"  v-if="!mytask.showDetails" icon="el-icon-caret-bottom" circle size="small" /></el-tooltip>
                    </div>
                </mdb-media-body>
            </mdb-media>
        </mdb-card-header>
        <div class="footer" v-if="mytask.showDetails">
            
            <el-tooltip content="Edit the text" placement="top"><el-button v-if="!isEdit" type="text"  icon="el-icon-edit" circle @click="isEdit = true" size="small"/></el-tooltip>
            <div :class="mytask.status" v-if="!isEdit">{{mytask.description}}</div>
            <div :class="mytask.status" v-else>
                <el-input v-model="mytask.description"/>
            </div>
            <el-tooltip content="save the changed text" placement="top"><el-button v-if="isEdit" type="success"  icon="el-icon-check" circle @click="updateTaskName(mytask)" size="small" style="margin-left: 20px"/></el-tooltip>
                
            <div class="tags">
                Status : {{mytask.status}}
                <br>
                DeadLine :  {{mytask.date | formatDate}}
            </div>
        </div>
        <router-link to="/">
            <el-tooltip content="Go to home page" placement="top"><el-button type="primary" class="username" size="large" >Back To Home</el-button></el-tooltip>
                      
        </router-link>
    </mdb-card>
</template>

<script>
import moment from 'moment'
import { mdbCard, mdbCardHeader, mdbMedia, mdbMediaBody } from 'mdbvue';
import {mapGetters} from 'vuex'
/**
 * Display task detail
 */
export default {
    name: 'detail',
    props: {
        task: Object
    },
    data() {
        return {
            taskId: this.$route.params.taskId,
            mytask: '',
            isEdit: false
        }
    },
    computed: {
        ...mapGetters({
            'tasks': 'getTasks'
        })
    },
    watch: {
        '$route.params.taskId': function(taskId) {
            if (taskId) {
                this.taskId = taskId;
               this.getTask(taskId);

            }
        }
    },
    created: function() {
        if (this.taskId) {
            this.getTask(this.taskId);
        }
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
            return moment(String(value)).format('DD MMM YYYY hh:mm');
        }
    },
    components: {
        mdbCard,
        mdbCardHeader,
        mdbMedia,
        mdbMediaBody
    },
    methods: {

        getTask(id) {
            for (let t of this.tasks) {
                if(t.id == id) {
                   this.mytask = t;
                   this.mytask.showDetails = true;
                }
            }
        },

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