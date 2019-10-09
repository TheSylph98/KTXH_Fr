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
        chiTieu: '/api/ChiTieus'
      },
      chiTieuList: [],
      deletedChiTieuList: [],
      chi_tieu: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_CHI_TIEU_LIST: set('chiTieuList'),
    SET_DELETED_CHI_TIEU: set('deletedChiTieuList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_CHI_TIEU: set('chi_tieu'),

    ADD_CHI_TIEU: add('chiTieu'),

    UPDATE_CHI_TIEU: update('chiTieu'),

    DELETE_CHI_TIEU: remove('chiTieu')
}

export const actions = {
  async getChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_CHI_TIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getChiTieuList', err)
    }
  },

  async getDeletedChiTieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_CHI_TIEU', data.rows)
    } catch (err) {
      console.log('getDeletedChiTieuList', err)
    }
  },

  async getChiTieu(
    { state, commit },
    id
  ) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/read`, {
        id: id
      })

      commit('SET_CHI_TIEU', data.rows)
    } catch (err) {
      console.log('getChiTieu', err)
    }
  },

  async addChiTieu({ state, commit }, chi_tieu) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/create`, chi_tieu)

      commit('ADD_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addChiTieu', err)
    }
  },

  async updateChiTieu({ state, commit }, chi_tieu) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/update`, chi_tieu)

      commit('UPDATE_CHI_TIEU', data)
    } catch (err) {
      console.log('updateChiTieu', err)
    }
  },

  async deleteChiTieu({ state, commit }, chi_tieu) {
    const { chiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${chiTieu}/delete`, chi_tieu)

      commit('DELETE_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteChiTieu', err)
    }
  },

  async restoreChiTieu({ state, commit }, chi_tieu) {
    const { ChiTieu } = state.api

    try {
      const data = await this.$axios.$post(`${ChiTieu}/restore`, chi_tieu)

      commit('ADD_CHI_TIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreChiTieu', err)
    }
  }
}