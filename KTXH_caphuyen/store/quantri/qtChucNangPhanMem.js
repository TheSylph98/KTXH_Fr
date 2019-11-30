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
        qtChucNangPhamMem: '/api/v2/crud/qtchucnangphanmem'
      },
      chucNangPhamMemList: [],
      searchChucNangPhamMemList: [],
      deletedChucNangPhamMemList: [],
      chucNangPhamMem: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_CHUC_NANG_PHAN_MEM_LIST: set('chucNangPhamMemList'),
  
    SET_SEARCH_CHUC_NANG_PHAN_MEM_LIST: set('searchChucNangPhamMemList'),
  
    SET_DELETED_CHUC_NANG_PHAN_MEM: set('deletedChucNangPhamMemList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_CHUC_NANG_PHAN_MEM: set('chucNangPhamMem'),
  
    ADD_CHUC_NANG_PHAN_MEM: add('chucNangPhamMemList'),
  
    UPDATE_CHUC_NANG_PHAN_MEM: update('chucNangPhamMemList'),
  
    DELETE_CHUC_NANG_PHAN_MEM: removeByIds('chucNangPhamMemList')
  }
  
  export const actions = {
    async getChucNangPhamMemList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { qtChucNangPhamMem } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_CHUC_NANG_PHAN_MEM_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getChucNangPhamMemList', err)
      }
    },
  
    async getSearchChucNangPhamMemList(
      { state, commit },
      text
    ) {
      const { qtChucNangPhamMem } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/list`, queryData)
  
        commit('SET_SEARCH_CHUC_NANG_PHAN_MEM_LIST', data.rows)
      } catch (err) {
        console.log('getSearchChucNangPhamMemList', err)
      }
    },
  
    async getDeletedChucNangPhamMemList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qtChucNangPhamMem } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_CHUC_NANG_PHAN_MEM', data.rows)
      } catch (err) {
        console.log('getDeletedChucNangPhamMemList', err)
      }
    },
  
    async getQTChucNangPhamMem(
      { state, commit },
      id
    ) {
      const { qtChucNangPhamMem } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/read`, {
          id: id
        })
  
        commit('SET_CHUC_NANG_PHAN_MEM', data)
      } catch (err) {
        console.log('getQTChucNangPhamMem', err)
      }
    },
  
    async addQTChucNangPhamMem({ state, commit }, chucNangPhamMem) {
      const res = { isSuccess: false }
      const { qtChucNangPhamMem } = state.api
      const uuidv1 = require('uuid/v1');
  
      chucNangPhamMem.uid = uuidv1();
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/create`, chucNangPhamMem)
  
        commit('ADD_CHUC_NANG_PHAN_MEM', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addQTChucNangPhamMem', err)
      }
  
      return res
    },
  
    async updateQTChucNangPhamMem({ state, commit }, chucNangPhamMem) {
      const res = { isSuccess: false }
      const { qtChucNangPhamMem } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/update`, chucNangPhamMem)
  
        commit('UPDATE_CHUC_NANG_PHAN_MEM', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateQTChucNangPhamMem', err)
      }
  
      return res
    },
  
    async deleteQTChucNangPhamMem({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { qtChucNangPhamMem } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/delete`, { id: idList })
        if (data) {
          commit('DELETE_CHUC_NANG_PHAN_MEM', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteQTChucNangPhamMem', err)
      }
  
      return res
    },
  
    async restoreQTChucNangPhamMem({ state, commit }, chucNangPhamMem) {
      const res = { isSuccess: false }
      const { qtChucNangPhamMem } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtChucNangPhamMem}/restore`, chucNangPhamMem)
  
        commit('ADD_CHUC_NANG_PHAN_MEM', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreQTChucNangPhamMem', err)
      }
  
      return res
    }
  }
  
  