import { request } from '@/utils';

export async function post(params: any) {
  return request('/api/', {
    method: 'POST',
    data: params || {},
  });
}

export async function get(params: any) {
  return request.get(`/api/`, {
    params: params || {},
  });
}
