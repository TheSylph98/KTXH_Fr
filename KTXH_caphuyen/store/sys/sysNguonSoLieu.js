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
      sysNguonSoLieu: '/api/v2/crud/sysnguonsolieu'
    },
    nguonsolieuList: [],
    deletednguonsolieuList: [],
    nguonsolieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_NGUON_SO_LIEU_LIST: set('nguonsolieuList'),
  SET_DELETED_NGUON_SO_LIEU: set('deletednguonsolieuList'),
  SET_PAGINATION: set('pagination'),
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_NGUON_SO_LIEU: set('nguonsolieuList'),

  ADD_NGUON_SO_LIEU: add('nguonsolieuList'),

  UPDATE_NGUON_SO_LIEU: update('nguonsolieuList'),

  DELETE_NGUON_SO_LIEU: remove('nguonsolieuList'),
}

export const actions = {
  async getNguonSoLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_NGUON_SO_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getNguonSoLieuList', err)
    }
  },

  async getDeletedNguonSoLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_NGUON_SO_LIEU', data.rows)
    } catch (err) {
      console.log('getNguonSoLieuList', err)
    }
  },

  async getNguonSoLieu(
    { state, commit },
    id
  ) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/read`, {
        id: id
      })

      commit('SET_NGUON_SO_LIEU', data.rows)
    } catch (err) {
      console.log('getNguonSoLieu', err)
    }
  },

  async addNguonSoLieu({ state, commit }, nguonsolieu) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/create`, nguonsolieu)

      commit('ADD_NGUON_SO_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addNguonSoLieu', err)
    }
  },

  async updateNguonSoLieu({ state, commit }, nguonsolieu) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/update`, nguonsolieu)

      commit('UPDATE_NGUON_SO_LIEU', data)
    } catch (err) {
      console.log('updateNguonSoLieu', err)
    }
  },

  async deleteNguonSoLieu({ state, commit }, nguonsolieu) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/delete`, nguonsolieu)

      commit('DELETE_NGUON_SO_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteNguonSoLieu', err)
    }
  },

  async restoreNguonSoLieu({ state, commit }, nguonsolieu) {
    const { sysNguonSoLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysNguonSoLieu}/restore`, nguonsolieu)

      commit('ADD_NGUON_SO_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreNguonSoLieu', err)
    }
  }
}
