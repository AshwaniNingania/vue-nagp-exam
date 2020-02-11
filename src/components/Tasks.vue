<template>
  <div class="my">
    <div class="inputTask" v-if="!status">
        {{status}}
        <div v-if="wrong" class="wrongNotification">
        <el-alert :title="errorMessage" type="error" :center="true" show-icon :closable="true" />
        </div>
        <form @submit="addTaskMethod()">
            <el-row>
                <el-col :span="2"> Title:  </el-col>
                <el-col :span="8">
                    <el-input placeholder="input your title" id="todo-input" v-model="task"  />
                </el-col>
                <el-col :span="4"> Discription:  </el-col>
                <el-col :span="10">
                    <el-input placeholder="task description" id="todo-description" v-model="description"  />
                </el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="5"> Deadline:  </el-col>
                <el-col :span="8">
                    <el-date-picker v-model="date" type="date" placeholder="Pick a day" />
                </el-col>
                <el-col :span="4"><el-button type="primary" icon="el-icon-plus" @click="addTaskMethod()" > Add Task </el-button></el-col>
            </el-row>
        </form>
    </div>
    <div v-if="!tasks" class="notasks">loading tasks ...</div>
    <div v-else-if="tasks && filteredTasks().length == 0" class="notasks">
      <el-alert title="No tasks are here... yet." type="info" :center="true" show-icon :closable="false" />
    </div>
    <div v-else>
      <div v-for="task of filteredTasks()" v-bind:key="task.id">
        <Task :task="task" @deleteTask="deleteTask" @updateTask="updateTaskStatus"/>
      </div>
    </div>
  </div>
</template>


<script>
import Task from "./../components/Task";
import {mapGetters, mapActions} from 'vuex'
import uuid from 'uuid/v4'
/**
 * Display All tasks
 */
export default {
    name: "tasks",
    data() {
        return {
            rows: 0,
            perPage: 5,
            currentPage: 1,
            task: '',
            description: '',
            wrong: false,
            date: this.getDateAfterDays(),
            errorMessage: ''
        };
    },
    components: {
        Task
    },
    props: {
        author: null,
        sortKey: null,
        status: null,
        feed: null
    },
    computed: {
        ...mapGetters({
            'tasks': 'getTasks'
        }),
    },
    methods: {
        ...mapActions(['addTask', 'deleteTask', 'updateTask']),
        addTaskMethod() {
            if (this.validateData() === true) {
                const task_obj = {
                    name: this.task,
                    status: "Active",
                    date: this.date,
                    description: this.description,
                    id: uuid(),
                    showDetails: false
                };

                this.addTask(task_obj);
                this.task = '';
                this.description = '';
                this.date = this.getDateAfterDays;
                this.wrong = false;
            } else {
                this.wrong = true;
                this.setMessageError();
            }
        },

        removeTask(item) {
            this.deleteTask(item);
        },

        updateTaskStatus(item) {
            this.updateTask(item);
        },

        validateData() {
            if (this.task !== '' && this.date !== '' && this.description) {
                return true;
            } else {
                return false;
            }
        },

        setMessageError() {
            if (this.task === '' && this.date === '' && this.description === '') {
                this.errorMessage = 'The title && the date && the description are empty';
            } else {
                if (this.task === '' && this.description === '') {
                this.errorMessage = 'The title && the description are empty';
                } else if (this.task === '') {
                    this.errorMessage = 'The tite is empty';
                } else if (this.description === '') {
                    this.errorMessage = 'The description is empty';
                } else {
                    this.errorMessage = 'The date is empty';
                }
            }
        },

        getDateAfterDays() {
            var today = new Date();
            return new Date().setDate(today.getDate()+7);
        },

        filteredTasks() {
            const key =  this.status;
            var tasks = JSON.parse(JSON.stringify(this.tasks));
            if(this.sortKey) {
                tasks = this.sortTasks(tasks, this.sortKey);
            }

            if(key) {
                return tasks.filter(task => {
                    return task.status == key;
                })
            } else {
                return tasks;
            }
        },

        sortTasks(tasks, sortKey) {
            return tasks.sort((a, b) => {
                let compare = 0;
                if (a[sortKey] > b[sortKey]) {
                    compare = 1;
                } else if (b[sortKey] > a[sortKey]) {
                    compare = -1;
                }
                return compare;
            });
        }
    }
};
</script>

<style scoped>
.my {
    padding: 1rem;
    margin-bottom: 1rem;
}

.notasks {
    text-align: left;
}

.inputTask {
    margin-bottom: 1rem;
}
</style>
