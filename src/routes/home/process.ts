import Points from '@byhealth/points';
import { createParams } from './process.d';
import { success } from '~/mockdata/antifakeresult';
import s from './Home.scss';

let points = {};

const API = {
  antifakecode: `${process.env.REACT_APP_API_SCRM}/antifakecode/antifakecodeIntegral`,
  bindPhone: `${process.env.REACT_APP_API_SCRM}/auth/consumer/loginByPhone`,
  sendValidateCode: `${process.env.REACT_APP_API_SCRM}/message/sendValidateCode`,
};

/**
 * 创建积分模块
 * @param params 积分参数
 * @param targetId 挂载id
 * @param history router history
 */
export const createPoint = (params: createParams, targetId: string, history: object) => {
  points = new Points({
    targetId,
    API,
    data: params,
    disabledPhone: true,
    handleError: (error) => handleError({ history, error }),
    onSubmit: (result) => handleResult({ history, result }),
  });

  (points as any).message.state.style.content.borderRadius = '0.4rem';
  return points;
};

/**
 * 通过防伪码检查品牌品类
 * @param antifakecode 防伪码
 */
export const checkBandType = () =>
  new Promise((resolve) => {
    console.log('检查当前防伪码品类');
    resolve(true);
  });

/**
 * 处理错误积分结果
 * 检查品类为品牌扫码品类时代理积分结果。其他品类交还积分模块处理
 * @param param0 处理积分结果
 */
export const handleError = async ({ error = {}, history }: any) => {
  // 不要求跳结果页错误交由points处理
  if (!error.detail?.extInfo?.jump) {
    throw error;
  }

  let isType: any = false;
  try {
    isType = await checkBandType();
  } catch (error) {}

  if (isType) {
    showRestltModal(success);
    // 处理品类
    // history.push(`/certified/${(points as any).$data.antifakecode}`);
    return;
  } else {
    throw error;
  }
};

/**
 * 处理正确积分结果
 * 检查品类为品牌扫码品类时代理积分结果。其他品类交还积分模块处理
 * @param param0 处理积分结果
 */
export const handleResult = async ({ result = {}, history }: any) => {
  let isType: any = false;
  try {
    isType = await checkBandType();
  } catch (error) {}

  if (isType) {
    history.push(`/certified/${result.antifakecode}`);
    return;
  }

  showRestltModal(result);
};

/**
 * 积分成功处理
 * @param data 积分成功结果
 */
export const showRestltModal = (data: any) => {
  return (points as any).message
    .create({
      header: '<h3>防伪积分</h3>',
      article: `<div class="by-health-points-message_content">
    <h4 class="by-health-points-message_icon_absolutely">您查询的是${data.brandName || ''}正品</h4>
    本次真伪查询获得${data.points}分<br/><br/>
    </div>`,
      footer: `<button id="${s.messagebutton}" class="by-health-points-message_button">确定</button>`,
    })
    .then(() => {
      const btn = document.getElementById(s.messagebutton);
      if (btn) {
        btn.onclick = () => (points as any).message.remove();
      }
    });
};
