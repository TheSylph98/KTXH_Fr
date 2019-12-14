import {
  set,
  setPropertyNestedObject,
  add,
  update,
  removeByIds
} from '@/util/actions'

import uuidv1 from 'uuid/v1'

export const state = () => {
  return {
    api: {
      bieuNhapLieuTruongNhapLieu: '/api/v2/crud/bieunhaplieu-truongnhaplieu'
    },
    bnlTruongNhapLieuList: [],
    searchBnlTruongNhapLieuList: [],
    deletedbnlTruongNhapLieuList: [],
    bnlTruongNhapLieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU_LIST: set('bnlTruongNhapLieuList'),

  SET_SEARCH_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU_LIST: set('searchBnlTruongNhapLieuList'),

  SET_DELETED_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU: set('deletedbnlTruongNhapLieuList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU: set('bnlTruongNhapLieu'),

  ADD_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU: add('bnlTruongNhapLieuList'),

  UPDATE_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU: update('bnlTruongNhapLieuList'),

  DELETE_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU: removeByIds('bnlTruongNhapLieuList')
}

export const actions = {
  async getBieuNhapLieuTruongNhapLieuList(
    { state, commit },
    payload = { queryData: {}, page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const  whereData  = { where: payload.queryData }
      
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/list`, {
        queryData: whereData,
        page: payload.page,
        pageSize: payload.pageSize
      })

      commit('SET_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getBieuNhapLieuTruongNhapLieuList', err)
    }
  },

  async getSearchBieuNhapLieuTruongNhapLieuList(
    { state, commit },
    text
  ) {
    const { bieuNhapLieuTruongNhapLieu } = state.api

    let queryData = {}
    if (text) {
      queryData ={ where: { ten: { regexp: `^${text}` } } }
    }

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/list`, queryData)

      commit('SET_SEARCH_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchBieuNhapLieuTruongNhapLieuList', err)
    }
  },

  async getDeletedBieuNhapLieuTruongNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getDeletedBieuNhapLieuTruongNhapLieuList', err)
    }
  },

  async getBieuNhapLieuTruongNhapLieu(
    { state, commit },
    id
  ) {
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/read`, {
        id: id
      })

      commit('SET_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', data)
    } catch (err) {
      console.log('getBieuNhapLieuTruongNhapLieu', err)
    }
  },

  async addBieuNhapLieuTruongNhapLieu({ state, commit }, bnlTruongNhapLieu) {
    const res = { isSuccess: false }

    const { bieuNhapLieuTruongNhapLieu } = state.api
    bnlTruongNhapLieu.bieuNhapLieuId = bnlTruongNhapLieu.bieuNhapLieuId ? Number(bnlTruongNhapLieu.bieuNhapLieuId) : bnlTruongNhapLieu.bieuNhapLieuId
    bnlTruongNhapLieu.truongNhapLieuId = bnlTruongNhapLieu.truongNhapLieuId ? Number(bnlTruongNhapLieu.truongNhapLieuId) : bnlTruongNhapLieu.truongNhapLieuId
    bnlTruongNhapLieu.uid = uuidv1()
    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/create`, bnlTruongNhapLieu)

      commit('ADD_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })

      res.isSuccess = true
    } catch (err) {
      console.log('addBieuNhapLieuTruongNhapLieu', err)
    }

    return res
  },

  async updateBieuNhapLieuTruongNhapLieu({ state, commit }, bnlTruongNhapLieu) {
    const res = { isSuccess: false }
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/update`, bnlTruongNhapLieu)

      commit('UPDATE_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateBieuNhapLieuTruongNhapLieu', err)
    }

    return res
  },

  async deleteBieuNhapLieuTruongNhapLieu({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/delete`, { id: idList })

      if (data) {
        commit('DELETE_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteBieuNhapLieuTruongNhapLieu', err)
    }
  },

  async restoreBieuNhapLieuTruongNhapLieu({ state, commit }, bnlTruongNhapLieu) {
    const res = { isSuccess: false }
    const { bieuNhapLieuTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuTruongNhapLieu}/restore`, bnlTruongNhapLieu)

      commit('ADD_BIEU_NHAP_LIEU_TRUONG_NHAP_LIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })

      res.isSuccess = true
    } catch (err) {
      console.log('restoreBieuNhapLieuTruongNhapLieu', err)
    }

    return res
  }
}
