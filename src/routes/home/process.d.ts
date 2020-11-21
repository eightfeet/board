export interface createParams {
  /**
   *   Int	memberId与phone二选一，已登陆传消费者会员id，未登陆或未注册传入消费者手机号码
   */
  memberId?: number;
  /**
   *   memberId与phone二选一，已登陆传消费者会员id，未登陆或未注册传入消费者手机号码
   */
  phone?: string;
  /**
   *   防伪码
   */
  antifakecode?: string;
  /**
   *   门店Id，默认传1-WAZ25
   */
  storeId?: string;
  /**
   *   店员Id，如线下门店的积分传入店员员工ID
   */
  clerkId?: string;
  /**
   *   渠道表，详情查看渠道备注，默认传1
   */
  channelType?: string | number;
  /**
   *   积分备注
   */
  comment?: string;
  /**
   *   身份类型
   */
  identityType?: string;
  /**
   *   品牌 ，TCBJ:汤臣倍健 LS：life-space 非必填，默认TCBJ
   */
  brand?: string;
  /**
   *   绑定手机时必传
   */
  openid?: string;
  /**
   *   账户类型，绑定手机时openid有传入时才需要传，没有传openid则不传
   */
  accountType?: string;
}
