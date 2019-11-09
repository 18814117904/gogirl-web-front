<template>
	<el-dialog title="收款方式" width="30%" :visible.sync="formVisible" @close="cancel('payForm')">
		<el-form :model="payForm" ref="payForm">
			<el-form-item
				v-for="(paymentType, index) in payForm.paymentTypes"
				:key="index"
				label="支付方式"
				label-width="80px"
				:prop="'paymentTypes.' + index + '.type'"
				:rules="{
					required: true, message: '请选择付款方式以及输入付款金额', trigger: 'change'
				}">
				<el-select
					v-model="paymentType.type"
					:clearable="true" placeholder="选择支付方式">
					<el-option
						v-for="(item,index) in PATMENT_TYPE_LIST"
						:key="index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
				<el-input
					v-model="paymentType.price"
					style="width: 30%"
					type="number"
					placeholder="请输入金额"></el-input>
				<el-button type="danger" @click.prevent="removeType(paymentType)">一</el-button>
			</el-form-item>
			<el-form-item label="" label-width="80px">
				<el-button class="threeTabHover" @click.prevent="addType()">+</el-button>
			</el-form-item>
			<el-form-item
				:rules="{
					required: true, message: '请选择客户来源', trigger: 'change'
				}"
				label="客户来源" label-width="80px" prop="source" v-if="!isHasSource">
				<el-select
					v-model="payForm.source"
					:clearable="true"
					placeholder="选择客户来源"
					@change="sourceChange"
					>
					<el-option
						v-for="(item,index) in CUSTOMER_SOURCE_LIST"
						:key="index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注" label-width="80px" prop="say">
				<el-input type="textarea" v-model="payForm.say" placeholder="输入备注" style="width: 88%;"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button
				class="btn-blue"
				@click="sureGiveMoney('payForm')"
			>确认提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { PATMENT_TYPE_LIST, CUSTOMER_SOURCE_LIST} from "../../config/type.js"
import config from "../../config/config";
export default {
	props: {
		isHasSource: Boolean,
		chargeItem: Object
	},
	data() {
		return {
			PATMENT_TYPE_LIST: PATMENT_TYPE_LIST.filter(p => p.id !== 1 && p.id !== 3),
			CUSTOMER_SOURCE_LIST,
			payForm: {
        paymentTypes: [{type : '', price : this.chargeItem.totalPrice}],
				say: "",
				source: ''
			},
			formVisible: true,
		}
	},
	methods: {
		addType() {
      this.payForm.paymentTypes.push({
        type : '', price : ''
      });
    },
    removeType(type) {
			if (this.payForm.paymentTypes.length === 1) {
				this.$message({
					type: 'warning',
					message: '至少选择一种支付方式'
				});
				return;
			}
      let index = this.payForm.paymentTypes.indexOf(type);
      if (index !== -1) {
        this.payForm.paymentTypes.splice(index, 1);
      }
		},
		// 给钱
    sureGiveMoney(formName) {
			const {
				payForm,
				chargeItem
			} = this;
			// 记录输入总金额
			let sum = 0;
			for (let i = 0, len = payForm.paymentTypes.length; i < len; i++) {
					if (!payForm.paymentTypes[i].price && payForm.paymentTypes[i].price !== 0) {
					this.$message({
						type: 'warning',
						message: '请输入金额'
					});
					return;
				}
				sum += (+payForm.paymentTypes[i].price);
			}
			if (sum < chargeItem.totalPrice) {
				this.$message({
					type: 'warning',
					message: '输入金额小于合计金额'
				});
				return;
			} else if (sum > chargeItem.totalPrice) {
				this.$message({
					type: 'warning',
					message: '输入金额大于合计金额'
				});
				return;
			}
      this.$refs[formName].validate(valid => {
        if (valid) {
					this.$emit('sureGiveMoney', payForm);
        }
      });
    },
		cancel(forName) {
			this.$emit('cancel');
			this.$refs[forName].resetFields;
		},
		// 选择客户来源
		sourceChange(val) {
			this.$ajax({
        url: config.user + "updateCustomerSelective",
        method: "get",
        params: {
          id: this.chargeItem.customer.id,
          customerSource: val
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.$message({
            message: "保存客户来源成功",
            type: "success"
          });
        } else {
					this.$message({
						type: 'error',
						message: res.data.message || '保存客户来源失败'
					})
				}
      });
		}
	}
}
</script>
<!--<style scoped>
	.hide {
		display: none
	}
	.show {
		display: block;
	}
</style>-->


