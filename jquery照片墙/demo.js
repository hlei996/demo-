var wrapUl = $('.wrapUl')
var wrapW = parseInt(wrapUl.css('width'));
var wrapH = parseInt(wrapUl.css('height'));
var liW = wrapW / 5 ;
var liH = wrapH / 5;

createDom();
function createDom(){
    // 代表行
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            $('<li><div class="box"><img src="" alt=""></div></li>').css({
                'width': liW + 'px',
                'height': liH + 'px',
                'left': j * liW,
                'top': i * liH,
                'transform': 'scale(0.9) rotate(' + (Math.random() * 40 -20) + 'deg)' + 
                    'transLateX(' + (30 * i - 60) + 'px' +')' +
                    'transLateY(' + (30 * i - 60) + 'px' + ')' +
                    'transLateZ(-' + Math.random() * 500 + 'px' + ')' 
            }).find('img').attr('src','./img/img_' + (i*5 + j + 1) + '.png').end()
            .appendTo(wrapUl)
        }
    }
    bindEvent()

}


function  bindEvent() {
    var change = true 
        console.log(wrapUl)
        wrapUl.find('li').on('click', function(){
            console.log(11)
            if(change){
            //  小图 --> 大图
                var bgImg = $(this).find('img').attr('src');
                var bgLeft = 0;
                var bgTop = 0;
                $('li').each(function(index){
                    var $this = $(this)
                    $this.delay(10*index).animate({'opacity': 1},200,function(){
                        $this.css({
                            'transform':  'rotate(0)' + 
                            'translateX(0px)' + 
                            'translateY(0px)' + 
                            'translateZ(0px)',
                            'transition': 'none'
                        })
                        $this.find('.box').css({
                            'transform': 'scale(1)',
                        })
                        $this.find('img').attr('src', bgImg).css({
                            'position': 'absolute',
                            'width': wrapW + 'px',
                            'height': wrapH + 'px',
                            'left': -bgLeft,
                            'top': -bgTop
                        });
                        bgLeft += liW
                        if(bgLeft >= wrapW){
                            bgTop += liH
                            bgLeft = 0
                        }
                    })
                })
                change = false 
            } else {
                //  大图 --> 小图
                change = true
                $('li').each(function(index){
                    var j = index % 5;
                    var i = Math.floor(index / 5)
                    var $this = $(this)
                    $(this).animate({'opacity': 1},200, function(){
                        $(this).find('img').css({
                            'position': 'absolute',
                            'width': '100%',
                            'height': '100%',
                            'left': 0,
                            'top': 0
                        });
                        $this.find('img').attr('src', './img/img_' + (index + 1)  + '.png')

                        $(this).css({
                            // 随机
                            'width': liW + 'px',
                            'height': liH + 'px',
                            'left': j * liW,
                            'top': i * liH,
                            'transform': 'scale(0.9) rotate(' + (Math.random() * 40 -20) + 'deg)' + 
                                'transLateX(' + (30 * i - 60) + 'px' +')' +
                                'transLateY(' + (30 * i - 60) + 'px' + ')' +
                                'transLateZ(-' + Math.random() * 500 + 'px' + ')' ,
                            'transition': 'all 1.2s'
                        })
                    })
                })
             }
        })

}