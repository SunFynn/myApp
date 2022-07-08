import type { AnyAction, Dispatch } from 'redux';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { RouterTypes } from 'umi';
import type { UserModelState } from './user';

export interface ConnectState {
  user: UserModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
