import {
  set,
  setPropertyNestedObject,
  add,
  update,
  removeByIds
} from '@/util/actions'

export const state = () => {
  return {
    api: {
      chiTieuPhanToChiTiet: '/api/v2/crud/chitieuphantochitiet'
    },
    chiTieuPhanToChiTietList: [],
    searchChiTieuPhanToChiTietList: [],
    deletedChiTieuPhanToChiTietList: [],
    chi_tieu_phan_to_chi_tiet: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_CHI_TIEU_PHAN_TO_CHI_TIET_LIST: set('chiTieuPhanToChiTietList'),

  SET_SEARCH_CHI_TIEU_PHAN_TO_CHI_TIET_LIST: set('searchChiTieuPhanToChiTietList'),

  SET_DELETED_CHI_TIEU_PHAN_TO_CHI_TIET: set('deletedChiTieuPhanToChiTietList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_CHI_TIEU_PHAN_TO_CHI_TIET: set('chi_tieu_phan_to_chi_tiet'),

  ADD_CHI_TIEU_PHAN_TO_CHI_TIET: add('chiTieuPhanToChiTietList'),

  UPDATE_CHI_TIEU_PHAN_TO_CHI_TIET: update('chiTieuPhanToChiTietList'),

  DELETE_CHI_TIEU_PHAN_TO_CHI_TIET: removeByIds('chiTieuPhanToChiTietList')
}

export const actions = {
  async getChiTieuPhanToChiTietList(
    { state, commit },
    payload = { queryData: {}, page: 0, pageSize: 20 }
  ) {
    const { chiTieuPhanToChiTiet } = state.api

    try {
      const whereData = {where: payload.queryData}
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/list`, {
        queryData: whereData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_CHI_TIEU_PHAN_TO_CHI_TIET_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getChiTieuPhanToChiTietList', err)
    }
  },

  async getSearchChiTieuPhanToChiTietList(
    { state, commit },
    text
  ) {
    const { chiTieuPhanToChiTiet } = state.api

    let queryData = {}
    if (text) {
      queryData = {where: { ten: { regexp: `^${text}` } }}
    }

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/list`, queryData)

      commit('SET_SEARCH_CHI_TIEU_PHAN_TO_CHI_TIET_LIST', data.rows)
    } catch (err) {
      console.log('getSearchChiTieuPhanToChiTietList', err)
    }
  },

  async getDeletedChiTieuPhanToChiTietList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieuPhanToChiTiet } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CHI_TIEU_PHAN_TO_CHI_TIET', data.rows)
    } catch (err) {
      console.log('getDeletedChiTieuPhanToChiTietList', err)
    }
  },

  async getChiTieuPhanToChiTiet(
    { state, commit },
    id
  ) {
    const { chiTieuPhanToChiTiet } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/read`, {
        id: id
      })

      commit('SET_CHI_TIEU_PHAN_TO_CHI_TIET', data)
    } catch (err) {
      console.log('getChiTieuPhanToChiTiet', err)
    }
  },

  async addChiTieuPhanToChiTiet({ state, commit }, chi_tieu_phan_to_chi_tiet) {
    const res = { isSuccess: false }
    const { chiTieuPhanToChiTiet } = state.api
    const uuidv1 = require('uuid/v1');
    chi_tieu_phan_to_chi_tiet.uid = uuidv1();
    chi_tieu_phan_to_chi_tiet.chiTieuPhanToId = chi_tieu_phan_to_chi_tiet.chiTieuPhanToId ? Number(chi_tieu_phan_to_chi_tiet.chiTieuPhanToId) : chi_tieu_phan_to_chi_tiet.chiTieuPhanToId;

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/create`, chi_tieu_phan_to_chi_tiet)

      commit('ADD_CHI_TIEU_PHAN_TO_CHI_TIET', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addChiTieuPhanToChiTiet', err)
    }

    return res
  },

  async updateChiTieuPhanToChiTiet({ state, commit }, chi_tieu_phan_to_chi_tiet) {
    const res = { isSuccess: false }
    const { chiTieuPhanToChiTiet } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/update`, chi_tieu_phan_to_chi_tiet)

      commit('UPDATE_CHI_TIEU_PHAN_TO_CHI_TIET', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateChiTieuPhanToChiTiet', err)
    }

    return res
  },

  async deleteChiTieuPhanToChiTiet({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { chiTieuPhanToChiTiet } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieuPhanToChiTiet}/delete`, { id: idList })
      if (data) {
        commit('DELETE_CHI_TIEU_PHAN_TO_CHI_TIET', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteChiTieuPhanToChiTiet', err)
    }

    return res
  },

  async restoreChiTieuPhanToChiTiet({ state, commit }, chi_tieu_phan_to_chi_tiet) {
    const res = { isSuccess: false }
    const { ChiTieuPhanToChiTiet } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieuPhanToChiTiet}/restore`, chi_tieu_phan_to_chi_tiet)

      commit('ADD_CHI_TIEU_PHAN_TO_CHI_TIET', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreChiTieuPhanToChiTiet', err)
    }

    return res
  }
}