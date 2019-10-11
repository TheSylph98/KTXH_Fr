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
        bieuNhapLieu: '/api/v2/crud/bieunhaplieu'
      },
      bnlList: [],
      deletedbnlList: [],
      bnl: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_BIEU_NHAP_LIEU_LIST: set('bnlList'),
    SET_DELETED_BIEU_NHAP_LIEU: set('deletedbnlList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_BIEU_NHAP_LIEU: set('bnl'),
  
    ADD_BIEU_NHAP_LIEU: add('bieuNhapLieu'),
  
    UPDATE_BIEU_NHAP_LIEU: update('bieuNhapLieu'),
  
    DELETE_BIEU_NHAP_LIEU: remove('bieuNhapLieu'),
  }
  
  export const actions = {
    async getBieuNhapLieuList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/list`, {
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_BIEU_NHAP_LIEU_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getBieuNhapLieuList', err)
      }
    },
  
    async getDeletedBieuNhapLieuList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_BIEU_NHAP_LIEU', data.rows)
      } catch (err) {
        console.log('getBieuNhapLieuList', err)
      }
    },
  
    async getBieuNhapLieu(
      { state, commit },
      id
    ) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/read`, {
          id: id
        })
  
        commit('SET_BIEU_NHAP_LIEU', data.rows)
      } catch (err) {
        console.log('getBieuNhapLieu', err)
      }
    },
  
    async addBieuNhapLieu({ state, commit }, bnl) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/create`, bnl)
  
        commit('ADD_BIEU_NHAP_LIEU', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addBieuNhapLieu', err)
      }
    },
  
    async updateBieuNhapLieu({ state, commit }, bnl) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/update`, bnl)
  
        commit('UPDATE_BIEU_NHAP_LIEU', data)
      } catch (err) {
        console.log('updateBieuNhapLieu', err)
      }
    },
  
    async deleteBieuNhapLieu({ state, commit }, bnl) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/delete`, bnl)
  
        commit('DELETE_BIEU_NHAP_LIEU', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteBieuNhapLieu', err)
      }
    },
  
    async restoreBieuNhapLieu({ state, commit }, bnl) {
      const { bieuNhapLieu } = state.api
  
      try {
        const data = await this.$axios.$post(`${bieuNhapLieu}/restore`, bnl)
  
        commit('ADD_BIEU_NHAP_LIEU', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreBieuNhapLieu', err)
      }
    }
  }
  