export default {

  namespace: 'example',

  state: {
    customers: [{value: 554401, label: 'WOODY'}, {value: 554402, label: 'BUZZ'}],
    customer1: [{value: 554401, label: 'xxxx'}, {value: 554402, label: 'zzzzz'}],
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
