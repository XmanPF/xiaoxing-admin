import request from '@/apis';
import type { HttpResponse, } from '@/apis/types';


export function submit(payload): Promise<HttpResponse<any>> {
  return request.post('', payload);
}

export function upload(payload): Promise<HttpResponse<any>> {
  return request.post('/api/common/uploadFile', payload);
}

export function getModelList(): Promise<HttpResponse<any>> {
  return request.get('/api/common/models');
}

export function authorization(payload): Promise<HttpResponse<any>> {
  return request.get('/api/user/authorization', { params: payload });
}

export function getPackageList(payload): Promise<HttpResponse<any>> {
  return request.get('/api/business/packagePage', { params: payload });
}

export function uploadPackage(payload): Promise<HttpResponse<any>> {
  return request.post('/api/business/uploadPackage', payload);
}

export function executePackage(payload): Promise<HttpResponse<any>> {
  return request.post('/api/business/execute', payload);
}

export function getResultPage(payload): Promise<HttpResponse<any>> {
  return request.get('/api/business/resultPage', { params: payload });
}