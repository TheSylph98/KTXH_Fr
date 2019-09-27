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
      qlKyBaoCao: '/api/QLKyBaoCaos'
    },
    kyBaoCaoList: [],
    deletedKyBaoCaoList: [],
    qlKyBaoCao: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_KY_BAO_CAO_LIST: set('kyBaoCaoList'),
  SET_DELETED_KY_BAO_CAO: set('deletedKyBaoCao'),
  SET_PAGINATION: set('pagination'),
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  ADD_KY_BAO_CAO: add('qlKyBaoCao'),

  UPDATE_KY_BAO_CAO: update('qlKyBaoCao'),

  DELETE_KY_BAO_CAO: remove('qlKyBaoCao')
}

export const actions = {
  async getKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_KY_BAO_CAO_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getKyBaoCaoList', err)
    }
  },

  async getDeletedKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/delete-list`, {
        params: {
          page: payload.page,
          pageSize: payload.pageSize
        }
      })

      commit('SET_DELETED_KY_BAO_CAO', data.rows)
    } catch (err) {
      console.log('getKyBaoCaoList', err)
    }
  },

  async addKyBaoCao({ state, commit }, kyBaoCao) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/create`, kyBaoCao)

      commit('ADD_KY_BAO_CAO', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addKyBaoCao', err)
    }
  },

  async updateKyBaoCao({ state, commit }, kyBaoCao) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/update`, kyBaoCao)

      commit('UPDATE_KY_BAO_CAO', data)
    } catch (err) {
      console.log('updateKyBaoCao', err)
    }
  },

  async deleteKyBaoCao({ state, commit }, kyBaoCao) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/delete`, kyBaoCao)

      commit('DELETE_KY_BAO_CAO', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteKyBaoCao', err)
    }
  },

  async restoreKyBaoCao({ state, commit }, kyBaoCao) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/restore`, kyBaoCao)

      commit('ADD_KY_BAO_CAO', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreKyBaoCao', err)
    }
  }
}
