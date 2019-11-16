import {
    set,
    setPropertyNestedObject,
    add,
    update,
    removeByIds
  } from '@/util/actions'
  import uuidv1 from 'uuid/v1'
  
  export const state = () => {
    return {
      api: {
        sysTrangThaiDongMo: '/api/v2/crud/systrangthaidongmo'
      },
      trangThaiDongMoList: [],
      searchTrangThaiDongMoList: [],
      deletedTrangThaiDongMoList: [],
      trangThaiDM: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_TRANG_THAI_DONG_MO_LIST: set('trangThaiDongMoList'),
  
    SET_SEARCH_TRANG_THAI_DONG_MO_LIST: set('searchTrangThaiDongMoList'),
  
    SET_DELETED_TRANG_THAI_DONG_MO: set('deletedTrangThaiDongMoList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_TRANG_THAI_DONG_MO: set('trangThaiDM'),
  
    ADD_TRANG_THAI_DONG_MO: add('trangThaiDongMoList'),
  
    UPDATE_TRANG_THAI_DONG_MO: update('trangThaiDongMoList'),
  
    DELETE_TRANG_THAI_DONG_MO: removeByIds('trangThaiDongMoList')
  }
  
  export const actions = {
    async getTrangThaiDongMoList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_TRANG_THAI_DONG_MO_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getTrangThaiDongMoList', err)
      }
    },
  
    async getSearchTrangThaiDongMoList(
      { state, commit },
      text
    ) {
      const { sysTrangThaiDongMo } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/list`, queryData)
  
        commit('SET_SEARCH_TRANG_THAI_DONG_MO_LIST', data.rows)
      } catch (err) {
        console.log('getSearchTrangThaiDongMoList', err)
      }
    },
  
    async getDeletedTrangThaiDongMoList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_TRANG_THAI_DONG_MO', data.rows)
      } catch (err) {
        console.log('getDeletedTrangThaiDongMoList', err)
      }
    },
  
    async getTrangThaiDongMo(
      { state, commit },
      id
    ) {
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/read`, {
          id: id
        })
  
        commit('SET_TRANG_THAI_DONG_MO', data)
      } catch (err) {
        console.log('getTrangThaiDongMo', err)
      }
    },
  
    async addTrangThaiDongMo({ state, commit }, trangThaiDM) {
      const res = { isSuccess: false }
      const { sysTrangThaiDongMo } = state.api
    
      trangThaiDM.uid = uuidv1();
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/create`, trangThaiDM)
  
        commit('ADD_TRANG_THAI_DONG_MO', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addTrangThaiDongMo', err)
      }
  
      return res
    },
  
    async updateTrangThaiDongMo({ state, commit }, trangThaiDM) {
      const res = { isSuccess: false }
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/update`, trangThaiDM)
        commit('UPDATE_TRANG_THAI_DONG_MO', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateTrangThaiDongMo', err)
      }
  
      return res
    },
  
    async deleteTrangThaiDongMo({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/delete`, { id: idList })
        if (data) {
          commit('DELETE_TRANG_THAI_DONG_MO', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteTrangThaiDongMo', err)
      }
  
      return res
    },
  
    async restoreTrangThaiDongMo({ state, commit }, trangThaiDM) {
      const res = { isSuccess: false }
      const { sysTrangThaiDongMo } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysTrangThaiDongMo}/restore`, trangThaiDM)
  
        commit('ADD_TRANG_THAI_DONG_MO', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreTrangThaiDongMo', err)
      }
  
      return res
    }
  }