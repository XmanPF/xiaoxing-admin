import request from '@/apis';
import { LoginData, LoginResult } from '@/apis/auth/types';
import { HttpResponse } from '@/apis/types';

/**
 * 用户登录
 * @param data
 */
export function login(data: any): Promise<HttpResponse<LoginResult>> {
  return request.get('/api/system/login', {params: data});
}


/**
 * 注销登录
 */
export function logout() {
  return request.post('/api/system/logout');
}
