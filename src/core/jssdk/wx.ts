/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import Defer from '~/core/defer';
import loadScript from '~/core/loadScript';
import { jssdk } from '~/api/scrm';

declare global {
  interface Window {
    wx?: {
      ready: (fn: () => void) => void;
      error: (fn: (err: WxJsApiCallback) => void) => void;
      config: WxJsApiFn<{
        debug?: boolean;
        appId: string;
        timestamp: string;
        nonceStr: string;
        signature: string;
        jsApiList: WxJsApi[];
      }>;
      [api: string]: any;
    };
  }

  type WxJsApi =
    | 'updateAppMessageShareData'
    | 'updateTimelineShareData'
    | 'onMenuShareTimeline'
    | 'onMenuShareAppMessage'
    | 'onMenuShareQQ'
    | 'onMenuShareWeibo'
    | 'onMenuShareQZone'
    | 'startRecord'
    | 'stopRecord'
    | 'onVoiceRecordEnd'
    | 'playVoice'
    | 'pauseVoice'
    | 'stopVoice'
    | 'onVoicePlayEnd'
    | 'uploadVoice'
    | 'downloadVoice'
    | 'chooseImage'
    | 'previewImage'
    | 'uploadImage'
    | 'downloadImage'
    | 'translateVoice'
    | 'getNetworkType'
    | 'openLocation'
    | 'getLocation'
    | 'hideOptionMenu'
    | 'showOptionMenu'
    | 'hideMenuItems'
    | 'showMenuItems'
    | 'hideAllNonBaseMenuItem'
    | 'showAllNonBaseMenuItem'
    | 'closeWindow'
    | 'scanQRCode'
    | 'chooseWXPay'
    | 'openProductSpecificView'
    | 'addCard'
    | 'chooseCard'
    | 'openCard';

  interface WxJsApiCallback {
    errMsg: string;
    [key: string]: any;
  }
  type WxJsApiConfig<T> = {
    [P in keyof T]: T[P];
  } & {
    success?: (res: WxJsApiCallback) => void;
    fail?: (res: WxJsApiCallback) => void;
    complete?: (res: WxJsApiCallback) => void;
    cancel?: (res: WxJsApiCallback) => void;
    trigger?: (res: WxJsApiCallback) => void;
  };
  type WxJsApiFn<T = any> = (config: WxJsApiConfig<T>) => void;
}

const cached: { [url: string]: Defer } = {};

export async function config(jsApiList: WxJsApi[]) {
  const url = window.location.href;
  if (cached[url]) {
    return cached[url].promise;
  }

  cached[url] = new Defer();
  const deferred = cached[url];
  const page = window.location.href.split('#')[0];

  const [params] = await Promise.all([
    jssdk(process.env.REACT_APP_WECHAT_APPID!, page),
    loadScript(process.env.REACT_APP_WECHAT_JSSDK!),
  ]);

  if (!window.wx) {
    throw new Error('Loading Weixin JSSDK failed.');
  }

  window.wx.config({
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList,
  });

  window.wx.ready(deferred.resolve);
  window.wx.error(deferred.reject);

  return deferred.promise;
}
