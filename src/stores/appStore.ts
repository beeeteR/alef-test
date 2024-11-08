import {defineStore} from 'pinia'
import type {IUser} from "@/utils/types/user";
import type {IChild} from "@/utils/types/child";

export const useAppStore = defineStore('appStore', {
  state: () => ({
    user: {} as IUser,
    children: [] as IChild[]
  }),
  getters: {
    getUser: (state) => state.user,
    getChildren: (state) => state.children
  },
  actions: {
    setUser(userInfo: IUser) {
      this.user = userInfo
    },
    addChildren(children: IChild[]) {
      this.children.push(...children)
    },
    removeChild(childId: number) {
      this.children = this.children.filter(child => child.id !== childId)
    },
    resetStore() {
      this.user = {} as IUser
      this.children.length = 0
    }
  },
})
