import type { Effect } from 'dva';
import type { Reducer } from 'redux';
import { queryCurrent, query as queryUsers } from '@/services/user';

export interface UserModelState {
  username?: string; // 用户名
  userUtils?: string; // 用户权限
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    username: '',
    userUtils: '普通用户',
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(() => queryUsers({ name: _.payload.name }));
      yield put({
        type: 'saveUser',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(() => queryCurrent({ name: _.payload.name }));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      const { data = {} } = payload || {};
      const { username } = data;
      return {
        ...state,
        User: data,
        username,
      };
    },
    saveCurrentUser(state, { payload }) {
      const { data = {}, msg } = payload || {};
      console.log(msg);
      const { typeStr } = data;
      return {
        ...state,
        currentUser: data,
        userUtils: typeStr,
      };
    },
  },
};

export default UserModel;
