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
      qtTacNhan: '/api/v2/crud/qttacnhan'
    },
    tacNhanList: [],
    searchTacNhanList: [],
    deletedTacNhanList: [],
    tacNhan: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_TAC_NHAN_LIST: set('tacNhanList'),

  SET_SEARCH_TAC_NHAN_LIST: set('searchTacNhanList'),

  SET_DELETED_TAC_NHAN: set('deletedTacNhanList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_TAC_NHAN: set('tacNhan'),

  ADD_TAC_NHAN: add('tacNhanList'),

  UPDATE_TAC_NHAN: update('tacNhanList'),

  DELETE_TAC_NHAN: removeByIds('tacNhanList')
}

export const actions = {
  async getTacNhanList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_TAC_NHAN_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getTacNhanList', err)
    }
  },

  async getSearchTacNhanList(
    { state, commit },
    text
  ) {
    const { qtTacNhan } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/list`, queryData)

      commit('SET_SEARCH_TAC_NHAN_LIST', data.rows)
    } catch (err) {
      console.log('getSearchTacNhanList', err)
    }
  },

  async getDeletedTacNhanList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_TAC_NHAN', data.rows)
    } catch (err) {
      console.log('getDeletedTacNhanList', err)
    }
  },

  async getQTTacNhan(
    { state, commit },
    id
  ) {
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/read`, {
        id: id
      })

      commit('SET_TAC_NHAN', data)
    } catch (err) {
      console.log('getQTTacNhan', err)
    }
  },

  async addQTTacNhan({ state, commit }, tacNhan) {
    const res = { isSuccess: false }
    const { qtTacNhan } = state.api
    const uuidv1 = require('uuid/v1');

    tacNhan.uid = uuidv1();
    tacNhan.sysCaphanhChinhId = Number(tacNhan.sysCaphanhChinhId);
    try {
      const data = await this.$axios.$post(`${qtTacNhan}/create`, tacNhan)

      commit('ADD_TAC_NHAN', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addQTTacNhan', err)
    }

    return res
  },

  async updateQTTacNhan({ state, commit }, tacNhan) {
    const res = { isSuccess: false }
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/update`, tacNhan)

      commit('UPDATE_TAC_NHAN', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateQTTacNhan', err)
    }

    return res
  },

  async deleteQTTacNhan({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/delete`, { id: idList })
      if (data) {
        commit('DELETE_TAC_NHAN', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteQTTacNhan', err)
    }

    return res
  },

  async restoreQTTacNhan({ state, commit }, tacNhan) {
    const res = { isSuccess: false }
    const { qtTacNhan } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhan}/restore`, tacNhan)

      commit('ADD_TAC_NHAN', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreQTTacNhan', err)
    }

    return res
  }
}

