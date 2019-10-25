import {
  set,
  setPropertyNestedObject,
  add,
  update,
  remove
} from '@/util/actions'

import uuidv1 from 'uuid/v1'

export const state = () => {
  return {
    api: {
      chiTieuNhom: '/api/v2/crud/chitieunhom'
    },
    chiTieuNhomList: [],
    searchChiTieuNhomList: [],
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

  SET_SEARCH_CHI_TIEU_NHOM_LIST: set('searchChiTieuNhomList'),

  SET_DELETED_CHI_TIEU_NHOM: set('deletedChiTieuNhomList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_CHI_TIEU_NHOM: set('chi_tieu_nhom'),

  ADD_CHI_TIEU_NHOM: add('chiTieuNhomList'),

  UPDATE_CHI_TIEU_NHOM: update('chiTieuNhomList'),

  DELETE_CHI_TIEU_NHOM: remove('chiTieuNhomList')
}

export const actions = {
  async getChiTieuNhomList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/list`, {
        queryData: payload.queryData,
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

  async getSearchChiTieuNhomList(
    { state, commit },
    text
  ) {
    const { chiTieuNhom } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/list`, queryData)

      commit('SET_SEARCH_CHI_TIEU_NHOM_LIST', data.rows)
    } catch (err) {
      console.log('getSearchChiTieuNhomList', err)
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

      commit('SET_CHI_TIEU_NHOM', data)
    } catch (err) {
      console.log('getChiTieuNhom', err)
    }
  },

  async addChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const res = { isSuccess: false }
    const { chiTieuNhom } = state.api

    chi_tieu_nhom.uid = uuidv1();
    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/create`, chi_tieu_nhom)

      commit('ADD_CHI_TIEU_NHOM', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addChiTieuNhom', err)
    }

    return res
  },

  async updateChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const res = { isSuccess: false }
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/update`, chi_tieu_nhom)

      commit('UPDATE_CHI_TIEU_NHOM', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateChiTieuNhom', err)
    }

    return res
  },

  async deleteChiTieuNhom({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { chiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuNhom}/delete`, { id: idList })
      if (data) {
        commit('DELETE_CHI_TIEU_NHOM', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteChiTieuNhom', err)
    }

    return res
  },

  async restoreChiTieuNhom({ state, commit }, chi_tieu_nhom) {
    const res = { isSuccess: false }
    const { ChiTieuNhom } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieuNhom}/restore`, chi_tieu_nhom)

      commit('ADD_CHI_TIEU_NHOM', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreChiTieuNhom', err)
    }

    return res
  }
}