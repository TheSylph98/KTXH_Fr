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
      bieuNhapLieuChiTieu: '/api/v2/crud/bieunhaplieu-chitieu'
    },
    bnlChiTieuList: [],
    searchBnlChiTieuList: [],
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

  SET_SEARCH_BIEU_NHAP_LIEU_CHI_TIEU_LIST: set('searchBnlChiTieuList'),

  SET_DELETED_BIEU_NHAP_LIEU_CHI_TIEU: set('deletedbnlChiTieuList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_BIEU_NHAP_LIEU_CHI_TIEU: set('bnlChiTieu'),

  ADD_BIEU_NHAP_LIEU_CHI_TIEU: add('bnlChiTieuList'),

  UPDATE_BIEU_NHAP_LIEU_CHI_TIEU: update('bnlChiTieuList'),

  DELETE_BIEU_NHAP_LIEU_CHI_TIEU: removeByIds('bnlChiTieuList'),
}

export const actions = {
  async getBieuNhapLieuChiTieuList(
    { state, commit },
    payload = { queryData: {}, page: 0, pageSize: 20 }
  ) {
    const { bieuNhapLieuChiTieu } = state.api

    console.log("querydata", payload.queryData)

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize
      })

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

  async getSearchBieuNhapLieuList(
    { state, commit },
    text
  ) {
    const { bieuNhapLieuChiTieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/list`, queryData)

      commit('SET_SEARCH_BIEU_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchBieuNhapLieuList', err)
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

      commit('SET_BIEU_NHAP_LIEU_CHI_TIEU', data)
    } catch (err) {
      console.log('getBieuNhapLieuChiTieu', err)
    }
  },

  async addBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const res = { isSuccess: false }

    const { bieuNhapLieuChiTieu } = state.api
    bnlChiTieu.uid = uuidv1();

    bnlChiTieu.bieuNhapLieuId = bnlChiTieu.bieuNhapLieuId ? Number(bnlChiTieu.bieuNhapLieuId) : bnlChiTieu.bieuNhapLieuId
    bnlChiTieu.chiTieuId = bnlChiTieu.chiTieuId ? Number(bnlChiTieu.chiTieuId) : bnlChiTieu.chiTieuId = bnlChiTieu.chiTieuId


    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/create`, bnlChiTieu)

      commit('ADD_BIEU_NHAP_LIEU_CHI_TIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addBieuNhapLieuChiTieu', err)
    }

    return res
  },

  async updateBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const res = { isSuccess: false }
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/update`, bnlChiTieu)

      commit('UPDATE_BIEU_NHAP_LIEU_CHI_TIEU', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateBieuNhapLieuChiTieu', err)
    }

    return res
  },

  async deleteBieuNhapLieuChiTieu({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/delete`, idList)
      if (data) {
        commit('DELETE_BIEU_NHAP_LIEU_CHI_TIEU', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteBieuNhapLieuChiTieu', err)
    }

    return res
  },

  async restoreBieuNhapLieuChiTieu({ state, commit }, bnlChiTieu) {
    const res = { isSuccess: false }
    const { bieuNhapLieuChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${bieuNhapLieuChiTieu}/restore`, bnlChiTieu)

      commit('ADD_BIEU_NHAP_LIEU_CHI_TIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreBieuNhapLieuChiTieu', err)
    }

    return res
  }
}
