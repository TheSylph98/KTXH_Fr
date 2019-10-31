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
      chiTieu: '/api/v2/crud/chitieu'
    },
    chiTieuList: [],
    searchChiTieuList: [],
    deletedChiTieuList: [],
    chi_tieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_CHI_TIEU_LIST: set('chiTieuList'),

  SET_SEARCH_CHI_TIEU_LIST: set('searchChiTieuList'),

  SET_DELETED_CHI_TIEU: set('deletedChiTieuList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_CHI_TIEU: set('chi_tieu'),

  ADD_CHI_TIEU: add('chiTieuList'),

  UPDATE_CHI_TIEU: update('chiTieuList'),

  DELETE_CHI_TIEU: removeByIds('chiTieuList')
}

export const actions = {
  async getChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_CHI_TIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getChiTieuList', err)
    }
  },

  async getSearchChiTieuList(
    { state, commit },
    text
  ) {
    const { chiTieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${chiTieu}/list`, queryData)

      commit('SET_SEARCH_CHI_TIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchChiTieuList', err)
    }
  },

  async getDeletedChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CHI_TIEU', data.rows)
    } catch (err) {
      console.log('getDeletedChiTieuList', err)
    }
  },

  async getChiTieu(
    { state, commit },
    id
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/read`, {
        id: id
      })

      commit('SET_CHI_TIEU', data)
    } catch (err) {
      console.log('getChiTieu', err)
    }
  },

  async addChiTieu({ state, commit }, chi_tieu) {
    const res = { isSuccess: false }
    const { chiTieu } = state.api
    // const uuidv1 = require('uuid/v1');
    chi_tieu.uid = uuidv1();
    chi_tieu.capNhapLieuId = Number(chi_tieu.capNhapLieuId);
    chi_tieu.capTongHopId = Number(chi_tieu.capTongHopId);
    chi_tieu.chiTieuNhomId = Number(chi_tieu.chiTieuNhomId);
    chi_tieu.chiTieuPhanTo = Number(chi_tieu.chiTieuPhanTo);
    if (chi_tieu.chiTieuCha == 0) {
      delete chi_tieu.chiTieuCha
    } else {
      chi_tieu.chiTieuCha = Number(chi_tieu.chiTieuCha)
    };

    try {
      const data = await this.$axios.$post(`${chiTieu}/create`, chi_tieu)

      commit('ADD_CHI_TIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addChiTieu', err)
    }

    return res
  },

  async updateChiTieu({ state, commit }, chi_tieu) {
    const res = { isSuccess: false }
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/update`, chi_tieu)

      commit('UPDATE_CHI_TIEU', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateChiTieu', err)
    }

    return res
  },

  async deleteChiTieu({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/delete`, { id: idList })
      if (data) {
        commit('DELETE_CHI_TIEU', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteChiTieu', err)
    }

    return res
  },

  async restoreChiTieu({ state, commit }, chi_tieu) {
    const res = { isSuccess: false }
    const { ChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieu}/restore`, chi_tieu)

      commit('ADD_CHI_TIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreChiTieu', err)
    }

    return res
  }
}