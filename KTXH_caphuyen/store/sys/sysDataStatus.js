import {
    set,
    setPropertyNestedObject,
    add,
    update,
    remove
  } from '@/util/actions'
  
  export const state = () => {
    return {
      api: {
        sysDataStatus: '/api/v2/crud/sysdatastatus'
      },
      datastatusList: [],
      deleteddatastatusList: [],
      datastatus: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_DATA_STATUS_LIST: set('datastatusList'),
    SET_DELETED_DATA_STATUS: set('deleteddatastatusList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_DATA_STATUS: set('datastatus'),
  
    ADD_DATA_STATUS: add('datastatusList'),
  
    UPDATE_DATA_STATUS: update('datastatusList'),
  
    DELETE_DATA_STATUS: remove('datastatusList'),
  }
  
  export const actions = {
    async getDataStatusList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/list`, {
          queryData: payload.queryData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_DATA_STATUS_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getDataStatusList', err)
      }
    },
  
    async getDeletedDataStatusList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_DATA_STATUS', data.rows)
      } catch (err) {
        console.log('getDataStatusList', err)
      }
    },
  
    async getDataStatus(
      { state, commit },
      id
    ) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/read`, {
          id: id
        })
  
        commit('SET_DATA_STATUS', data[0])
      } catch (err) {
        console.log('getDataStatus', err)
      }
    },
  
    async addDataStatus({ state, commit }, datastatus) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/create`, datastatus)
  
        commit('ADD_DATA_STATUS', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addDataStatus', err)
      }
    },
  
    async updateDataStatus({ state, commit }, datastatus) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/update`, datastatus)
  
        commit('UPDATE_DATA_STATUS', {value: data})
      } catch (err) {
        console.log('updateDataStatus', err)
      }
    },
  
    async deleteDataStatus({ state, commit }, datastatus) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/delete`, datastatus)
  
        commit('DELETE_DATA_STATUS', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteDataStatus', err)
      }
    },
  
    async restoreDataStatus({ state, commit }, datastatus) {
      const { sysDataStatus } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysDataStatus}/restore`, datastatus)
  
        commit('ADD_DATA_STATUS', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreDataStatus', err)
      }
    }
  }
  