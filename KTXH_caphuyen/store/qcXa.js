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
        qcXa: '/api/QCXas'
      },
      xaList: [],
      deletedXaList: [],
      xa: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_XA_LIST: set('xaList'),
    SET_DELETED_XA: set('deletedXa'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_XA: set('xa'),
  
    ADD_XA: add('qcXa'),
  
    UPDATE_XA: update('qcXa'),
  
    DELETE_XA: remove('qcXa'),

    RESTORE_XA: restore('qcXa')
  }
  
  export const actions = {
    async getXaList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/list`, {
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_XA_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getXaList', err)
      }
    },
  
    async getDeletedXaList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_XA', data.rows)
      } catch (err) {
        console.log('getXaList', err)
      }
    },
  
    async getXa(
      { state, commit },
      id
    ) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/read`, {
          id: id
        })
  
        commit('SET_XA', data.rows)
      } catch (err) {
        console.log('getXa', err)
      }
    },
  
    async addXa({ state, commit }, xa) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/create`, xa)
  
        commit('ADD_XA', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addXa', err)
      }
    },
  
    async updateXa({ state, commit }, xa) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/update`, xa)
  
        commit('UPDATE_XA', data)
      } catch (err) {
        console.log('updateXa', err)
      }
    },
  
    async deleteXa({ state, commit }, xa) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/delete`, xa)
  
        commit('DELETE_XA', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteXa', err)
      }
    },
  
    async restoreXa({ state, commit }, xa) {
      const { qcXa } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcXa}/restore`, xa)
  
        commit('RESTORE_XA', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreXa', err)
      }
    }
  }
  