import {
    set,
    setPropertyNestedObject,
    add,
    update,
    remove
  } from '../util/actions'

  export const state = () => {
    return {
      api: {
        qtUser: '/api/QTUsers'
      },
      userList: [],
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
    SET_DELETED_USER: set('deletedUserList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_USER: set('user'),

    ADD_USER: add('qtUser'),

    UPDATE_USER: update('qtUser'),

    DELETE_USER: remove('qtUser')
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

    try {
      const data = await this.$axios.$post(`${qtUser}/create`, user)

      commit('ADD_USER', data)
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

