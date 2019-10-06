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
        qtTacNhan: '/api/QTTacNhans'
      },
      tacNhanList: [],
      deletedTacNhanList: [],
      tacNhan: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_TAC_NHAN_LIST: set('tacNhanList'),
    SET_DELETED_TAC_NHAN: set('deletedTacNhanList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_TAC_NHAN: set('tacNhan'),

    ADD_TAC_NHAN: add('qtTacNhan'),

    UPDATE_TAC_NHAN: update('qtTacNhan'),

    DELETE_TAC_NHAN: remove('qtTacNhan'),

    RESTORE_TAC_NHAN: restore('qtTacNhan')
}

export const actions = {
  async getTacNhanList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_TAC_NHAN_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getTacNhanList', err)
    }
  },

  async getDeletedTacNhanList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_TAC_NHAN', data.rows)
    } catch (err) {
      console.log('getDeletedTacNhanList', err)
    }
  },

  async getQTTacNhan(
    { state, commit },
    id
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/read`, {
        id: id
      })

      commit('SET_TAC_NHAN', data.rows)
    } catch (err) {
      console.log('getQTTacNhan', err)
    }
  },

  async addQTTacNhan({ state, commit }, tacNhan) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/create`, tacNhan)

      commit('ADD_TAC_NHAN', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addQTTacNhan', err)
    }
  },

  async updateQTTacNhan({ state, commit }, tacNhan) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/update`, tacNhan)

      commit('UPDATE_TAC_NHAN', data)
    } catch (err) {
      console.log('updateQTTacNhan', err)
    }
  },

  async deleteQTTacNhan({ state, commit }, tacNhan) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/delete`, tacNhan)

      commit('DELETE_TAC_NHAN', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteQTTacNhan', err)
    }
  },

  async restoreQTTacNhan({ state, commit }, tacNhan) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/restore`, tacNhan)

      commit('RESTORE_TAC_NHAN', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreQTTacNhan', err)
    }
  }
}

