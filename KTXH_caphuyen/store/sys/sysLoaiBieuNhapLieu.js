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
      sysLoaiBieuNhapLieu: '/api/v2/crud/sysloaibieunhaplieu'
    },
    loaibieunhaplieuList: [],
    searchLoaiBieuNhapLieuList: [],
    deletedloaibieunhaplieuList: [],
    loaibieunhaplieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_LOAI_BIEU_NHAP_LIEU_LIST: set('loaibieunhaplieuList'),

  SET_SEARCH_LOAI_BIEU_NHAP_LIEU_LIST: set('searchLoaiBieuNhapLieuList'),

  SET_DELETED_LOAI_BIEU_NHAP_LIEU: set('deletedloaibieunhaplieuList'),

  SET_PAGINATION: set('pagination'),
  
  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_LOAI_BIEU_NHAP_LIEU: set('loaibieunhaplieu'),

  ADD_LOAI_BIEU_NHAP_LIEU: add('loaibieunhaplieuList'),

  UPDATE_LOAI_BIEU_NHAP_LIEU: update('loaibieunhaplieuList'),

  DELETE_LOAI_BIEU_NHAP_LIEU: remove('loaibieunhaplieuList'),
}

export const actions = {
  async getLoaiBieuNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_LOAI_BIEU_NHAP_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getLoaiBieuNhapLieuList', err)
    }
  },

  async getSearchLoaiBieuNhapLieuList(
    { state, commit },
    text
  ) {
    const { sysLoaiBieuNhapLieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/list`, queryData)

      commit('SET_SEARCH_LOAI_BIEU_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchLoaiBieuNhapLieuList', err)
    }
  },

  async getDeletedLoaiBieuNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_LOAI_BIEU_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getLoaiBieuNhapLieuList', err)
    }
  },

  async getLoaiBieuNhapLieu(
    { state, commit },
    id
  ) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/read`, {
        id: id
      })

      commit('SET_LOAI_BIEU_NHAP_LIEU', data[0])
    } catch (err) {
      console.log('getLoaiBieuNhapLieu', err)
    }
  },

  async addLoaiBieuNhapLieu({ state, commit }, loaibieunhaplieu) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/create`, loaibieunhaplieu)

      commit('ADD_LOAI_BIEU_NHAP_LIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addLoaiBieuNhapLieu', err)
    }
  },

  async updateLoaiBieuNhapLieu({ state, commit }, loaibieunhaplieu) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/update`, loaibieunhaplieu)

      commit('UPDATE_LOAI_BIEU_NHAP_LIEU', {value: data})
    } catch (err) {
      console.log('updateLoaiBieuNhapLieu', err)
    }
  },

  async deleteLoaiBieuNhapLieu({ state, commit }, loaibieunhaplieu) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/delete`, loaibieunhaplieu)

      commit('DELETE_LOAI_BIEU_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteLoaiBieuNhapLieu', err)
    }
  },

  async restoreLoaiBieuNhapLieu({ state, commit }, loaibieunhaplieu) {
    const { sysLoaiBieuNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiBieuNhapLieu}/restore`, loaibieunhaplieu)

      commit('ADD_LOAI_BIEU_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreLoaiBieuNhapLieu', err)
    }
  }
}
