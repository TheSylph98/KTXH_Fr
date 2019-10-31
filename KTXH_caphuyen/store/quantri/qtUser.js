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
      qtUser: '/api/v2/crud/qtusers'
    },
    userList: [],
    searchUserList: [],
    deletedUserList: [],
    user: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_USER_LIST: set('userList'),

  SET_SEARCH_USER_LIST: set('searchUserList'),

  SET_DELETED_USER: set('deletedUserList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_USER: set('user'),

  ADD_USER: add('userList'),

  UPDATE_USER: update('userList'),

  DELETE_USER: removeByIds('userList')
}

export const actions = {
  async getUserList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_USER_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getUserList', err)
    }
  },

  async getSearchUserList(
    { state, commit },
    text
  ) {
    const { qtUser } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${qtUser}/list`, queryData)

      commit('SET_SEARCH_USER_LIST', data.rows)
    } catch (err) {
      console.log('getSearchUserList', err)
    }
  },

  async getDeletedUserList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_USER', data.rows)
    } catch (err) {
      console.log('getDeletedUserList', err)
    }
  },

  async getQTUser(
    { state, commit },
    id
  ) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/read`, {
        id: id
      })

      commit('SET_USER', data)
    } catch (err) {
      console.log('getQTUser', err)
    }
  },

  async addQTUser({ state, commit }, user) {
    const res = { isSuccess: false }
    const { qtUser } = state.api
    const uuidv1 = require('uuid/v1');

    user.uid = uuidv1();
    user.qtDonViId = Number(user.qtDonViId);
    try {
      const data = await this.$axios.$post(`${qtUser}/create`, user)

      commit('ADD_USER', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addQTUser', err)
    }

    return res
  },

  async updateQTUser({ state, commit }, user) {
    const res = { isSuccess: false }
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/update`, user)

      commit('UPDATE_USER', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateQTUser', err)
    }

    return res
  },

  async deleteQTUser({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/delete`, { id: idList })
      if (data) {
        commit('DELETE_USER', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteQTUser', err)
    }

    return res
  },

  async restoreQTUser({ state, commit }, user) {
    const res = { isSuccess: false }
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/restore`, user)

      commit('ADD_USER', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreQTUser', err)
    }

    return res
  }
}

