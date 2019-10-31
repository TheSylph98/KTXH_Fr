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
      sysCapHanhChinh: '/api/v2/crud/syscaphanhchinh'
    },
    caphanhchinhList: [],
    searchCapHanhChinhList: [],
    deletedcaphanhchinhList: [],
    caphanhchinh: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_CAP_HANH_CHINH_LIST: set('caphanhchinhList'),

  SET_CAP_HANH_CHINH_LIST: set('searchCapHanhChinhList'),

  SET_DELETED_CAP_HANH_CHINH: set('deletedcaphanhchinhList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_CAP_HANH_CHINH: set('caphanhchinh'),

  ADD_CAP_HANH_CHINH: add('caphanhchinhList'),

  UPDATE_CAP_HANH_CHINH: update('caphanhchinhList'),

  DELETE_CAP_HANH_CHINH: removeByIds('caphanhchinhList'),
}

export const actions = {
  async getCapHanhChinhList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_CAP_HANH_CHINH_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getCapHanhChinhList', err)
    }
  },

  async getSearchCapHanhChinhList(
    { state, commit },
    text
  ) {
    const { sysCapHanhChinh } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/list`, queryData)

      commit('SET_CAP_HANH_CHINH_LIST', data.rows)
    } catch (err) {
      console.log('getSearchCapHanhChinhList', err)
    }
  },

  async getDeletedCapHanhChinhList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CAP_HANH_CHINH', data.rows)
    } catch (err) {
      console.log('getCapHanhChinhList', err)
    }
  },

  async getCapHanhChinh(
    { state, commit },
    id
  ) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/read`, {
        id: id
      })

      commit('SET_CAP_HANH_CHINH', data)
    } catch (err) {
      console.log('getCapHanhChinh', err)
    }
  },

  async addCapHanhChinh({ state, commit }, caphanhchinh) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/create`, caphanhchinh)

      commit('ADD_CAP_HANH_CHINH', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addCapHanhChinh', err)
    }
  },

  async updateCapHanhChinh({ state, commit }, caphanhchinh) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/update`, caphanhchinh)

      commit('UPDATE_CAP_HANH_CHINH', { value: data })
    } catch (err) {
      console.log('updateCapHanhChinh', err)
    }
  },

  async deleteCapHanhChinh({ state, commit }, caphanhchinh) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/delete`, { id: caphanhchinh })

      commit('DELETE_CAP_HANH_CHINH', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteCapHanhChinh', err)
    }
  },

  async restoreCapHanhChinh({ state, commit }, caphanhchinh) {
    const { sysCapHanhChinh } = state.api

    try {
      const data = await this.$axios.$post(`${sysCapHanhChinh}/restore`, caphanhchinh)

      commit('ADD_CAP_HANH_CHINH', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreCapHanhChinh', err)
    }
  }
}
