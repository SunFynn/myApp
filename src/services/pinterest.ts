import { request } from '@/utils/index';

export async function getPinterestList() {
  return request(`/mock/api/pinterest`, {
    method: 'POST',
  });
}
