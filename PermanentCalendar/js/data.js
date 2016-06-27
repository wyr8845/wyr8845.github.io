/*
农历信息代码十六进制转化为二进制时，
1-4：表示当年有无闰年，有的话，为闰月的月份，没有的话，为0；
5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。从高位往低位数；
17-20：表示闰月是大月还是小月，仅当存在闰月的情况下有意义。
eg.
1900年的数据是： 0x04bd8
二进制：0000 0100 1011 1101 1000
表示1900年有闰月在8月且为小月，从1月到13月的天数依次为：
29（一月）、30（二月）、29（三月）、29（四月）、30（五月）、29（六月）、
30（七月）、30（八月）、29（闰月）、30（九月）、30（十月）、29（十一月）、30（十二月）。
*/
//1900年到2100年的农历信息
var lunarInfo = new Array(
	0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
	0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
	0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
	0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
	0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
	0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
	0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
	0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
	0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
	0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
	0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
	0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
	0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
	0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
	0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
	0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
	0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
	0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
	0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
	0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
	0x0d520) //2100

//每月的天数
var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

//节气名称
var solarTermName = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");

//24节气的时间，以分来计
var solarTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);

//农历单字
var lunarStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二');
var lunarStr2 = new Array('初', '十', '廿', '卅');

//固定公历节日
var solarFestival = new Array(
	"0101 元旦",
	"0214 情人节",
	"0308 妇女节",
	"0312 植树节",
	"0401 愚人节",
	"0501 劳动节",
	"0504 青年节",
	"0512 护士节",
	"0601 儿童节",
	"0701 建党节",
	"0801 建军节",
	"0910 教师节",
	"1001 国庆节",
	"1224 平安夜",
	"1225 圣诞节")

//固定农历节日
var lunarFestival = new Array(
	"0101 春节",
	"0115 元宵节",
	"0505 端午节",
	"0707 七夕节",
	"0715 中元节",
	"0815 中秋节",
	"0909 重阳节",
	"1208 腊八节",
	"1224 小年")

//返回农历y年的总天数
function lunarYearDays(y) {
	var i, sum = 348;
	for (i = 0x8000; i > 0x8; i >>= 1)
		sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
	return (sum + leapDays(y));
}

//返回农历y年闰月的天数
function leapDays(y) {
	if (leapMonth(y))
		return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
	else
		return 0;
}

//判断y年的农历中哪月是闰月，不是闰月返回0
function leapMonth(y) {
	return (lunarInfo[y - 1900] & 0xF);
}

//返回农历y年m月的总天数
function monthDays(y, m) {
	return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
function Dianaday(objDate) {
	var i, leap = temp = 0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;
	
	for (i = 1900; i < 2100 && offset > 0; i++) {
		temp = lunarYearDays(i);
		offset -= temp;
	}
	
	if (offset < 0) {
		offset += temp;
		i--;
	}
	
	this.year = i;
	leap = leapMonth(i); //闰哪个月
	this.isLeap = false;
	
	for (i = 1; i < 13 && offset > 0; i++) {
		if (leap > 0 && i == (leap + 1) && this.isLeap == false) { //闰月
			i--;
			this.isLeap = true;
			temp = leapDays(this.year);
		} else {
			temp = monthDays(this.year, i);
		}
		
		if (this.isLeap == true && i == (leap + 1))
			this.isLeap = false; //解除闰月
			
		offset -= temp;
	}
	
	if (offset == 0 && leap > 0 && i == leap + 1) {
		if (this.isLeap) {
			this.isLeap = false;
		} else {
			this.isLeap = true;
			i--;
		}
	}
	
	if (offset < 0) {
		offset += temp;
		i--;
	}
	
	this.month = i;
	this.day = offset + 1;
}

//返回公历y年m+1月的天数
function solarDays(y, m) {
	if (m == 1)
		return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
	else
		return (solarMonth[m]);
}

//记录公历和农历某天的日期
function calElement(selectYear, selectMonth, selectDay, week, lunarYear, lunarMonth, lunarDay, isLeap) {
	this.isToday = false;
	//公历
	this.selectYear = selectYear;
	this.selectMonth = selectMonth;
	this.selectDay = selectDay;
	this.week = week;
	//农历
	this.lunarYear = lunarYear;
	this.lunarMonth = lunarMonth;
	this.lunarDay = lunarDay;
	this.isLeap = isLeap;
	//节日记录
	this.lunarFestival = ''; //农历节日
	this.solarFestival = ''; //公历节日
	this.solarTerms = ''; //节气
}

//返回某年的第n个节气为几日
function sTerm(y, n) {
	var offDate = new Date((31556925974.7 * (y - 1900) + solarTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	
	return (offDate.getUTCDate())
}

//保存y年m+1月的相关信息
var mother = father = 9;
var eve = 0;

function calendar(y, m) {
	mother = father = 0;
	var solarDObj, lunarDObj, lunarYear, lunarMonth, lunarDay = 1;
	var lunarLast, lunarX = 0;
	var temp1, temp2;
	var n = 0;
	var firstLunarMonth = 0;
	
	solarDObj = new Date(y, m, 1); //当月第一天的日期
	this.length = solarDays(y, m); //公历当月天数
	this.firstWeek = solarDObj.getDay(); //公历当月1日星期几
	
	if ((m + 1) == 5) {
		mother = solarDObj.getDay()
	}
	
	if ((m + 1) == 6) {
		father = solarDObj.getDay()
	}
	
	for (var i = 0; i < this.length; i++) {
		if (lunarDay > lunarX) {
			solarDObj = new Date(y, m, i + 1); //当月第一天的日期
			lunarDObj = new Dianaday(solarDObj); //农历
			lunarYear = lunarDObj.year; //农历年
			lunarMonth = lunarDObj.month; //农历月
			lunarDay = lunarDObj.day; //农历日
			lunarLast = lunarDObj.isLeap; //农历是否闰月
			lunarX = lunarLast ? leapDays(lunarYear) : monthDays(lunarYear, lunarMonth); //农历当月最後一天
			
			if (lunarMonth == 12) {
				eve = lunarX
			}
			
			if (n == 0)
				firstLunarMonth = lunarMonth;
		}
		
		this[i] = new calElement(y, m + 1, i + 1, lunarStr1[(i + this.firstWeek) % 7], lunarYear, lunarMonth, lunarDay++, lunarLast);
	}
	
	//节气
	temp1 = sTerm(y, m * 2) - 1;
	temp2 = sTerm(y, m * 2 + 1) - 1;
	this[temp1].solarTerms = solarTermName[m * 2];
	this[temp2].solarTerms = solarTermName[m * 2 + 1];
		
	if (y == tY && m == tM && y == tY)
		this[tD - 1].isToday = true; //今日
	else
		this[tD - 1].isToday = false;
}

//农历日期拼接
function cDay(d) {
	var t;
	switch (d) {
		case 10:
			t = '初十';
			break;
		case 20:
			t = '二十';
			break;
		case 30:
			t = '三十';
			break;
		default:
			t = lunarStr2[Math.floor(d / 10)] + lunarStr1[d % 10];
	}
	return (t);
}

//在表格中显示公历和农历的日期,以及相关节日
var myCalendar;

function drawCalendar(y, m) {
	var TF = true;
	var p1 = p2 = "";
	var i, d, s, size, num, count = 0;
	
	myCalendar = new calendar(y, m);
	
	for (i = 0; i < 42; i++) {
		solarObject = eval('myDay' + i);
		lunarObject = eval('myLunarDay' + i);
		trObject = eval('trID' + Math.floor(i / 7));
		if(trObject.id == 'myDay' + i) this.style.display = "none";
		d = i - myCalendar.firstWeek;
		
		if (d >= 0 && d < myCalendar.length) { //日期内
			count = 0;
			trObject.style.display = "";
			solarObject.innerHTML = d + 1;
			
			if (myCalendar[d].isToday) { //今日颜色
				solarObject.style.color = '#00F';
				lunarObject.style.color = '#00F';
			} else {
				solarObject.style.color = '';
				lunarObject.style.color = '';
			}
			
			if (myCalendar[d].lunarDay == 1) { //显示农历月
				lunarObject.innerHTML = (myCalendar[d].isLeap ? '闰' : '') + lunarStr1[myCalendar[d].lunarMonth] + '月' + (monthDays(myCalendar[d].lunarYear, myCalendar[d].lunarMonth) == 29 ? '小' : '大');
			} else {
				lunarObject.innerHTML = cDay(myCalendar[d].lunarDay);
			} //显示农历日
			
			var showLunarFestival = showSolarFestival = null;
			
			s = myCalendar[d].solarFestival;
			
			for (var k = 0; k < lunarFestival.length; k++) { //农历节日
				if (parseInt(lunarFestival[k].substr(0, 2)) == (myCalendar[d].lunarMonth)) {
					if (parseInt(lunarFestival[k].substr(2, 4)) == (myCalendar[d].lunarDay)) {
						lunarObject.innerHTML = lunarFestival[k].substr(5);
						showLunarFestival = lunarFestival[k].substr(5);
					}
				}
				
				if (12 == (myCalendar[d].lunarMonth)) { //判断是否为除夕
					if (eve == (myCalendar[d].lunarDay)) {
						lunarObject.innerHTML = "除夕";
						showLunarFestival = "除夕";
					}
				}
			}
			
			for (var k = 0; k < solarFestival.length; k++) { //公历节日
				if (parseInt(solarFestival[k].substr(0, 2)) == (m + 1)) {
					if (parseInt(solarFestival[k].substr(2, 4)) == (d + 1)) {
						lunarObject.innerHTML = solarFestival[k].substr(5);
						showSolarFestival = solarFestival[k].substr(5);
					}
				}
			}
			
			if ((m + 1) == 5) { //母亲节
				if (mother == 0) {
					if ((d + 1) == 7) {
						showSolarFestival = "母亲节";
						lunarObject.innerHTML = "母亲节"
					}
				} else if (mother < 9) {
					if ((d + 1) == ((7 - mother) + 8)) {
						showSolarFestival = "母亲节";
						lunarObject.innerHTML = "母亲节"
					}
				}
			}
			
			if ((m + 1) == 6) { //父亲节
				if (father == 0) {
					if ((d + 1) == 14) {
						showSolarFestival = "父亲节";
						lunarObject.innerHTML = "父亲节"
					}
				} else if (father < 9) {
					if ((d + 1) == ((7 - father) + 15)) {
						showSolarFestival = "父亲节";
						lunarObject.innerHTML = "父亲节"
					}
				}
			}
			s = myCalendar[d].solarTerms;
			if (s.length > 0) {
				lunarObject.innerHTML = s;
				showLunarFestival = s;
			} //节气
			
			if ((showLunarFestival != null) && (showSolarFestival != null)) {
				lunarObject.innerHTML = showLunarFestival + "/" + showSolarFestival;
			}
		} else { //非日期
			count++;
			solarObject.innerHTML = '';
			lunarObject.innerHTML = '';
			
			if (count >= 7) {
				count = 0;
				trObject.style.display = "none";
			}
		}
	}
}

//在下拉列表中选择年月时,调用自定义函数drawCalendar(),显示公历和农历的相关信息
function changeCalendar() {
	var y, m;
	y = my.SelectYear.selectedIndex + 1900;
	m = my.SelectMonth.selectedIndex;
	drawCalendar(y, m);
}

//用自定义变量保存当前系统中的年月日
var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();

//打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCalendar(),显示公历和农历的相关信息
function initial() {
	my.SelectYear.selectedIndex = tY - 1900;
	my.SelectMonth.selectedIndex = tM;
	drawCalendar(tY, tM);
}