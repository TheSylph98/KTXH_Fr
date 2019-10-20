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
      truongNhapLieu: '/api/v2/crud/truongnhaplieu'
    },
    truongnhaplieuList: [],
    searchTruongNhapLieuList: [],
    deletedtruongnhaplieuList: [],
    truongnhaplieu: {},
    pagination: {
      page: '',
      pageSize: '',
      total: ''
    }
  }
}

export const mutations = {
  SET_TRUONG_NHAP_LIEU_LIST: set('truongnhaplieuList'),

  SET_SEARCH_TRUONG_NHAP_LIEU_LIST: set('searchTruongNhapLieuList'),

  SET_DELETED_TRUONG_NHAP_LIEU: set('deletedtruongnhaplieuList'),

  SET_PAGINATION: set('pagination'),

  SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

  SET_TRUONG_NHAP_LIEU: set('truongnhaplieuList'),

  ADD_TRUONG_NHAP_LIEU: add('truongnhaplieuList'),

  UPDATE_TRUONG_NHAP_LIEU: update('truongnhaplieuList'),

  DELETE_TRUONG_NHAP_LIEU: remove('truongnhaplieuList'),
}

export const actions = {
  async getTruongNhaplieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/list`, {
        page: payload.page,
        pageSize: payload.pageSize

      })

      console.log("data", data.rows)
      commit('SET_TRUONG_NHAP_LIEU_LIST', data.rows)
      commit('SET_PAGINATION', {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize
      })
    } catch (err) {
      console.log('getTruongNhaplieuList', err)
    }
  },

  async getSearchTruongNhaplieuList(
    { state, commit },
    text
  ) {
    const { truongNhapLieu } = state.api

    let queryData = {}
    if (text) {
      queryData = { ten: { regexp: `^${text}` } }
    }

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/list`, queryData)

      commit('SET_SEARCH_TRUONG_NHAP_LIEU_LIST', data.rows)
    } catch (err) {
      console.log('getSearchTruongNhaplieuList', err)
    }
  },

  async getDeletedTruongNhaplieuList(
    { state, commit },
    payload = { page: 0, pageSize: 20 }
  ) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/delete-list`, {
        page: payload.page,
        pageSize: payload.pageSize
      }
      )

      commit('SET_DELETED_TRUONG_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getTruongNhaplieuList', err)
    }
  },

  async getTruongNhaplieu(
    { state, commit },
    id
  ) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/read`, {
        id: id
      })

      commit('SET_TRUONG_NHAP_LIEU', data.rows)
    } catch (err) {
      console.log('getTruongNhaplieu', err)
    }
  },

  async addTruongNhaplieu({ state, commit }, truongnhaplieu) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/create`, truongnhaplieu)

      commit('ADD_TRUONG_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('addTruongNhaplieu', err)
    }
  },

  async updateTruongNhaplieu({ state, commit }, truongnhaplieu) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/update`, truongnhaplieu)

      commit('UPDATE_TRUONG_NHAP_LIEU', data)
    } catch (err) {
      console.log('updateTruongNhaplieu', err)
    }
  },

  async deleteTruongNhaplieu({ state, commit }, truongnhaplieu) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/delete`, truongnhaplieu)

      commit('DELETE_TRUONG_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total - 1
      })
    } catch (err) {
      console.log('deleteTruongNhaplieu', err)
    }
  },

  async restoreTruongNhaplieu({ state, commit }, truongnhaplieu) {
    const { truongNhapLieu } = state.api

    try {
      const data = await this.$axios.$post(`${truongNhapLieu}/restore`, truongnhaplieu)

      commit('ADD_TRUONG_NHAP_LIEU', data)
      commit('SET_PAGINATION_KEY', {
        property: 'total',
        value: state.pagination.total + 1
      })
    } catch (err) {
      console.log('restoreTruongNhaplieu', err)
    }
  }
}
