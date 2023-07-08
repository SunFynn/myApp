import request from '@/utils/request';
import { stringify } from 'qs';

// 用户信息
export async function query({ name }: { name: string }): Promise<any> {
  return {
    code: '200',
    data: {
      username: name,
    },
    message: 'success',
  };
}

// 用户权限
export async function queryCurrent({ name }: { name: string }) {
  return {
    code: '200',
    data: {
      typeStr: name === 'admin' ? '超管用户' : '普通用户',
    },
    message: 'success',
  };
}
