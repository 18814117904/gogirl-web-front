function getNumber(n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
}

// date 日期 required, [options] includeTime 是否包含返回时间
export function getDate(date, includeTime) {
	if (! (date instanceof(Date))) {
		date = new Date(date);
	}

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	let hours = date.getHours();
	let minutes = date.getMinutes();

	if (includeTime) {
		return [year, month, day].map(getNumber).join('-') + ' ' + [hours, minutes].map(getNumber).join(':');
	} else {
		return [year, month, day].map(getNumber).join('-')
	}
}

export function getTime(date) {
	if(! (date instanceof(Date))) {
		date = new Date(date);
	}
	
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	return [hours, minutes, seconds].map(getNumber).join(':');
}

// 日期，前几天
export function getDateBefore(date, number) {
	if (! (date instanceof(Date))) {
		date = new Date(date);
	}
	date.setTime(date.getTime()-24*60*60*1000*number);

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	return [year, month, day].map(getNumber).join('-')
}