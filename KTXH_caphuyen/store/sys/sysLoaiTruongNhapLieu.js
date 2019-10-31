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
      sysLoaiTruongNhapLieu: '/api/v2/crud/sysloaitruongnhaplieu'
    },
    loaitruongnhaplieuList: [],
    searchLoaiTruongNhapLieuList: [],
    deletedloaitruongnhaplieuList: [],
    loaitruongnhaplieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_LOAI_TRUONG_NHAP_LIEU_LIST: set('loaitruongnhaplieuList'),

  SET_SEARCH_LOAI_TRUONG_NHAP_LIEU_LIST: set('searchLoaiTruongNhapLieuList'),

  SET_DELETED_LOAI_TRUONG_NHAP_LIEU: set('deletedloaitruongnhaplieuList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_LOAI_TRUONG_NHAP_LIEU: set('loaitruongnhaplieu'),

  ADD_LOAI_TRUONG_NHAP_LIEU: add('loaitruongnhaplieuList'),

  UPDATE_LOAI_TRUONG_NHAP_LIEU: update('loaitruongnhaplieuList'),

  DELETE_LOAI_TRUONG_NHAP_LIEU: removeByIds('loaitruongnhaplieuList'),
}

export const actions = {
  async getLoaiTruongNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/list`, {
        queryData: payload.queryData,
        page: payload.page,
        pageSize: payload.pageSize

      })

      commit('SET_LOAI_TRUONG_NHAP_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getLoaiTruongNhapLieuList', err)
    }
  },

  async getSearchLoaiTruongNhapLieuList(
    { state, commit },
    text
  ) {
    const { sysLoaiTruongNhapLieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/list`, queryData)

      commit('SET_SEARCH_LOAI_TRUONG_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchLoaiTruongNhapLieuList', err)
    }
  },

  async getDeletedLoaiTruongNhapLieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_LOAI_TRUONG_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getLoaiTruongNhapLieuList', err)
    }
  },

  async getLoaiTruongNhapLieu(
    { state, commit },
    id
  ) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/read`, {
        id: id
      })

      commit('SET_LOAI_TRUONG_NHAP_LIEU', data)
    } catch (err) {
      console.log('getLoaiTruongNhapLieu', err)
    }
  },

  async addLoaiTruongNhapLieu({ state, commit }, loaitruongnhaplieu) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/create`, loaitruongnhaplieu)

      commit('ADD_LOAI_TRUONG_NHAP_LIEU', { newEl: data })
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addLoaiTruongNhapLieu', err)
    }
  },

  async updateLoaiTruongNhapLieu({ state, commit }, loaitruongnhaplieu) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/update`, loaitruongnhaplieu)

      commit('UPDATE_LOAI_TRUONG_NHAP_LIEU', { value: data })
    } catch (err) {
      console.log('updateLoaiTruongNhapLieu', err)
    }
  },

  async deleteLoaiTruongNhapLieu({ state, commit }, loaitruongnhaplieu) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/delete`, { id: loaitruongnhaplieu })

      commit('DELETE_LOAI_TRUONG_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteLoaiTruongNhapLieu', err)
    }
  },

  async restoreLoaiTruongNhapLieu({ state, commit }, loaitruongnhaplieu) {
    const { sysLoaiTruongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${sysLoaiTruongNhapLieu}/restore`, loaitruongnhaplieu)

      commit('ADD_LOAI_TRUONG_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreLoaiTruongNhapLieu', err)
    }
  }
}
