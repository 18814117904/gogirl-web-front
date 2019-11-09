import request from '../config/request.js';
import config from '../config/config';

export const AddOrder = params => 
    request('POST', config.order + 'ordermanage/addOrderManageByUser', params);

export const ModifyOrder = params => 
    request('POST', config.order + 'ordermanage/modifyOrderServe', params);

/**
 * 工作台
 */

// 预约个数
export const QueryScheduleSummary = params => 
    request('GET', config.order + 'schedule/queryScheduleSummary', params);
// 订单、订单金额、待收款
export const QueryOrderSummary = params => 
    request('GET', config.order + 'ordermanage/queryOrderSummary', params);

// 客单价
export const CountCustomerUnitPrice = params => 
    request('GET', config.user + 'countCustomerUnitPrice', params);

// 会员卡、开卡金额、新增客户
export const CountCustomerInfo = params => 
    request('GET', config.user + 'countCustomerInfo', params);

// 待办事项
// 预约
export const QueryTodaySummary = params => 
    request('GET', config.order + 'schedule/queryTodaySummary', params);

// 售后
export const QueryOrderReminder = params => 
    request('GET', config.order + 'ordermanage/queryOrderReminder', params);

// 订单数据填写
export const QueryOrderData = params => 
    request('GET', config.order + 'ordermanage/queryOrderData', params);

// 采购待收货订单
export const WaitToRecieve = params => 
    request('GET', config.purchase + 'order/countToBeReceived', params);

// 还未录入资料的会员countUnRecordCustomerInfoNum
export const UnRecordCustomerInfoNum = params => 
    request('GET', config.user + 'countUnRecordCustomerInfoNum', params);

// 待确认收款的订单
export const QueryReceivable = params => 
    request('GET', config.order + 'ordermanage/queryReceivable', params);

/**
 * 
 *  预约
 */
// 服务类型
export const GetTypes = params => 
    request('GET', config.service + 'type/queryType', params);

export const GetService = params => 
    request('GET', config.service + 'serve/queryServeByType', params);    

export const GetProduct = params => 
    request('GET', config.service + 'produce/queryProduceByServe', params);

export const GetTimeList = params =>
    request('GET', config.order + 'schedule/getReservableTime', params)
    
export const GetTechnicianId = params => 
    request('GET', config.order + 'schedule/queryReservableTechnician', params);

export const AddScheduleWithServeByStore = params => 
    request('POST', config.order + 'schedule/addScheduleWithServeByStore', params);

export const ModifyScheduleServe = params => 
    request('POST', config.order + 'scheduleserve/modifyScheduleServe', params);