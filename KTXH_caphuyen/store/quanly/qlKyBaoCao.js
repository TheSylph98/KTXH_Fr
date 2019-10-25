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
      qlKyBaoCao: '/api/v2/crud/qlkybaocao'
    },
    kyBaoCaoList: [],
    searchKyBaoCaoList: [],
    deletedKyBaoCaoList: [],
    kyBaoCao: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_KY_BAO_CAO_LIST: set('kyBaoCaoList'),

  SET_SEARCH_KY_BAO_CAO_LIST: set('searchKyBaoCaoList'),

  SET_DELETED_KY_BAO_CAO: set('deletedKyBaoCao'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_KY_BAO_CAO: set('kyBaoCao'),

  ADD_KY_BAO_CAO: add('kyBaoCaoList'),

  UPDATE_KY_BAO_CAO: update('kyBaoCaoList'),

  DELETE_KY_BAO_CAO: remove('kyBaoCaoList')
}

export const actions = {
  async getKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

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

  async getSearchKyBaoCaoList(
    { state, commit },
    text
  ) {
    const { qlKyBaoCao } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/list`, queryData)

      commit('SET_SEARCH_KY_BAO_CAO_LIST', data.rows)
    } catch (err) {
      console.log('getSearchKyBaoCaoList', err)
    }
  },

  async getDeletedKyBaoCaoList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_KY_BAO_CAO', data.rows)
    } catch (err) {
      console.log('getKyBaoCaoList', err)
    }
  },

  async getKyBaoCao(
    { state, commit },
    id
  ) {
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/read`, {
        id: id
      })

      commit('SET_KY_BAO_CAO', data)
    } catch (err) {
      console.log('getKyBaoCao', err)
    }
  },

  async addKyBaoCao({ state, commit }, kyBaoCao) {
    const res = { isSuccess: false }
    const { qlKyBaoCao } = state.api
    const uuidv1 = require('uuid/v1');

    kyBaoCao.uid = uuidv1();
    kyBaoCao.donViCha = Number(kyBaoCao.donViCha);

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/create`, kyBaoCao)

      commit('ADD_KY_BAO_CAO', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('addKyBaoCao', err)
    }

    return res
  },

  async updateKyBaoCao({ state, commit }, kyBaoCao) {
    const res = { isSuccess: false }
    const { qlKyBaoCao } = state.api


    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/update`, kyBaoCao)

      commit('UPDATE_KY_BAO_CAO', { value: data })
      res.isSuccess = true
    } catch (err) {
      console.log('updateKyBaoCao', err)
    }

    return res
  },

  async deleteKyBaoCao({ state, commit }, idList) {
    const res = { isSuccess: false }
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/delete`, { id: idList })
      if (data) {
        commit('DELETE_KY_BAO_CAO', idList)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - idList.length
        })
        res.isSuccess = true
      }
    } catch (err) {
      console.log('deleteKyBaoCao', err)
    }

    return res
  },

  async restoreKyBaoCao({ state, commit }, kyBaoCao) {
    const res = { isSuccess: false }
    const { qlKyBaoCao } = state.api

    try {
      const data = await this.$axios.$post(`${qlKyBaoCao}/restore`, kyBaoCao)

      commit('ADD_KY_BAO_CAO', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
      res.isSuccess = true
    } catch (err) {
      console.log('restoreKyBaoCao', err)
    }

    return res
  }
}
