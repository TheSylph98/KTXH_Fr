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
        qcHuyen: '/api/QCHuyens'
      },
      huyenList: [],
      deletedHuyenList: [],
      huyen: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_HUYEN_LIST: set('huyenList'),
    SET_DELETED_HUYEN: set('deletedHuyen'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_HUYEN: set('huyen'),
  
    ADD_HUYEN: add('qcHuyen'),
  
    UPDATE_HUYEN: update('qcHuyen'),
  
    DELETE_HUYEN: remove('qcHuyen'),

    RESTORE_HUYEN: restore('qcHuyen')
  }
  
  export const actions = {
    async getHuyenList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/list`, {
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_HUYEN_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getHuyenList', err)
      }
    },
  
    async getDeletedHuyenList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_HUYEN', data.rows)
      } catch (err) {
        console.log('getHuyenList', err)
      }
    },
  
    async getHuyen(
      { state, commit },
      id
    ) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/read`, {
          id: id
        })
  
        commit('SET_HUYEN', data.rows)
      } catch (err) {
        console.log('getHuyen', err)
      }
    },
  
    async addHuyen({ state, commit }, huyen) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/create`, huyen)
  
        commit('ADD_HUYEN', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addHuyen', err)
      }
    },
  
    async updateHuyen({ state, commit }, huyen) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/update`, huyen)
  
        commit('UPDATE_HUYEN', data)
      } catch (err) {
        console.log('updateHuyen', err)
      }
    },
  
    async deleteHuyen({ state, commit }, huyen) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/delete`, huyen)
  
        commit('DELETE_HUYEN', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteHuyen', err)
      }
    },
  
    async restoreHuyen({ state, commit }, huyen) {
      const { qcHuyen } = state.api
  
      try {
        const data = await this.$axios.$post(`${qcHuyen}/restore`, huyen)
  
        commit('RESTORE_HUYEN', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreHuyen', err)
      }
    }
  }
  