
var  per = 0;
var timer ;

timer = setInterval(function(){
    $('.bar').css('width',per + '%');
    per += 1;
    if(per > 100){
        $('.pageLoading').addClass('complete')
        setTimeout(function(){
            $('.monsterText').html('<h2>master</h2>')
        },3000)
        clearInterval(timer)
    }
},30)