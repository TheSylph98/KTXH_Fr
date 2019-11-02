import {
  set,
  setPropertyNestedObject,
  add,
  update,
  removeByIds
} from '@/util/actions'

import uuidv1 from "uuid/v1"

export const state = () => {
  return {
    api: {
      bieuNhapLieuKyBaoCao: '/api/v2/crud/bieunhaplieu-kybaocao'
    },
    bnlKyBaoCaoList: [],
    searchBnlKyBaoCaoList: [],
    deletedbnlKyBaoCaoList: [],
    bnlKyBaoCao: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_BIEU_NHAP_LIEU_KY_BAO_CAO_LIST: set('bnlKyBaoCaoList'),

  SET_SEARCH_BIEU_NHAP_LIEU_KY_BAO_CAO_LIST: set('searchBnlKyBaoCaoList'),

  SET_DELETED_BIEU_NHAP_LIEU_KY_BAO_CAO: set('deletedbnlKyBaoCaoList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_BIEU_NHAP_LIEU_KY_BAO_CAO: set('bnlKyBaoCao'),

  ADD_BIEU_NHAP_LIEU_KY_BAO_CAO: add('bnlKyBaoCaoList'),

  UPDATE_BIEU_NHAP_LIEU_KY_BAO_CAO: update('bnlKyBaoCaoList'),

  DELETE_BIEU_NHAP_LIEU_KY_BAO_CAO: removeByIds('bnlKyBaoCaoList'),
}

export const actions = {
  async getBieuNhapLieuKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }) {
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_BIEU_NHAP_LIEU_KY_BAO_CAO_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuKyBaoCaoList', err)
    }
  },

  async getSearchBieuNhapLieuKyBaoCaoList(
    { state, commit },
    text
  ) {
    const { bieuNhapLieuKyBaoCao } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/list`, queryData)

      commit('SET_SEARCH_BIEU_NHAP_LIEU_KY_BAO_CAO_LIST', data.rows)
    } catch (err) {
      console.log('getSearchBieuNhapLieuKyBaoCaoList', err)
    }
  },

  async getDeletedBieuNhapLieuKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU_KY_BAO_CAO', data.rows)
    } catch (err) {
      console.log('getBieuNhapLieuKyBaoCaoList', err)
    }
  },

  async getBieuNhapLieuKyBaoCao(
    { state, commit },
    id
  ) {
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU_KY_BAO_CAO', data)
    } catch (err) {
      console.log('getBieuNhapLieuKyBaoCao', err)
    }
  },

  async addBieuNhapLieuKyBaoCao({ state, commit }, bnlKyBaoCao) {
    const res = { isSuccess: false }
    const { bieuNhapLieuKyBaoCao } = state.api
    // const uuidv1 = require('uuid/v1');
    bnlKyBaoCao.uid = uuidv1();
    bnlKyBaoCao.bieuNhapLieuId = bnlKyBaoCao.bieuNhapLieuId ? Number(bnlKyBaoCao.bieuNhapLieuId) : bnlKyBaoCao.bieuNhapLieuId
    bnlKyBaoCao.kyBaoCaoId = bnlKyBaoCao.kyBaoCaoId ? Number(bnlKyBaoCao.kyBaoCaoId) : bnlKyBaoCao.kyBaoCaoId


    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/create`, bnlKyBaoCao)

      commit('ADD_BIEU_NHAP_LIEU_KY_BAO_CAO', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addBieuNhapLieuKyBaoCao', err)
    }

    return res
  },

  async updateBieuNhapLieuKyBaoCao({ state, commit }, bnlKyBaoCao) {
    const res = { isSuccess: false }
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/update`, bnlKyBaoCao)

      commit('UPDATE_BIEU_NHAP_LIEU_KY_BAO_CAO', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateBieuNhapLieuKyBaoCao', err)
    }

    return res
  },

  async deleteBieuNhapLieuKyBaoCao({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/delete`, { id: idList })

      if (data) {
        commit('DELETE_BIEU_NHAP_LIEU_KY_BAO_CAO', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteBieuNhapLieuKyBaoCao', err)
    }
  },

  async restoreBieuNhapLieuKyBaoCao({ state, commit }, bnlKyBaoCao) {
    const res = { isSuccess: false }
    const { bieuNhapLieuKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuKyBaoCao}/restore`, bnlKyBaoCao)

      commit('ADD_BIEU_NHAP_LIEU_KY_BAO_CAO', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreBieuNhapLieuKyBaoCao', err)
    }
  }
}
