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
      qtTacNhanChucNangPhanMem: '/api/v2/crud/qttacnhanchucnangphanmem'
    },
    tacNhanChucNangPhanMemList: [],
    deletedTacNhanChucNangPhanMemList: [],
    tacNhanChucNangPhanMem: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_TAC_NHAN_CHUC_NANG_PHAN_MEM_LIST: set('tacNhanChucNangPhanMemList'),
  SET_DELETED_TAC_NHAN_CHUC_NANG_PHAN_MEM: set('deletedTacNhanChucNangPhanMemList'),
  SET_PAGINATION: set('pagination'),
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_TAC_NHAN_CHUC_NANG_PHAN_MEM: set('tacNhanChucNangPhanMem'),

  ADD_TAC_NHAN_CHUC_NANG_PHAN_MEM: add('qtTacNhanChucNangPhanMem'),

  UPDATE_TAC_NHAN_CHUC_NANG_PHAN_MEM: update('qtTacNhanChucNangPhanMem'),

  DELETE_TAC_NHAN_CHUC_NANG_PHAN_MEM: remove('qtTacNhanChucNangPhanMem')
}

export const actions = {
  async getTacNhanChucNangPhanMemList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_TAC_NHAN_CHUC_NANG_PHAN_MEM_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getTacNhanChucNangPhanMemList', err)
    }
  },

  async getDeletedTacNhanChucNangPhanMemList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_TAC_NHAN_CHUC_NANG_PHAN_MEM', data.rows)
    } catch (err) {
      console.log('getDeletedTacNhanChucNangPhanMemList', err)
    }
  },

  async getQTTacNhanChucNangPhanMem(
    { state, commit },
    id
  ) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/read`, {
        id: id
      })

      commit('SET_TAC_NHAN_CHUC_NANG_PHAN_MEM', data.rows)
    } catch (err) {
      console.log('getQTTacNhanChucNangPhanMem', err)
    }
  },

  async addQTTacNhanChucNangPhanMem({ state, commit }, tacNhanChucNangPhanMem) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/create`, tacNhanChucNangPhanMem)

      commit('ADD_TAC_NHAN_CHUC_NANG_PHAN_MEM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addQTTacNhanChucNangPhanMem', err)
    }
  },

  async updateQTTacNhanChucNangPhanMem({ state, commit }, tacNhanChucNangPhanMem) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/update`, tacNhanChucNangPhanMem)

      commit('UPDATE_TAC_NHAN_CHUC_NANG_PHAN_MEM', data)
    } catch (err) {
      console.log('updateQTTacNhanChucNangPhanMem', err)
    }
  },

  async deleteQTTacNhanChucNangPhanMem({ state, commit }, tacNhanChucNangPhanMem) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/delete`, tacNhanChucNangPhanMem)

      commit('DELETE_TAC_NHAN_CHUC_NANG_PHAN_MEM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteQTTacNhanChucNangPhanMem', err)
    }
  },

  async restoreQTTacNhanChucNangPhanMem({ state, commit }, tacNhanChucNangPhanMem) {
    const { qtTacNhanChucNangPhanMem } = state.api

    try {
      const data = await this.$axios.$post(`${qtTacNhanChucNangPhanMem}/restore`, tacNhanChucNangPhanMem)

      commit('ADD_TAC_NHAN_CHUC_NANG_PHAN_MEM', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreQTTacNhanChucNangPhanMem', err)
    }
  }
}

