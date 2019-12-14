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
        sysLoaiBaoCao: '/api/v2/crud/sysloaibaocao'
      },
      loaiBaoCaoList: [],
      searchLoaiBaoCaoList: [],
      deletedLoaiBaoCaoList: [],
      loaibc: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_LOAI_BAO_CAO_LIST: set('loaiBaoCaoList'),
  
    SET_SEARCH_LOAI_BAO_CAO_LIST: set('searchLoaiBaoCaoList'),
  
    SET_DELETED_LOAI_BAO_CAO: set('deletedLoaiBaoCaoList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_LOAI_BAO_CAO: set('loaibc'),
  
    ADD_LOAI_BAO_CAO: add('loaiBaoCaoList'),
  
    UPDATE_LOAI_BAO_CAO: update('loaiBaoCaoList'),
  
    DELETE_LOAI_BAO_CAO: removeByIds('loaiBaoCaoList')
  }
  
  export const actions = {
    async getLoaiBaoCaoList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { sysLoaiBaoCao } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_LOAI_BAO_CAO_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getLoaiBaoCaoList', err)
      }
    },
  
    async getSearchLoaiBaoCaoList(
      { state, commit },
      text
    ) {
      const { sysLoaiBaoCao } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/list`, queryData)
  
        commit('SET_SEARCH_LOAI_BAO_CAO_LIST', data.rows)
      } catch (err) {
        console.log('getSearchLoaiBaoCaoList', err)
      }
    },
  
    async getDeletedLoaiBaoCaoList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysLoaiBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_LOAI_BAO_CAO', data.rows)
      } catch (err) {
        console.log('getDeletedLoaiBaoCaoList', err)
      }
    },
  
    async getLoaiBaoCao(
      { state, commit },
      id
    ) {
      const { sysLoaiBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/read`, {
          id: id
        })
  
        commit('SET_LOAI_BAO_CAO', data)
      } catch (err) {
        console.log('getLoaiBaoCao', err)
      }
    },
  
    async addLoaiBaoCao({ state, commit }, loaibc) {
      const res = { isSuccess: false }
      const { sysLoaiBaoCao } = state.api
    
      loaibc.uid = uuidv1();
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/create`, loaibc)
  
        commit('ADD_LOAI_BAO_CAO', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addLoaiBaoCao', err)
      }
  
      return res
    },
  
    async updateLoaiBaoCao({ state, commit }, loaibc) {
      const res = { isSuccess: false }
      const { sysLoaiBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/update`, loaibc)
        commit('UPDATE_LOAI_BAO_CAO', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateLoaiBaoCao', err)
      }
  
      return res
    },
  
    async deleteLoaiBaoCao({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { sysLoaiBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/delete`, { id: idList })
        if (data) {
          commit('DELETE_LOAI_BAO_CAO', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteLoaiBaoCao', err)
      }
  
      return res
    },
  
    async restoreLoaiBaoCao({ state, commit }, loaibc) {
      const res = { isSuccess: false }
      const { sysLoaiBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiBaoCao}/restore`, loaibc)
  
        commit('ADD_LOAI_BAO_CAO', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreLoaiBaoCao', err)
      }
  
      return res
    }
  }