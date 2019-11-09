// 订单状态
export const ORDER_TYPR_STATUS = [
    {id: 1, name: '正在服务'},
    {id: 2, name: '待付款'},
    {id: 3, name: '待评价'},
    {id: 4, name: '已完成'}
]

// 收款方式
export const PATMENT_TYPE_LIST = [
    { id: 1, name: '用户端微信支付'},
    { id: 2, name: '会员卡收款'},
    { id: 3, name: '其它'},
    { id: 5, name: "pos收款" },
    { id: 6, name: "现金收款" },
    { id: 7, name: "大众点评收款" },
    { id: 8, name: "微信扫码支付" },
    { id: 9, name: "团购" },
    { id: 10, name: "免单" },
    { id: 11, name: "会员帮付" }
]

// 充值方式
export const TOUP_TYPE_LIST = [
    { id: 5, name: "pos收款" },
    { id: 6, name: "现金收款" },
    { id: 7, name: "大众点评" },
    { id: 8, name: "微信扫码支付" }
]

// 会员卡消费记录来源
export const CARD_RECORD_SOURCE = [
    { id: 1, name: "用户端微信支付"},
    { id: 2, name: "会员卡收款"},
    { id: 3, name: "其他"},
    { id: 4, name: "用户端微信支付充值"},
    { id: 5, name: "pos收款"},
    { id: 6, name: "现金收款"},
    { id: 7, name: "大众点评收款"},
    { id: 8, name: "微信扫码支付"},
    { id: 9, name: "团购"},
    { id: 10, name: "免单"},
    { id: 11, name: "会员帮付" }
]

// 会员卡消费记录类型
export const CARD_RECORD_TYPE = [
    {id: 1, name: '充值'},
    {id: 2, name: '首冲'},
    {id: -1, name: '消费'},
]
    
// 订单来源
export const ORDER_TYPE = [
    {id: 1, name: '预约订单'},
    {id: 2, name: '新建订单'},
    {id: 3, name: '大众点评'},
    {id: 4, name: '充值'},
    {id: 5, name: '线上订单'}
]

// 会员来源（123是现有的来源，后四种已经舍弃，但要保留兼容旧版本）
export const VIP_CUSTOMER_SOURCE_LIST = [
    { id: 1, name: "新建预约" },
    { id: 2, name: "新建订单" },
    { id: 3, name: "微信端授权" },
    { id: 4, name: '朋友介绍'},
    { id: 5, name: '大众点评'},
    { id: 6, name: '微信活动'},
    { id: 7, name: '霸王餐'},
    { id: 0, name: "其他"},
]

// 客户来源
export const CUSTOMER_SOURCE_LIST = [
    { id: 1, name: "大众" },
    { id: 2, name: "介绍" },
    { id: 3, name: "自来" },
    { id: 4, name: "微信" }
]

// 员工状态
export const EMP_MAN_STATUS = {1: '在职', 2: '离职'}


// 采购单状态
export const PURCHASE_STSTUS = [
    {id: 1, name: '待采购'},
    {id: 2, name: '采购中'},
    {id: 3, name: '待入库'},
    {id: 4, name: '待出库'},
    {id: 5, name: '待收货'},
    {id: 6, name: '已完成'}
]
