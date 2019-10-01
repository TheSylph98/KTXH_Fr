import {
    set,
    setPropertyNestedObject,
    add,
    update,
    remove
  } from '../util/actions'

  export const state = () => {
    return {
      api: {
        bieuNhapLieuChiTieu: '/api/'
      },
      bnlChiTieuList: [],
      deletedbnlChiTieuList: [],
      bnlChiTieu: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }

export const mutations = {
    SET_BIEU_NHAP_LIEU_CHI_TIEU_LIST: set('bnlCiTieuList'),
    SET_DELETED_BIEU_NHAP_LIEU_CHI_TIEU: set('deletedbnlChiTieuList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),

    SET_KY_BAO_CAO: set('bnlChiTieu'),

    ADD_KY_BAO_CAO: add('bieuNhapLieuChiTieu'),

    UPDATE_KY_BAO_CAO: update('bieuNhapLieuChiTieu'),

    DELETE_KY_BAO_CAO: remove('bieuNhapLieuChiTieu')
}

