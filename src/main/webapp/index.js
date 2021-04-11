// (function (window) {


// })(window);

var curImgName = "";
var curTxtName = "";
const url = "./file/getFile";
function handleImgChange(e){
    const input = e.target;
    const files = e.target.files;
    var origin_img = document.getElementById("origin-img");
    origin_img.src = URL.createObjectURL(files[0]);
    origin_img.style.width = "auto";
    curImgName = files[0].name;
}

function handleTextChange(e){
    const input = e.target;
    const files = e.target.files;
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
    }
}

function choose(id) {
    var select = document.getElementById(id);
    select.click();
}

function generate(type, flag) {
    var name = type === "img" ? curImgName : curTxtName;

    //创建ajax请求
    var ajax=new XMLHttpRequest();
    ajax.open( "GET", "./file/getFile?originName=1.jpg&type=2", true);
    ajax.responseType = 'blob';
    ajax.onload= function(){
        var reader = new FileReader()

        // 读取纯文本文件,且编码格式为 utf-8
        reader.readAsText(ajax.response, 'UTF-8')

        // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
        reader.onload = function (e) {
            var fileContent = e.target.result;
            console.log(fileContent);
            var decode_img = document.getElementById("decode-img");
            decode_img.innerText = fileContent;
            decode_img.style.height = "auto";
        };
    };
    ajax.onerror = (err) => {
        console.log(err);
    }
    ajax.send();
}
