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
      chiTieuPhanTo: '/api/v2/crud/chitieuphanto'
    },
    chiTieuPhanToList: [],
    searchChiTieuNhomList: [],
    deletedChiTieuPhanToList: [],
    chi_tieu_phan_to: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_CHI_TIEU_PHAN_TO_LIST: set('chiTieuPhanToList'),

  SET_SEARCH_CHI_TIEU_PHAN_TO_LIST: set('searchChiTieuNhomList'),

  SET_DELETED_CHI_TIEU_PHAN_TO: set('deletedChiTieuPhanToList'),

  SET_PAGINATION: set('pagination'),
  
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_CHI_TIEU_PHAN_TO: set('chi_tieu_phan_to'),

  ADD_CHI_TIEU_PHAN_TO: add('chiTieuPhanToList'),

  UPDATE_CHI_TIEU_PHAN_TO: update('chiTieuPhanToList'),

  DELETE_CHI_TIEU_PHAN_TO: remove('chiTieuPhanToList')
}

export const actions = {
  async getChiTieuPhanToList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_CHI_TIEU_PHAN_TO_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getChiTieuPhanToList', err)
    }
  },

  async getSearchChiTieuPhanToList(
    { state, commit },
    text
  ) {
    const { chiTieuPhanTo } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/list`, queryData)

      commit('SET_SEARCH_CHI_TIEU_PHAN_TO_LIST', data.rows)
    } catch (err) {
      console.log('getSearchChiTieuPhanToList', err)
    }
  },

  async getDeletedChiTieuPhanToList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CHI_TIEU_PHAN_TO', data.rows)
    } catch (err) {
      console.log('getDeletedChiTieuPhanToList', err)
    }
  },

  async getChiTieuPhanTo(
    { state, commit },
    id
  ) {
    const { chiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/read`, {
        id: id
      })

      commit('SET_CHI_TIEU_PHAN_TO', data[0])
    } catch (err) {
      console.log('getChiTieuPhanTo', err)
    }
  },

  async addChiTieuPhanTo({ state, commit }, chi_tieu_phan_to) {
    const { chiTieuPhanTo } = state.api
    const uuidv1 = require('uuid/v1');
    chi_tieu_phan_to.uid = uuidv1();
    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/create`, chi_tieu_phan_to)

      commit('ADD_CHI_TIEU_PHAN_TO', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addChiTieuPhanTo', err)
    }
  },

  async updateChiTieuPhanTo({ state, commit }, chi_tieu_phan_to) {
    const { chiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/update`, chi_tieu_phan_to)

      commit('UPDATE_CHI_TIEU_PHAN_TO', {value: data})
    } catch (err) {
      console.log('updateChiTieuPhanTo', err)
    }
  },

  async deleteChiTieuPhanTo({ state, commit }, chi_tieu_phan_to) {
    const { chiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanTo}/delete`, chi_tieu_phan_to)

      commit('DELETE_CHI_TIEU_PHAN_TO', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteChiTieuPhanTo', err)
    }
  },

  async restoreChiTieuPhanTo({ state, commit }, chi_tieu_phan_to) {
    const { ChiTieuPhanTo } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieuPhanTo}/restore`, chi_tieu_phan_to)

      commit('ADD_CHI_TIEU_PHAN_TO', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreChiTieuPhanTo', err)
    }
  }
}