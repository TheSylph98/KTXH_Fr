import {
    set,
    setPropertyNestedObject,
    add,
    update,
    remove
  } from '../util/actions'
  
  export const state = () => {
    return {
      api: {
        sysCapHanhChinh: '/api/v2/crud/syscaphanhchinh'
      },
      caphanhchinhList: [],
      deletedcaphanhchinhList: [],
      caphanhchinh: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_CAP_HANH_CHINH_LIST: set('caphanhchinhList'),
    SET_DELETED_CAP_HANH_CHINH: set('deletedcaphanhchinhList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_CAP_HANH_CHINH: set('caphanhchinh'),
  
    ADD_CAP_HANH_CHINH: add('sysCapHanhChinh'),
  
    UPDATE_CAP_HANH_CHINH: update('sysCapHanhChinh'),
  
    DELETE_CAP_HANH_CHINH: remove('sysCapHanhChinh'),
  }
  
  export const actions = {
    async getCapHanhChinhList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/list`, {
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_CAP_HANH_CHINH_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getCapHanhChinhList', err)
      }
    },
  
    async getDeletedCapHanhChinhList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_CAP_HANH_CHINH', data.rows)
      } catch (err) {
        console.log('getCapHanhChinhList', err)
      }
    },
  
    async getCapHanhChinh(
      { state, commit },
      id
    ) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/read`, {
          id: id
        })
  
        commit('SET_CAP_HANH_CHINH', data.rows)
      } catch (err) {
        console.log('getCapHanhChinh', err)
      }
    },
  
    async addCapHanhChinh({ state, commit }, caphanhchinh) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/create`, caphanhchinh)
  
        commit('ADD_CAP_HANH_CHINH', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addCapHanhChinh', err)
      }
    },
  
    async updateCapHanhChinh({ state, commit }, caphanhchinh) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/update`, caphanhchinh)
  
        commit('UPDATE_CAP_HANH_CHINH', data)
      } catch (err) {
        console.log('updateCapHanhChinh', err)
      }
    },
  
    async deleteCapHanhChinh({ state, commit }, caphanhchinh) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/delete`, caphanhchinh)
  
        commit('DELETE_CAP_HANH_CHINH', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteCapHanhChinh', err)
      }
    },
  
    async restoreCapHanhChinh({ state, commit }, caphanhchinh) {
      const { sysCapHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysCapHanhChinh}/restore`, caphanhchinh)
  
        commit('ADD_CAP_HANH_CHINH', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreCapHanhChinh', err)
      }
    }
  }
  