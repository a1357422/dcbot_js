import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        client: null,
        commandsActionMao: null,
    }),
    getters: {},
    actions: {},
})