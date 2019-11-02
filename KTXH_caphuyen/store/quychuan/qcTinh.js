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
      qcTinh: '/api/v2/crud/qctinh'
    },
    tinhList: [],
    searchTinhList: [],
    deletedTinhList: [],
    tinh: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_TINH_LIST: set('tinhList'),

  SET_SEARCH_TINH_LIST: set('searchTinhList'),

  SET_DELETED_TINH: set('deletedTinh'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_TINH: set('tinh'),

  ADD_TINH: add('tinhList'),

  UPDATE_TINH: update('tinhList'),

  DELETE_TINH: removeByIds('tinhList')
}

export const actions = {
  async getTinhList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_TINH_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getTinhList', err)
    }
  },

  async getSearchTinhList(
    { state, commit },
    text
  ) {
    const { qcTinh } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${qcTinh}/list`, queryData)

      commit('SET_SEARCH_TINH_LIST', data.rows)
    } catch (err) {
      console.log('getSearchTinhList', err)
    }
  },

  async getDeletedTinhList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_TINH', data.rows)
    } catch (err) {
      console.log('getTinhList', err)
    }
  },

  async getTinh(
    { state, commit },
    id
  ) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/read`, {
        id: id
      })

      commit('SET_TINH', data)
    } catch (err) {
      console.log('getTinh', err)
    }
  },

  async addTinh({ state, commit }, tinh) {
    const res = { isSuccess: false }
    const { qcTinh } = state.api
    const uuidv1 = require('uuid/v1');

    tinh.uid = uuidv1();
    try {
      const data = await this.$axios.$post(`${qcTinh}/create`, tinh)

      commit('ADD_TINH', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addTinh', err)
    }

    return res
  },

  async updateTinh({ state, commit }, tinh) {
    const res = { isSuccess: false }
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/update`, tinh)

      commit('UPDATE_TINH', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateTinh', err)
    }

    return res
  },

  async deleteTinh({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/delete`, { id: idList })
      if (data) {
        commit('DELETE_TINH', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteTinh', err)
    }

    return res
  },

  async restoreTinh({ state, commit }, tinh) {
    const res = { isSuccess: false }
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/restore`, tinh)

      commit('ADD_TINH', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreTinh', err)
    }

    return res
  }
}
