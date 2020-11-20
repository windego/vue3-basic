import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger, MutationPayload } from 'vuex'

import todomvc, { TodoMvcState, TODO_TODOS_KEY } from './modules/todomvc'
import basic, { BasicState } from './modules/basic'

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  todomvc: TodoMvcState;
  basic: BasicState;
}

export const key: InjectionKey<Store<State>> = Symbol('vuex')

const localStoragePlugin = (store: Store<State>) => {
  store.subscribe((mutation: MutationPayload, { todomvc: { todos } }) => {
    console.log('todomvc', todos)
    window.localStorage.setItem(TODO_TODOS_KEY, JSON.stringify(todos))
  })
}

const plugins = debug ? [createLogger(), localStoragePlugin] : []

export default createStore({
  modules: {
    todomvc,
    basic,
  },
  strict: debug,
  plugins,
})
// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
