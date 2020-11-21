/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import request from '~/core/request';

/**
 * 微信JSSDK授权
 * @param appId
 * @param url
 */
export function jssdk(appId: string, url: string) {
  return request.post<{
    signature: string;
    appId: string;
    url: string;
    nonceStr: string;
    timestamp: string;
  }>(
    process.env.REACT_APP_API_JSSDK!,
    { appId, url },
    {
      type: 'form',
      mode: 'cors',
    },
  );
}

/**
 * 文件上传
 * @param blob
 * @param filename
 */
export function upload(blob: Blob, filename: string) {
  const formData = new FormData();
  formData.append('file', blob, filename);

  return request.post<{
    success: 'true' | 'false';
    fileUrl: string;
  }>(process.env.REACT_APP_API_UPLOAD!, formData, {
    type: 'file',
    mode: 'cors',
  });
}
