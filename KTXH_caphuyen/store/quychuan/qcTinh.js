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
      qcTinh: '/api/v2/crud/qctinh'
    },
    tinhList: [],
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
  SET_DELETED_TINH: set('deletedTinh'),
  SET_PAGINATION: set('pagination'),
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_TINH: set('tinh'),

  ADD_TINH: add('qcTinh'),

  UPDATE_TINH: update('qcTinh'),

  DELETE_TINH: remove('qcTinh')
}

export const actions = {
  async getTinhList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.data.rows)
      commit('SET_TINH_LIST', data.data.rows)
      commit('SET_PAGINATION', {
        total: data.data.total,
        page: data.data.page,
        pageSize: data.data.pageSize
      })
    } catch (err) {
      console.log('getTinhList', err)
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

      commit('SET_DELETED_TINH', data.data.rows)
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

      commit('SET_TINH', data.data.rows)
    } catch (err) {
      console.log('getTinh', err)
    }
  },

  async addTinh({ state, commit }, tinh) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/create`, tinh)

      commit('ADD_TINH', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addTinh', err)
    }
  },

  async updateTinh({ state, commit }, tinh) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/update`, tinh)

      commit('UPDATE_TINH', data)
    } catch (err) {
      console.log('updateTinh', err)
    }
  },

  async deleteTinh({ state, commit }, tinh) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/delete`, tinh)

      commit('DELETE_TINH', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteTinh', err)
    }
  },

  async restoreTinh({ state, commit }, tinh) {
    const { qcTinh } = state.api

    try {
      const data = await this.$axios.$post(`${qcTinh}/restore`, tinh)

      commit('ADD_TINH', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreTinh', err)
    }
  }
}
