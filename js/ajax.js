
// getParams 将对象转换成查询字符串的格式
// 参数：
//  obj: 对象
// 返回值：
//   查询字符串 
// regname=zhangsan&age=18&sex=boy

function getParams(obj)
{
	var arr = [];
	
	for (var key in obj) {
		var str = "";
		
		str += key;
		str += "=";
		// 中文字符的编码转换
		str += encodeURIComponent(obj[key]);
		
		arr.push(str);
	}
	
	return arr.join("&");
}

// 参数
//  obj: 对象
//    method: 方式：  GET / POST
//    url:  地址, 
//    data: 数据
//    async: 同步还是异步
//    success: 成功函数
//    failture: 失败的函数	

// $.ajax 是在 $ 对象中增加了一个属性 ajax
function ajax(obj)
{
	// 1. 创建
	var req = new XMLHttpRequest();

	if (obj.method == "GET") {
		if (obj.data) {
			// 如果数据存在，我才拼接URL地址
			obj.url += "?";
			// obj.data 对象  通过 getParams 函数调用转换成 ==》 查询字符串
			obj.url += getParams(obj.data);
		}
	}

	// 2. 准备
	req.open(obj.method, obj.url, obj.async);

	// 3. 发送数据
	if (obj.method == "GET") {
		req.send();
	} else {
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		// getParams(obj.data): 调用自己的函数，将函数转换成 ==》 查询字符串
		req.send( getParams(obj.data) );
	}
	
	// 4. 状态改变
	if (obj.async) {
		req.onreadystatechange = function() {
			if (req.readyState == 4 ) {
				
				if (req.status == 200) {
				// 将获取的数据 传递给调用者
					obj.success && obj.success( req.responseText );
					console.log(req.responseText );
					// 相当于下面这种写法
	//				if (obj.fn) {
	//					obj.fn( req.responseText );
	//				}
				} else {
					// 数据有错误
					obj.failture && obj.failture(req.status);
				}
			}
		}
	}
}
