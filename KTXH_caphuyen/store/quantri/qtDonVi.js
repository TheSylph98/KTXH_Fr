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
      qtDonVi: '/api/v2/crud/qtdonvi'
    },
    donViList: [],
    searchDonVi: [],
    deletedDonViList: [],
    donVi: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_DON_VI_LIST: set('donViList'),

  SET_SEARCH_DON_VI_LIST: set('searchDonVi'),

  SET_DELETED_DON_VI: set('deletedDonViList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_DON_VI: set('donViList'),

  ADD_DON_VI: add('donViList'),

  UPDATE_DON_VI: update('donViList'),

  DELETE_DON_VI: remove('donViList'),
}

export const actions = {
  async getQTDonViList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_DON_VI_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getQTDonViList', err)
    }
  },

  async getSearchDonViList(
    { state, commit },
    text
  ) {
    const { donVi } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${donVi}/list`, queryData)

      commit('SET_SEARCH_DON_VI_LIST', data.rows)
    } catch (err) {
      console.log('getSearchDonViList', err)
    }
  },

  async getDeletedDonViList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_DON_VI', data.rows)
    } catch (err) {
      console.log('getDeletedDonViList', err)
    }
  },

  async getQTDonVi(
    { state, commit },
    id
  ) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/read`, {
        id: id
      })

      commit('SET_DON_VI', data.rows)
    } catch (err) {
      console.log('getQTDonVi', err)
    }
  },

  async addQTDonVi({ state, commit }, donVi) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/create`, donVi)

      commit('ADD_DON_VI', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addQTDonVi', err)
    }
  },

  async updateQTDonVi({ state, commit }, donVi) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/update`, donVi)

      commit('UPDATE_DON_VI', data)
    } catch (err) {
      console.log('updateQTDonVi', err)
    }
  },

  async deleteQTDonVi({ state, commit }, donVi) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/delete`, donVi)

      commit('DELETE_DON_VI', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteQTDonVi', err)
    }
  },

  async restoreQTDonVi({ state, commit }, donVi) {
    const { qtDonVi } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonVi}/restore`, donVi)

      commit('ADD_DON_VI', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreQTDonVi', err)
    }
  }
}

