import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { State } from '../index'

export const TODO_TODOS_KEY = 'todos'
export const TODO_DONES_KEY = 'dones'
export const TODO_DELETES_KEY = 'deletes'

export interface TodoItem {
  text: string;
  done: boolean;
}

export interface TodoMvcState {
  todos: TodoItem[];
  dones: TodoItem[];
  deletes: TodoItem[];
}

const state: TodoMvcState = {
  todos: JSON.parse(window.localStorage.getItem(TODO_TODOS_KEY) || '[]'),
  dones: JSON.parse(window.localStorage.getItem(TODO_DONES_KEY) || '[]'),
  deletes: JSON.parse(window.localStorage.getItem(TODO_DELETES_KEY) || '[]'),
}

// getters
const getters: GetterTree<TodoMvcState, State> = {}
const actions: ActionTree<TodoMvcState, State> = {
  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false,
    })
  },

  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },

  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done })
  },

  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },

  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },

  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  },
}
const mutations: MutationTree<TodoMvcState> = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },

  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },

  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    const index = state.todos.indexOf(todo)

    state.todos.splice(index, 1, {
      ...todo,
      text,
      done,
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
