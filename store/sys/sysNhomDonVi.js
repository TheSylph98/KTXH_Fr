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
        sysNhomDonVi: '/api/v2/crud/sysnhomdonvi'
      },
      nhomDonViList: [],
      searchNhomDonViList: [],
      deletedNhomDonViList: [],
      nhomdv: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_NHOM_DON_VI_LIST: set('nhomDonViList'),
  
    SET_SEARCH_NHOM_DON_VI_LIST: set('searchNhomDonViList'),
  
    SET_DELETED_NHOM_DON_VI: set('deletedNhomDonViList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_NHOM_DON_VI: set('nhomdv'),
  
    ADD_NHOM_DON_VI: add('nhomDonViList'),
  
    UPDATE_NHOM_DON_VI: update('nhomDonViList'),
  
    DELETE_NHOM_DON_VI: removeByIds('nhomDonViList')
  }
  
  export const actions = {
    async getNhomDonViList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { sysNhomDonVi } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${sysNhomDonVi}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_NHOM_DON_VI_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getNhomDonViList', err)
      }
    },
  
    async getSearchNhomDonViList(
      { state, commit },
      text
    ) {
      const { sysNhomDonVi } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/list`, queryData)
  
        commit('SET_SEARCH_NHOM_DON_VI_LIST', data.rows)
      } catch (err) {
        console.log('getSearchNhomDonViList', err)
      }
    },
  
    async getDeletedNhomDonViList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysNhomDonVi } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_NHOM_DON_VI', data.rows)
      } catch (err) {
        console.log('getDeletedNhomDonViList', err)
      }
    },
  
    async getNhomDonVi(
      { state, commit },
      id
    ) {
      const { sysNhomDonVi } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/read`, {
          id: id
        })
  
        commit('SET_NHOM_DON_VI', data)
      } catch (err) {
        console.log('getNhomDonVi', err)
      }
    },
  
    async addNhomDonVi({ state, commit }, nhomdv) {
      const res = { isSuccess: false }
      const { sysNhomDonVi } = state.api
    
      nhomdv.uid = uuidv1();
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/create`, nhomdv)
  
        commit('ADD_NHOM_DON_VI', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addNhomDonVi', err)
      }
  
      return res
    },
  
    async updateNhomDonVi({ state, commit }, nhomdv) {
      const res = { isSuccess: false }
      const { sysNhomDonVi } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/update`, nhomdv)
        commit('UPDATE_NHOM_DON_VI', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateNhomDonVi', err)
      }
  
      return res
    },
  
    async deleteNhomDonVi({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { sysNhomDonVi } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/delete`, { id: idList })
        if (data) {
          commit('DELETE_NHOM_DON_VI', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteNhomDonVi', err)
      }
  
      return res
    },
  
    async restoreNhomDonVi({ state, commit }, nhomdv) {
      const res = { isSuccess: false }
      const { sysNhomDonVi } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysNhomDonVi}/restore`, nhomdv)
  
        commit('ADD_NHOM_DON_VI', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreNhomDonVi', err)
      }
  
      return res
    }
  }