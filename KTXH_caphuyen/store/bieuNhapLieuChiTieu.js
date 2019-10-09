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
        bieuNhapLieuChiTieu: '/api/BieuNhapLieu_ChiTieus'
      },
      bnlChiTieuList: [],
      deletedbnlChiTieuList: [],
      bnlChiTieu: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_BIEU_NHAP_LIEU_CHI_TIEU_LIST: set('bnlChiTieuList'),
    SET_DELETED_BIEU_NHAP_LIEU_CHI_TIEU: set('deletedbnlChiTieuList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_BIEU_NHAP_LIEU_CHI_TIEU: set('bnlChiTieu'),

    ADD_BIEU_NHAP_LIEU_CHI_TIEU: add('bieuNhapLieuChiTieu'),

    UPDATE_BIEU_NHAP_LIEU_CHI_TIEU: update('bieuNhapLieuChiTieu'),

    DELETE_BIEU_NHAP_LIEU_CHI_TIEU: remove('bieuNhapLieuChiTieu'),
}

export const actions = {
  async getBieuNhapLieuChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_BIEU_NHAP_LIEU_CHI_TIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuChiTieuList', err)
    }
  },

  async getDeletedBieuNhapLieuChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU_CHI_TIEU', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuChiTieuList', err)
    }
  },

  async getBieuNhapLieuChiTieu(
    { state, commit },
    id
  ) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU_CHI_TIEU', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuChiTieu', err)
    }
  },

  async addBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/create`, bnlChiTieu)

      commit('ADD_BIEU_NHAP_LIEU_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addBieuNhapLieuChiTieu', err)
    }
  },

  async updateBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/update`, bnlChiTieu)

      commit('UPDATE_BIEU_NHAP_LIEU_CHI_TIEU', data)
    } catch (err) {
      console.log('updateBieuNhapLieuChiTieu', err)
    }
  },

  async deleteBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/delete`, bnlChiTieu)

      commit('DELETE_BIEU_NHAP_LIEU_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteBieuNhapLieuChiTieu', err)
    }
  },

  async restoreBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/restore`, bnlChiTieu)

      commit('ADD_BIEU_NHAP_LIEU_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreBieuNhapLieuChiTieu', err)
    }
  }
}
