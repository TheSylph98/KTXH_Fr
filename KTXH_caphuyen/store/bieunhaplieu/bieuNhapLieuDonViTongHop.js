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
      bieuNhapLieuDonViTongHop: '/api/v2/crud/bieunhaplieu-donvitonghop'
    },
    bnlDonViTongHopList: [],
    deletedbnlDonViTongHopList: [],
    bnlDonViTongHop: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_BIEU_NHAP_LIEU_DON_VI_TONG_HOP_LIST: set('bnlDonViTongHopList'),
  SET_DELETED_BIEU_NHAP_LIEU_DON_VI_TONG_HOP: set('deletedbnlDonViTongHopList'),
  SET_PAGINATION: set('pagination'),
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_BIEU_NHAP_LIEU_DON_VI_TONG_HOP: set('bnlDonViTongHop'),

  ADD_BIEU_NHAP_LIEU_DON_VI_TONG_HOP: add('bieuNhapLieuDonViTongHop'),

  UPDATE_BIEU_NHAP_LIEU_DON_VI_TONG_HOP: update('bieuNhapLieuDonViTongHop'),

  DELETE_BIEU_NHAP_LIEU_DON_VI_TONG_HOP: remove('bieuNhapLieuDonViTongHop'),
}

export const actions = {
  async getBieuNhapLieuDonViTongHopList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_BIEU_NHAP_LIEU_DON_VI_TONG_HOP_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuDonViTongHopList', err)
    }
  },

  async getDeletedBieuNhapLieuDonViTongHopList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuDonViTongHopList', err)
    }
  },

  async getBieuNhapLieuDonViTongHop(
    { state, commit },
    id
  ) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuDonViTongHop', err)
    }
  },

  async addBieuNhapLieuDonViTongHop({ state, commit }, bnlDonViTongHop) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/create`, bnlDonViTongHop)

      commit('ADD_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addBieuNhapLieuDonViTongHop', err)
    }
  },

  async updateBieuNhapLieuDonViTongHop({ state, commit }, bnlDonViTongHop) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/update`, bnlDonViTongHop)

      commit('UPDATE_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data)
    } catch (err) {
      console.log('updateBieuNhapLieuDonViTongHop', err)
    }
  },

  async deleteBieuNhapLieuDonViTongHop({ state, commit }, bnlDonViTongHop) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/delete`, bnlDonViTongHop)

      commit('DELETE_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteBieuNhapLieuDonViTongHop', err)
    }
  },

  async restoreBieuNhapLieuDonViTongHop({ state, commit }, bnlDonViTongHop) {
    const { bieuNhapLieuDonViTongHop } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuDonViTongHop}/restore`, bnlDonViTongHop)

      commit('ADD_BIEU_NHAP_LIEU_DON_VI_TONG_HOP', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreBieuNhapLieuDonViTongHop', err)
    }
  }
}
