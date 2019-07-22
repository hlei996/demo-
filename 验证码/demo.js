//  随机生成字符串     从大小写英文字母及数字之间选取六个组成需要识别的验证码
//  输入验证码      点击提交--》 进行判断  正确/错误


//  65~90   97~122
var arr = [0,1,2,3,4,5,6,7,8,9];
for(var i = 65; i < 122; i++){
    if(i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}
var value = ''
function createCanvas(){
    value = ''
    //  选取要显示的字符
    var canvasStr = '';
    for(var i = 0; i < 6; i++){
        var a = arr[Math.floor(Math.random() * arr.length)];
        canvasStr += a + ' '
        value += a
    }
    //  生成验证码区域
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d')
    var oImg = new Image()
    //   存放图片路径
    oImg.src = './imgs/bgc_1.png'
    oImg.onload = function(){
        var pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern
        ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ccc';
        ctx.font = '46px Robto Slab',
        ctx.setTransform(1,-0.12,0.3,1,1,12)
        ctx.fillText(canvasStr,myCanvas.width / 2, 60)
    }
}

createCanvas();


$('.submit').on('click', function(){
    showResult();
})

$('.refresh').on('click', function(){
    createCanvas()
})

function showResult(){
    var inputValue = $('.inputBox').find('input').val()
    console.log(value)
    console.log(inputValue.toUpperCase(),value.toUpperCase())
    if(value.toUpperCase() == inputValue.toUpperCase()){
        $('.inputBox span').css({
            'background': "url('./imgs/proper.png')",
            'backgroundSize': '100%',

            'display': 'inline-block' ,
            
        })
        createCanvas()
    } else {
        $('.inputBox span').css({
            'background': "url('./imgs/error.png')",
            'backgroundSize': '100%',

            'display': 'inline-block' 
        })
        $('.error').css('display','block').html('验证码错误， 请重新输入')
        createCanvas()
    }
}