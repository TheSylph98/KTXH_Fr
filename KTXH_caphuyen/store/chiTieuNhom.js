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
        chiTieuNhom: '/api/ChiTieuNhoms'
      },
      chiTieuNhomList: [],
      deletedChiTieuNhomList: [],
      chi_tieu_nhom: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_CHI_TIEU_NHOM_LIST: set('chiTieuNhomList'),
    SET_DELETED_CHI_TIEU_NHOM: set('deletedChiTieuNhomList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_CHI_TIEU_NHOM: set('chi_tieu_nhom'),

    ADD_CHI_TIEU_NHOM: add('chiTieuNhom'),

    UPDATE_CHI_TIEU_NHOM: update('chiTieuNhom'),

    DELETE_CHI_TIEU_NHOM: remove('chiTieuNhom')
}

export const actions = {
  async getChiTieuNhomList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_CHI_TIEU_NHOM_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getChiTieuNhomList', err)
    }
  },

  async getDeletedChiTieuNhomList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CHI_TIEU_NHOM', data.rows)
    } catch (err) {
      console.log('getDeletedChiTieuNhomList', err)
    }
  },

  async getChiTieuNhom(
    { state, commit },
    id
  ) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/read`, {
        id: id
      })

      commit('SET_CHI_TIEU_NHOM', data.rows)
    } catch (err) {
      console.log('getChiTieuNhom', err)
    }
  },

  async addChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/create`, chi_tieu_nhom)

      commit('ADD_CHI_TIEU_NHOM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addChiTieuNhom', err)
    }
  },

  async updateChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/update`, chi_tieu_nhom)

      commit('UPDATE_CHI_TIEU_NHOM', data)
    } catch (err) {
      console.log('updateChiTieuNhom', err)
    }
  },

  async deleteChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/delete`, chi_tieu_nhom)

      commit('DELETE_CHI_TIEU_NHOM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteChiTieuNhom', err)
    }
  },

  async restoreChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const { ChiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieuNhom}/restore`, chi_tieu_nhom)

      commit('ADD_CHI_TIEU_NHOM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreChiTieuNhom', err)
    }
  }
}