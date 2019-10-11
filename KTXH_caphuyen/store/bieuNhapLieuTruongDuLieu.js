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
        bieuNhapLieuTruongDuLieu: '/api/BieuNhapLieu_TruongDuLieus'
      },
      bnlTruongDuLieuList: [],
      deletedbnlTruongDuLieuList: [],
      bnlTruongDuLieu: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_BIEU_NHAP_LIEU_TRUONG_DU_LIEU_LIST: set('bnlTruongDuLieuList'),
    SET_DELETED_BIEU_NHAP_LIEU_TRUONG_DU_LIEU: set('deletedbnlTruongDuLieuList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_BIEU_NHAP_LIEU_TRUONG_DU_LIEU: set('bnlTruongDuLieu'),

    ADD_BIEU_NHAP_LIEU_TRUONG_DU_LIEU: add('bieuNhapLieuTruongDuLieu'),

    UPDATE_BIEU_NHAP_LIEU_TRUONG_DU_LIEU: update('bieuNhapLieuTruongDuLieu'),

    DELETE_BIEU_NHAP_LIEU_TRUONG_DU_LIEU: remove('bieuNhapLieuTruongDuLieu')
}

export const actions = {
  async getBieuNhapLieuTruongDuLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_BIEU_NHAP_LIEU_TRUONG_DU_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuTruongDuLieuList', err)
    }
  },

  async getDeletedBieuNhapLieuTruongDuLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuTruongDuLieuList', err)
    }
  },

  async getBieuNhapLieuTruongDuLieu(
    { state, commit },
    id
  ) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuTruongDuLieu', err)
    }
  },

  async addBieuNhapLieuTruongDuLieu({ state, commit }, bnlTruongDuLieu) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/create`, bnlTruongDuLieu)

      commit('ADD_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addBieuNhapLieuTruongDuLieu', err)
    }
  },

  async updateBieuNhapLieuTruongDuLieu({ state, commit }, bnlTruongDuLieu) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/update`, bnlTruongDuLieu)

      commit('UPDATE_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data)
    } catch (err) {
      console.log('updateBieuNhapLieuTruongDuLieu', err)
    }
  },

  async deleteBieuNhapLieuTruongDuLieu({ state, commit }, bnlTruongDuLieu) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/delete`, bnlTruongDuLieu)

      commit('DELETE_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteBieuNhapLieuTruongDuLieu', err)
    }
  },

  async restoreBieuNhapLieuTruongDuLieu({ state, commit }, bnlTruongDuLieu) {
    const { bieuNhapLieuTruongDuLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongDuLieu}/restore`, bnlTruongDuLieu)

      commit('ADD_BIEU_NHAP_LIEU_TRUONG_DU_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreBieuNhapLieuTruongDuLieu', err)
    }
  }
}
