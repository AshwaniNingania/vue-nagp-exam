import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    tasks: []
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return (state.user) || null;
    },
  getTasks(state) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks && tasks.length > 0) {
        state.tasks = tasks;
      }
  
      return state.tasks;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    deleteTask(state, task) {
      state.tasks = state.tasks.filter((val) => val.id !== task.id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    updateTask(state, task) {
      state.tasks.map((val)=> {
        if (val.id === task.id ) {
          val.status = task.status;
        }
      });
      localStorage.setItem('tasks',JSON.stringify(state.tasks));
    }
  },
  actions: {
    getUser: async function ({ commit }) {
      // const user = await axios.get('/user');
      commit('setUser', {
        "username": "Admin",
        "password": "admin"
      });
    },
    addTask({commit}, task) {
      commit('addTask', task)
    },
    deleteTask({commit}, task) {
      commit('deleteTask', task)

    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    }
  },
  modules: {
  }
})
