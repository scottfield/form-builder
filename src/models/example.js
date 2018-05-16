const customer1 = [{value: 554401, label: 'xxxx'}, {value: 554402, label: 'zzzzz'}];
export default {

  namespace: 'example',

  state: {
    customers: [{value: 554401, label: 'WOODY'}, {value: 554402, label: 'BUZZ'}],
    customer1: customer1,
    custNo: 554401,
    groupName: 'xxxx',
    custGroupName: 554401,
    allocType: null,
    parts: null,
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
    r_updateCustomer1(state, action) {
      return {...state, customer1: customer1.filter(item => item.value === action.payload)};
    },
    r_updateState(state, action) {
      return {...state, [action.payload.name]: action.payload.value};
    }
  },

};
