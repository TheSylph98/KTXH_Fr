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
        qtDonViDiaBan: '/api/v2/crud/qtdonvidiaban'
      },
      donViDiaBanList: [],
      searchDonViDiaBanList: [],
      deletedDonViDiaBanList: [],
      donViDiaBan: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_DON_VI_DIA_BAN_LIST: set('donViDiaBanList'),
  
    SET_SEARCH_DON_VI_DIA_BAN_LIST: set('searchDonViDiaBanList'),
  
    SET_DELETED_DON_VI_DIA_BAN: set('deletedDonViDiaBanList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_DON_VI_DIA_BAN: set('donViDiaBan'),
  
    ADD_DON_VI_DIA_BAN: add('donViDiaBanList'),
  
    UPDATE_DON_VI_DIA_BAN: update('donViDiaBanList'),
  
    DELETE_DON_VI_DIA_BAN: removeByIds('donViDiaBanList')
  }
  
  export const actions = {
    async getDonViDiaBanList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { qtDonViDiaBan } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${qtDonViDiaBan}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_DON_VI_DIA_BAN_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getDonViDiaBanList', err)
      }
    },
  
    async getSearchDonViDiaBanList(
      { state, commit },
      text
    ) {
      const { qtDonViDiaBan } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/list`, queryData)
  
        commit('SET_SEARCH_DON_VI_DIA_BAN_LIST', data.rows)
      } catch (err) {
        console.log('getSearchDonViDiaBanList', err)
      }
    },
  
    async getDeletedDonViDiaBanList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qtDonViDiaBan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_DON_VI_DIA_BAN', data.rows)
      } catch (err) {
        console.log('getDeletedDonViDiaBanList', err)
      }
    },
  
    async getQTDonViDiaBan(
      { state, commit },
      id
    ) {
      const { qtDonViDiaBan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/read`, {
          id: id
        })
  
        commit('SET_DON_VI_DIA_BAN', data)
      } catch (err) {
        console.log('getQTDonViDiaBan', err)
      }
    },
  
    async addQTDonViDiaBan({ state, commit }, donViDiaBan) {
      const res = { isSuccess: false }
      const { qtDonViDiaBan } = state.api
      const uuidv1 = require('uuid/v1');
  
      donViDiaBan.uid = uuidv1();
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/create`, donViDiaBan)
  
        commit('ADD_DON_VI_DIA_BAN', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addQTDonViDiaBan', err)
      }
  
      return res
    },
  
    async updateQTDonViDiaBan({ state, commit }, donViDiaBan) {
      const res = { isSuccess: false }
      const { qtDonViDiaBan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/update`, donViDiaBan)
  
        commit('UPDATE_DON_VI_DIA_BAN', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateQTDonViDiaBan', err)
      }
  
      return res
    },
  
    async deleteQTDonViDiaBan({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { qtDonViDiaBan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/delete`, { id: idList })
        if (data) {
          commit('DELETE_DON_VI_DIA_BAN', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteQTDonViDiaBan', err)
      }
  
      return res
    },
  
    async restoreQTDonViDiaBan({ state, commit }, donViDiaBan) {
      const res = { isSuccess: false }
      const { qtDonViDiaBan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtDonViDiaBan}/restore`, donViDiaBan)
  
        commit('ADD_DON_VI_DIA_BAN', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreQTDonViDiaBan', err)
      }
  
      return res
    }
  }
  
  