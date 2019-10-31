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
      qcXa: '/api/v2/crud/qcxa'
    },
    xaList: [],
    searchXaList: [],
    deletedXaList: [],
    xa: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_XA_LIST: set('xaList'),

  SET_SEARCH_XA_LIST: set('searchXaList'),

  SET_DELETED_XA: set('deletedXa'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_XA: set('xa'),

  ADD_XA: add('xaList'),

  UPDATE_XA: update('xaList'),

  DELETE_XA: removeByIds('xaList')
}

export const actions = {
  async getXaList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_XA_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getXaList', err)
    }
  },

  async getSearchXaList(
    { state, commit },
    text
  ) {
    const { qcXa } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${qcXa}/list`, queryData)

      commit('SET_SEARCH_TINH_LIST', data.rows)
    } catch (err) {
      console.log('getSearchXaList', err)
    }
  },

  async getDeletedXaList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_XA', data.rows)
    } catch (err) {
      console.log('getDeletedXaList', err)
    }
  },

  async getXa(
    { state, commit },
    id
  ) {
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/read`, {
        id: id
      })

      commit('SET_XA', data)
    } catch (err) {
      console.log('getXa', err)
    }
  },

  async addXa({ state, commit }, xa) {
    const res = { isSuccess: false }
    const { qcXa } = state.api
    const uuidv1 = require('uuid/v1');

    xa.uid = uuidv1();
    xa.qcHuyenId = Number(xa.qcHuyenId);

    try {
      const data = await this.$axios.$post(`${qcXa}/create`, xa)

      commit('ADD_XA', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addXa', err)
    }

    return res
  },

  async updateXa({ state, commit }, xa) {
    const res = { isSuccess: false }
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/update`, xa)

      commit('UPDATE_XA', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateXa', err)
    }

    return res
  },

  async deleteXa({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/delete`, { id: idList })
      if (data) {
        commit('DELETE_XA', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteXa', err)
    }

    return res
  },

  async restoreXa({ state, commit }, xa) {
    const res = { isSuccess: false }
    const { qcXa } = state.api

    try {
      const data = await this.$axios.$post(`${qcXa}/restore`, xa)

      commit('ADD_XA', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreXa', err)
    }

    return res
  }
}
