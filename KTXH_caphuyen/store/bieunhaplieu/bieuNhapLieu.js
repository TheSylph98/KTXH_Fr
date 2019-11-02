import {
  set,
  setPropertyNestedObject,
  add,
  update,
  removeByIds
} from '@/util/actions'

export const state = () => {
  return {
    api: {
      bieuNhapLieu: '/api/v2/crud/bieunhaplieu'
    },
    bnlList: [],
    searchBnlList: [],
    deletedbnlList: [],
    bnl: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_BIEU_NHAP_LIEU_LIST: set('bnlList'),

  SET_SEARCH_BIEU_NHAP_LIEU_LIST: set('searchBnlList'),

  SET_DELETED_BIEU_NHAP_LIEU: set('deletedbnlList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_BIEU_NHAP_LIEU: set('bnl'),

  ADD_BIEU_NHAP_LIEU: add('bnlList'),

  UPDATE_BIEU_NHAP_LIEU: update('bnlList'),

  DELETE_BIEU_NHAP_LIEU: removeByIds('bnlList'),
}

export const actions = {
  async getBieuNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize
      })

      commit('SET_BIEU_NHAP_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuList', err)
    }
  },

  async getSearchBieuNhapLieuList(
    { state, commit },
    text
  ) {
    const { bieuNhapLieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/list`, queryData)

      commit('SET_SEARCH_BIEU_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchBieuNhapLieuList', err)
    }
  },

  async getDeletedBieuNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuList', err)
    }
  },

  async getBieuNhapLieu(
    { state, commit },
    id
  ) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU', data)
    } catch (err) {
      console.log('getBieuNhapLieu', err)
    }
  },

  async addBieuNhapLieu({ state, commit }, bnl) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/create`, bnl)

      commit('ADD_BIEU_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addBieuNhapLieu', err)
    }
  },

  async updateBieuNhapLieu({ state, commit }, bnl) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/update`, bnl)

      commit('UPDATE_BIEU_NHAP_LIEU', data)
    } catch (err) {
      console.log('updateBieuNhapLieu', err)
    }
  },

  async deleteBieuNhapLieu({ state, commit }, bnl) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/delete`, { id: bnl })

      commit('DELETE_BIEU_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteBieuNhapLieu', err)
    }
  },

  async restoreBieuNhapLieu({ state, commit }, bnl) {
    const { bieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieu}/restore`, bnl)

      commit('ADD_BIEU_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreBieuNhapLieu', err)
    }
  }
}
