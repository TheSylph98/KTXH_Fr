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
        sysLoaiDonViHanhChinh: '/api/v2/crud/sysloaidonvihanhchinh'
      },
      loaiDonViHanhChinhList: [],
      searchLoaiDonViHanhChinhList: [],
      deletedLoaiDonViHanhChinhList: [],
      loaidvhc: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_LOAI_DON_VI_HANH_CHINH_LIST: set('loaiDonViHanhChinhList'),
  
    SET_SEARCH_LOAI_DON_VI_HANH_CHINH_LIST: set('searchLoaiDonViHanhChinhList'),
  
    SET_DELETED_LOAI_DON_VI_HANH_CHINH: set('deletedLoaiDonViHanhChinhList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_LOAI_DON_VI_HANH_CHINH: set('loaidvhc'),
  
    ADD_LOAI_DON_VI_HANH_CHINH: add('loaiDonViHanhChinhList'),
  
    UPDATE_LOAI_DON_VI_HANH_CHINH: update('loaiDonViHanhChinhList'),
  
    DELETE_LOAI_DON_VI_HANH_CHINH: removeByIds('loaiDonViHanhChinhList')
  }
  
  export const actions = {
    async getLoaiDonViHanhChinhList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const whereData = { where: payload.queryData}
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_LOAI_DON_VI_HANH_CHINH_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getLoaiDonViHanhChinhList', err)
      }
    },
  
    async getSearchLoaiDonViHanhChinhList(
      { state, commit },
      text
    ) {
      const { sysLoaiDonViHanhChinh } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/list`, queryData)
  
        commit('SET_SEARCH_LOAI_DON_VI_HANH_CHINH_LIST', data.rows)
      } catch (err) {
        console.log('getSearchLoaiDonViHanhChinhList', err)
      }
    },
  
    async getDeletedLoaiDonViHanhChinhList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_LOAI_DON_VI_HANH_CHINH', data.rows)
      } catch (err) {
        console.log('getDeletedLoaiDonViHanhChinhList', err)
      }
    },
  
    async getLoaiDonViHanhChinh(
      { state, commit },
      id
    ) {
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/read`, {
          id: id
        })
  
        commit('SET_LOAI_DON_VI_HANH_CHINH', data)
      } catch (err) {
        console.log('getLoaiDonViHanhChinh', err)
      }
    },
  
    async addLoaiDonViHanhChinh({ state, commit }, loaidvhc) {
      const res = { isSuccess: false }
      const { sysLoaiDonViHanhChinh } = state.api
    
      loaidvhc.uid = uuidv1();
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/create`, loaidvhc)
  
        commit('ADD_LOAI_DON_VI_HANH_CHINH', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addLoaiDonViHanhChinh', err)
      }
  
      return res
    },
  
    async updateLoaiDonViHanhChinh({ state, commit }, loaidvhc) {
      const res = { isSuccess: false }
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/update`, loaidvhc)
        commit('UPDATE_LOAI_DON_VI_HANH_CHINH', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateLoaiDonViHanhChinh', err)
      }
  
      return res
    },
  
    async deleteLoaiDonViHanhChinh({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/delete`, { id: idList })
        if (data) {
          commit('DELETE_LOAI_DON_VI_HANH_CHINH', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteLoaiDonViHanhChinh', err)
      }
  
      return res
    },
  
    async restoreLoaiDonViHanhChinh({ state, commit }, loaidvhc) {
      const res = { isSuccess: false }
      const { sysLoaiDonViHanhChinh } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysLoaiDonViHanhChinh}/restore`, loaidvhc)
  
        commit('ADD_LOAI_DON_VI_HANH_CHINH', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreLoaiDonViHanhChinh', err)
      }
  
      return res
    }
  }