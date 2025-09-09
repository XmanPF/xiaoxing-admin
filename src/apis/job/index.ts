import request from '@/apis';
import type { HttpResponse, } from '@/apis/types';

/**
 * 获取用户资料
 */
export function submit(payload): Promise<HttpResponse<any>> {
  return request.post('/user',payload);
}
