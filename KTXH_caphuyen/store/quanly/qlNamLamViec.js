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
        qlNamLamViec: '/api/v2/crud/qlnamlamviec'
      },
      namLamViecList: [],
      searchNamLamViecList: [],
      deletedNamLamViecList: [],
      namLamViec: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_NAM_LAM_VIEC_LIST: set('namLamViecList'),
  
    SET_SEARCH_NAM_LAM_VIEC_LIST: set('searchNamLamViecList'),
  
    SET_DELETED_NAM_LAM_VIEC: set('deletedNamLamViec'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_NAM_LAM_VIEC: set('namLamViec'),
  
    ADD_NAM_LAM_VIEC: add('namLamViecList'),
  
    UPDATE_NAM_LAM_VIEC: update('namLamViecList'),
  
    DELETE_NAM_LAM_VIEC: removeByIds('namLamViecList')
  }
  
  export const actions = {
    async getNamLamViecList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { qlNamLamViec } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${qlNamLamViec}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_NAM_LAM_VIEC_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getNamLamViecList', err)
      }
    },
  
    async getSearchNamLamViecList(
      { state, commit },
      text
    ) {
      const { qlNamLamViec } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/list`, queryData)
  
        commit('SET_SEARCH_NAM_LAM_VIEC_LIST', data.rows)
      } catch (err) {
        console.log('getSearchNamLamViecList', err)
      }
    },
  
    async getDeletedNamLamViecList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qlNamLamViec } = state.api
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_NAM_LAM_VIEC', data.rows)
      } catch (err) {
        console.log('getNamLamViecList', err)
      }
    },
  
    async getNamLamViec(
      { state, commit },
      id
    ) {
      const { qlNamLamViec } = state.api
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/read`, {
          id: id
        })
  
        commit('SET_NAM_LAM_VIEC', data)
      } catch (err) {
        console.log('getNamLamViec', err)
      }
    },
  
    async addNamLamViec({ state, commit }, namLamViec) {
      const res = { isSuccess: false }
      const { qlNamLamViec } = state.api
      const uuidv1 = require('uuid/v1');
  
      namLamViec.uid = uuidv1();
      
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/create`, namLamViec)
  
        commit('ADD_NAM_LAM_VIEC', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addNamLamViec', err)
      }
  
      return res
    },
  
    async updateNamLamViec({ state, commit }, namLamViec) {
      const res = { isSuccess: false }
      const { qlNamLamViec } = state.api
  
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/update`, namLamViec)
  
        commit('UPDATE_NAM_LAM_VIEC', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateNamLamViec', err)
      }
  
      return res
    },
  
    async deleteNamLamViec({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { qlNamLamViec } = state.api
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/delete`, { id: idList })
        if (data) {
          commit('DELETE_NAM_LAM_VIEC', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteNamLamViec', err)
      }
  
      return res
    },
  
    async restoreNamLamViec({ state, commit }, namLamViec) {
      const res = { isSuccess: false }
      const { qlNamLamViec } = state.api
  
      try {
        const data = await this.$axios.$post(`${qlNamLamViec}/restore`, namLamViec)
  
        commit('ADD_NAM_LAM_VIEC', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreNamLamViec', err)
      }
  
      return res
    }
  }
  