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
      qtDonViDiaBan: '/api/v2/crud/qtdonvidiaban'
    },
    donViDiaBanList: [],
  }
}

export const mutations = {
  SET_DON_VI_DIA_BAN_LIST: set('donViDiaBanList')
}

export const actions = {
  async getDonViDiaBanListByDonViId(
    { state, commit },
    qtDonViId
  ) {
    const { qtDonViDiaBan } = state.api

    try {
      const whereData = { where: { qtDonViId: qtDonViId } }
      const data = await this.$axios.$post(`${qtDonViDiaBan}/list`, {
        queryData: whereData,
      })

      commit('SET_DON_VI_DIA_BAN_LIST', data.rows)
    } catch (err) {
      console.log('getDonViDiaBanListByDonViId', err)
    }
  },

  async chooseQTDonViDiaBanList({ state, dispatch }, payload) {
    const res = { isSuccess: false }
    const { qtDonViDiaBan } = state.api

    try {
      const data = await this.$axios.$post(`${qtDonViDiaBan}/newUpdate`, { queryData: payload })

      if (data) {
        res.isSuccess = true
        dispatch("getDonViDiaBanList", payload.qtDonViId)
      }
    } catch (err) {
      console.log('chooseQTDonViDiaBanList', err)
    }

    return res
  }
}

