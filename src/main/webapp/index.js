// (function (window) {


// })(window);

var curImgName = "";
var curTxtName = "";
const url = "./file/getFile";
function handleImgChange(e, flag){
    const input = e.target;
    const files = e.target.files;
    var origin_img = document.getElementById("origin-img");
    origin_img.src = URL.createObjectURL(files[0]);
    origin_img.style.width = "auto";

    if(curImgName !== files[0].name){
      clear("img");
    }
    curImgName = files[0].name;
}

function handleTextChange(e, flag){
    const input = e.target;
    const files = e.target.files;

    if(curTxtName !== files[0].name){
      clear("txt");
    }
    curTxtName = files[0].name;
    var test_sent = document.getElementById("test-sent");
    // 使用 FileReader 来读取文件
    var reader = new FileReader()
                            
    // 读取纯文本文件,且编码格式为 utf-8
    reader.readAsText(files[0], 'UTF-8')
                            
    // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
    reader.onload = function (e) {
      var fileContent = e.target.result;
      test_sent.innerText = fileContent;
      test_sent.style.height = "auto";
      test_sent.style.minHeight = "156px";
    };
}

function clear(type){
  // if(type === "img"){
  //   var test_sent = document.getElementById("test-sent");
  //   test_sent.innerText = "";
  //   test_sent.style.height = "";
  //   test_sent.style.minHeight = "";

  //   curTxtName = "";
  // } else {
  //   var origin_img = document.getElementById("origin-img");
  //   origin_img.src = "";
  //   origin_img.style.width = "";

  //   curImgName = "";
  // }

  var process_img = document.getElementById("process-img");
  process_img.src = "";
  process_img.style.width = "";


  var text_ids = ["process-text","decode-img","decode-text"];

  for(var i=0;i<text_ids.length;i++){
    var p = document.getElementById(text_ids[i]);
    p.innerText = "";
    p.style.height = "";
    p.style.minHeight = "";
  }
}

function choose(id) {
  var select = document.getElementById(id);
  select.click();
}

function process(type, flag) {
  var name = type === "img" ? curImgName : curTxtName;

  if(!name){
    return;
  }
  
  var cbImg = function (response) {
    var process_img = document.getElementById("process-img");
    process_img.src = URL.createObjectURL(response);
    process_img.style.width = "auto";
  };

  var cbTxt = function (response) {
    var reader = new FileReader()
                                
    // 读取纯文本文件,且编码格式为 utf-8
    reader.readAsText(response, 'UTF-8')
                                  
    // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
    reader.onload = function (e) {
      var fileContent = e.target.result;
      console.log(fileContent);
      var process_text = document.getElementById("process-text");
      process_text.innerText = fileContent;
      process_text.style.height = "auto";
      process_text.style.minHeight = "156px";
    };
  };

  request(name,flag,type === "img" ? cbImg : cbTxt);
}

function generate(type, flag) {
  if(!validateImgTxt()){
    showError();
    return;
  }
  var name = type === "img" ? curImgName : curTxtName;
  var id = type === "img" ? "decode-img" : "decode-text";

  if(!name){
    return;
  }

  var cb = function (response) {
    var reader = new FileReader()
                                
    // 读取纯文本文件,且编码格式为 utf-8
    reader.readAsText(response, 'UTF-8')
                                
    // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
    reader.onload = function (e) {
      var fileContent = e.target.result;
      console.log(fileContent);
      var p = document.getElementById(id);
      p.innerText = fileContent;
      p.style.height = "auto";
      p.style.minHeight = "156px";
    };
  };

  request(name,flag,cb);
}

function validateImgTxt(){
  if(!curImgName || !curTxtName){
    return false;
  }

  var imgNum = parseInt(curImgName.split(".")[0]);
  var txtNum = parseInt(curTxtName.split(".")[0].split("_")[0]);

  return imgNum === (txtNum+1);
}

function save(type, flag) {
  var name = type === "img" ? curImgName : curTxtName;
  if(!name){
    return;
  }

  var cb = function (response) {
    var reader = new FileReader()
                                
    var paramUrl = url + "?" + formatParams({originName:name,type:flag});
    window.location.href = paramUrl;
  };

  request(name,flag,cb);
}

// 格式化参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      arr.push(
        encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
      );
    }
  }
  // 添加时间戳，防止缓存
  arr.push('t=' + new Date().getTime());
  return arr.join('&');
}

function request(name,type,cb){
  var paramUrl = url + "?" + formatParams({originName:name,type:type});
  //创建ajax请求
  var ajax=new XMLHttpRequest();
  ajax.open( "GET", paramUrl, true);
  ajax.responseType = 'blob';
  ajax.onload= function(){ 
    cb(ajax.response);
  };
  ajax.onerror = (err) => {
    console.log(err);
  }
  ajax.send();
}

function showError(){
  var mask = document.getElementById("mask");
  mask.style.display = "block";

  document.body.style.overflow = "hidden";
}

function colseError(){
  var mask = document.getElementById("mask");
  mask.style.display = "none";

  document.body.style.overflow = "";
}