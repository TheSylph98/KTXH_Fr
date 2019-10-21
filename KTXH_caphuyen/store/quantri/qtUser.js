import {
  set,
  setPropertyNestedObject,
  add,
  update,
  remove
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

  SET_USER: set('userList'),

  ADD_USER: add('userList'),

  UPDATE_USER: update('userList'),

  DELETE_USER: remove('userList')
}

export const actions = {
  async getUserList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
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
    const { user } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${user}/list`, queryData)

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

      commit('SET_USER', data.rows)
    } catch (err) {
      console.log('getQTUser', err)
    }
  },

  async addQTUser({ state, commit }, user) {
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
    } catch (err) {
      console.log('addQTUser', err)
    }
  },

  async updateQTUser({ state, commit }, user) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/update`, user)

      commit('UPDATE_USER', data)
    } catch (err) {
      console.log('updateQTUser', err)
    }
  },

  async deleteQTUser({ state, commit }, user) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/delete`, user)

      commit('DELETE_USER', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteQTUser', err)
    }
  },

  async restoreQTUser({ state, commit }, user) {
    const { qtUser } = state.api

    try {
      const data = await this.$axios.$post(`${qtUser}/restore`, user)

      commit('ADD_USER', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreQTUser', err)
    }
  }
}

