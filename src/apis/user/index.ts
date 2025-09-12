import request from '@/apis';
import type { HttpResponse, PageParams, PageResult } from '@/apis/types';
import type { UserRecord } from '@/apis/user/types';

/**
 * 获取用户资料
 */
export function addUser(params): Promise<HttpResponse<UserRecord>> {
  return request.post('/api/user/add', params);
}

/**
 * 获取用户列表
 */
export function getUsers(params?: any): Promise<PageResult<any>> {
  return request.get('/api/user/page',
    params
  );
}

export function delUser(params): Promise<HttpResponse<void>> {
  return request.get(`/api/user/delete`,
    params,
  );
}

/**
 * 获取用户资料
 */
export function editUser(params): Promise<HttpResponse<UserRecord>> {
  return request.post('/api/user/update', params);
}
