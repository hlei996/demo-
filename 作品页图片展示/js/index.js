var lis=document.querySelectorAll('#wrap li'),
	shadowBox=document.querySelector('#shadowBox'),
	showPic=document.querySelector('#showPic'),
	prev=document.querySelector('.prev'),
	next=document.querySelector('.next'),
	imgCon=document.querySelector('.img'),
	bigImgs=imgCon.children;


var curNum=0;	//当前图片的索引
var canClick=true;	//用户是否可以进行下一次的点击，如果为true的话，表示可以进行点击；如果为false的话就不能够点击

//图片预加载
function loadImg(imgs,callBack){
	var loadImgs=[];		//已经加载完的图片集合
	var loadImgNum=0;		//已经加载完的图片数量

	for(var i=0;i<imgs.length;i++){
		loadImgs[i]=new Image();
		loadImgs[i].onload=function(){
			//图片一加载完成就会触发这个事件
			loadImgNum++;
			if(loadImgNum==imgs.length){
				//这个条件成立说明所有的图片都已经加载完成了
				callBack(loadImgs);	//当所有图片都已经加载完成了，就调用一下函数，同时需要把加载完成的图片都传进去
			}
		};
		loadImgs[i].src=imgs[i];	//把用户传进来的图片的地址赋值给loadImgs
	}
}
//把页面里所有的图片都预加载一下
var imgs=[];
for(var i=0;i<lis.length;i++){
	imgs.push('images/work_'+i+'_big.jpg');
}

loadImg(imgs,function(images){
	//images是所有已经预加载的图片组合。里面每一个数据是一个img对象，图片地址放在这个对象的src属性身上
	//console.log(images);
	//所有的功能都应该在这里实现

	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			shadowBox.style.height=document.documentElement.offsetHeight+'px';

			shadowBox.style.display=showPic.style.display='block';
			
			setTimeout(function(){
				shadowBox.style.opacity=showPic.style.opacity=1;
				showPic.style.transform='scale(1)';
			},50);


			curNum=this.index;
			//点击后需要把前面的那张图片地址更改成用户点击的那张图片
			bigImgs[1].src=images[curNum].src;
		};
	}

	nextClick(images);	//点击下一张图片的功能
	prevClick(images);	//点击上一张图片的功能 
});

//鼠标点击遮罩层的时候，隐藏掉弹出的那些东西
shadowBox.onclick=function(){
	if(!canClick){
		return;
	}

	shadowBox.style.display=showPic.style.display='none';
	shadowBox.style.opacity=showPic.style.opacity=0;
	showPic.style.transform='scale(0)';

	//
}


//下一张的功能
function nextClick(images){
	var nextNum=0;	//下一张图片的索引（背后的那张图片的索引）
	next.onclick=function(){
		if(!canClick){	//如果canClick的值为false的话表示不能点击，就不需要让后面的代码走，直接return 
			return;
		}
		canClick=false;	//一上来为true，点击后立马变成false


		//点击右箭头的时候需要更新一下下一个图片的索引
		nextNum=curNum+1;
		if(nextNum==lis.length){
			nextNum=0;	//走到最后了，再回到起点
		}
		bigImgs[0].src=images[nextNum].src;	//把背后的图片更新一下地址


		bigImgs[1].className=bigImgs[0].className='moveToRight';	//让前后的图片以最左边为中心进行旋转
		bigImgs[1].style.transform='translateX(600px) rotateY(-10deg)';	//前面的那张图片往右走，财时伴随着旋转

		var endNum1=0;	//记录前面的图片过渡结束的次数
		var endNum2=0;	//记录后面的图片过渡结束的次数

		//让后面的图张开，但是需在要前面的图走到目标位置后才张开
		bigImgs[1].addEventListener('transitionend',function(){	//前面图片已经走到最右边了
			endNum1++;
			//console.log(endNum1);

			bigImgs[0].style.transform='rotateY(-10deg)';	//后面的图片要张开
			bigImgs[1].style.transform='translateX(0) rotateY(0deg)';	//前面的图片回到的原始位置

			if(endNum1==2){
				//这个条件成立就说明现在是前面的图片走到了原始位置
				bigImgs[0].style.transform='rotateY(0)';	//后面的图片合上

				//还需要把前后的图片层级关系掉个个
				bigImgs[0].style.zIndex=2;	//后面的图片要到前面去
				bigImgs[1].style.zIndex=1;	//前面的图片要到后面去
			}
		});

		//后面的图片合上后，需要把背后那张图片的地址更新一下
		bigImgs[0].addEventListener('transitionend',function(){
			endNum2++;

			if(endNum2==2){	//这个条件成立说明现在图片已经合上了
				//书合上了，代表一次完整的运动就走完了，那下一次需要从头开始
				curNum++;
				if(curNum==lis.length){
					curNum=0;
				}

				bigImgs[1].src=images[nextNum].src;	//把前面那张图片替换掉（它已经跑到背后了）
				bigImgs[0].style.zIndex=1;
				bigImgs[1].style.zIndex=2;

				canClick=true;	//图片合上的时候表示事个运动完成了，就可以允许用户下一次的点击
			}
		});
	};
}


//上一张的功能
function prevClick(images){
	var prevNum=0;	//下一张图片的索引（背后的那张图片的索引）
	prev.onclick=function(){
		if(!canClick){	//如果canClick的值为false的话表示不能点击，就不需要让后面的代码走，直接return 
			return;
		}
		canClick=false;	//一上来为true，点击后立马变成false


		prevNum=curNum-1;
		if(prevNum==-1){
			prevNum=lis.length-1;
		}
		bigImgs[0].src=images[prevNum].src;	//把背后的图片更新一下地址


		bigImgs[1].className=bigImgs[0].className='moveToLeft';
		bigImgs[1].style.transform='translateX(-600px) rotateY(10deg)';

		var endNum1=0;	//记录前面的图片过渡结束的次数
		var endNum2=0;	//记录后面的图片过渡结束的次数

		//让后面的图张开，但是需在要前面的图走到目标位置后才张开
		bigImgs[1].addEventListener('transitionend',function(){	//前面图片已经走到最右边了
			endNum1++;
			//console.log(endNum1);

			bigImgs[0].style.transform='rotateY(10deg)';	//后面的图片要张开
			bigImgs[1].style.transform='translateX(0) rotateY(0deg)';	//前面的图片回到的原始位置

			if(endNum1==2){
				//这个条件成立就说明现在是前面的图片走到了原始位置
				bigImgs[0].style.transform='rotateY(0)';	//后面的图片合上

				//还需要把前后的图片层级关系掉个个
				bigImgs[0].style.zIndex=2;	//后面的图片要到前面去
				bigImgs[1].style.zIndex=1;	//前面的图片要到后面去
			}
		});

		//后面的图片合上后，需要把背后那张图片的地址更新一下
		bigImgs[0].addEventListener('transitionend',function(){
			endNum2++;

			if(endNum2==2){	//这个条件成立说明现在图片已经合上了
				//书合上了，代表一次完整的运动就走完了，那下一次需要从头开始
				curNum--;
				if(curNum==-1){
					curNum=lis.length-1;
				}

				bigImgs[1].src=images[prevNum].src;	//把前面那张图片替换掉（它已经跑到背后了）
				bigImgs[0].style.zIndex=1;
				bigImgs[1].style.zIndex=2;

				canClick=true;	//图片合上的时候表示事个运动完成了，就可以允许用户下一次的点击
			}
		});
	};
}

