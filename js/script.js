//START ==============================
// 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// 		1.1 НАЗНАЧЕНИЕ ОТСТУПОВ
// 		1.2 РЕСАЙЗ + ПЕРЕНАЗНАЧЕНИЕ ОТСТУПОВ
// 2 НАВИГАЦИЯ ПО САЙТУ КЛИКАМИ
//		2.1 ОБЬЯВЛЕНИЕ ФУНКЦИЙ НАВИГАЦИИ 
//3 НАВИГАЦИЯ СКРОЛЛИНГОМ
//END ==============================

//START ==============================
window.onload = function () {

	// 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
	var ms = document.querySelector('.main'),						// доступ ко всем элементам
		mb = document.querySelectorAll('.main__block'),
		mx = document.querySelectorAll('.mainx'),
		ss = document.querySelectorAll('.second'),
		cont = document.querySelector('.cont'),
		contind = document.querySelectorAll('.cont__ind'),
		close = document.querySelector('.close'),
		clickable = document.querySelector('.clickable'),
		sb = [],
		c = [];
	for (i = 0; i < ss.length; i++) {								//таблица значений [ind][num]
		sb[i] = ss[i].querySelectorAll('.second__block');
	}
	for (i = 0; i < contind.length; i++) {
		c[i] = contind[i].querySelectorAll('.cont__ind_num');
	}
	var ind = 0, 													//нумерация кликабельных элементов
		num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		scroll = true;												//разрешить скролл
	// 1.1 НАЗНАЧЕНИЕ ОТСТУПОВ
	var winw = window.innerWidth,									//?значения размеров, отступов
		winh = window.innerHeight,
		mleft = 300,
		mtop = 200,
		miconsize = 90,
		miconmargin = 45,
		mblocksize = miconsize + 2 * miconmargin,
		sleft = 300,
		stop = 190,
		smargintop = 100;
	// 1.2 РЕСАЙЗ + ПЕРЕНАЗНАЧЕНИЕ ОТСТУПОВ
	window.addEventListener('resize', function (event) {			//?ресайз + переназначение отступов
		winw = window.innerWidth;
		winh = window.innerHeight;

	});

	document.querySelector('.nojs').remove();						//?выполнить после загрузки
	document.querySelector('.nojs__links').remove();
	document.querySelector('.main').style.opacity = 1;
	document.querySelector('.mainx__right').style.animation = "pulse 1.5s ease-in-out 3s alternate infinite";
	document.querySelector('.hi').style.animation = "hi 2.5s linear 1s";
	ss[0].style.overflow = "visible";								
	ss[0].style.opacity = 1;

	//2 НАВИГАЦИЯ ПО САЙТУ КЛИКАМИ======================================================================================================
	for (i = 0; i < mb.length; i++) {							//  click-listeners
		mb[i].addEventListener("click", Mclick, false);
	}
	for (i = 0; i < mb.length; i++) {							//  click-listeners
		for (j = 0; j < sb[i].length; j++) {
			sb[i][j].addEventListener("click", Sclick, false);
		}
	}
	mx[0].onclick = function () {								// click-listener
		if (ind > 0) { ind-- }
		whatMainHappen();
	}
	mx[1].onclick = function () {								// click-listener
		if (ind < 7) { ind++ }
		whatMainHappen();
	}

	//2.1 ОБЬЯВЛЕНИЕ ФУНКЦИЙ НАВИГАЦИИ 
	function Mclick() {											//действия при кликах на Main Slider
		for (i = 0; i < mb.length; i++) {
			if (mb[i] == this) {
				ind = i;
				console.log(ind + ";" + num[ind] + " - Mclick" + " : " + sb[ind].length + " elems");
			}
		}
		whatMainHappen();
	}
	function Sclick() {											//действия при кликах на Second Slider
		for (i = 0; i < sb[ind].length; i++) {
			if (sb[ind][i] == this) {
				if (i == num[ind]) {													// calling content
					CallCont();
					document.querySelector('.close').onclick = RemoveCont;				// remove content
					clickable.onclick = RemoveCont;
				}
				else {
					num[ind] = i;
					console.log(ind + ";" + num[ind] + " - Sclick");
					whatSecondHappen();
				}
			}
		}
	}

	function whatMainHappen() {
		for (i = 0; i < mb.length; i++) {
			ss[i].style.overflow = "hidden"
			ss[i].style.opacity = 0;
			mb[i].classList.add("main__selectable");
			mb[i].classList.remove("main__selected");
		}
		ss[ind].style.overflow = "visible"
		ss[ind].style.opacity = 1;
		ms.style.left = mleft - ind * mblocksize;
		mb[ind].classList.remove("main__selectable");
		mb[ind].classList.add("main__selected");
		MainxOpac();
	}
	function whatSecondHappen() {
		for (i = 0; i < sb[ind].length; i++) {
			sb[ind][i].classList.add("second__selectable");
			sb[ind][i].classList.remove("second__selected");
		}
		ss[ind].style.top = stop - num[ind] * smargintop;
		sb[ind][num[ind]].classList.remove("second__selectable");
		sb[ind][num[ind]].classList.add("second__selected");
	}

	function MainxOpac() {
		if (ind == 0) {
			mx[0].style.animation = "none"
		}
		else if (ind == 7) {
			mx[1].style.animation = "none"
		}
		else {
			mx[0].style.animation = "pulse 1.5s ease-in-out 0s alternate infinite";
			mx[1].style.animation = "pulse 1.5s ease-in-out 0s alternate infinite";
		}
	}
	function CallCont() {
		scroll = false;
		ms.style.top = -500;
		ss[ind].style.left = -1500;
		MainxOpac();
		cont.style.opacity = 1;
		cont.style.transform = "scale(1)";
		clickable.style.transform = "scale(1)";
	}
	function RemoveCont() {
		scroll = true;
		ms.style.top = mtop;
		ss[ind].style.left = sleft;
		cont.style.opacity = 0;
		cont.style.transform = "scale(0)";
		clickable.style.transform = "scale(0)";
		MainxOpac();
	}

	//================================================================================================================
	//3 НАВИГАЦИЯ СКРОЛЛИНГОМ
	elem = document;
	if (elem.addEventListener) {
		if ('onwheel' in document) {
			elem.addEventListener("wheel", onWheel);				// IE9+, FF17+, Ch31+
		} else if ('onmousewheel' in document) {
			elem.addEventListener("mousewheel", onWheel);			// устаревший вариант события
		} else {
			elem.addEventListener("MozMousePixelScroll", onWheel);	// Firefox < 17
		}
	} else {
		elem.attachEvent("onmousewheel", onWheel);					// IE8-
	}
	function onWheel(e) {
		if (scroll) {
			delta = e.deltaY || e.detail || e.wheelDelta;
			if (sb[ind].length > 1) {
				if (num[ind] < 1) {
					if (delta > 0) { num[ind]++ }
				}
				else if (num[ind] < sb[ind].length - 1) {
					if (delta > 0) { num[ind]++ }
					else { num[ind]-- }
				}
				else {
					if (delta < 0) { num[ind]-- }
				}
				whatSecondHappen();
				console.log(ind + ";" + num[ind] + " - wheel")
			}
		}
	}
//END ================================================================================================================
}



// //START ==============================
// window.onload = function () {
// 	document.querySelector('.nojs').remove();
// 	document.querySelector('.main').style.opacity = 1;
// 	document.querySelector('.hi').style.animation = "hi 2.5s linear 1s";
// }

// setTimeout(function () {
// 	ms.style.left = winw / 2 - 100;
// }, 3000);

// //Обьявление переменных ==============
// const ms = document.querySelector('.main'),
// 	mb = document.querySelectorAll('.main__block'),
// 	x = document.querySelectorAll('.x'),
// 	ss = document.querySelectorAll('.second'),
// 	cont = document.querySelectorAll('.cont');
// var sb = [],
// 	c = [];
// for (i = 0; i < ss.length; i++) {
// 	sb[i] = ss[i].querySelectorAll('.second__block');
// }
// for (i = 0; i < cont.length; i++) {
// 	c[i] = cont[i].querySelectorAll('.content');
// }
// var scroll = true;

// var ind = 0, 												//индекс кликабельных элементов
// 	num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	anykey = true;


// var winw = window.innerWidth,
// 	winh = window.innerHeight,
// 	mleft = 350; 											//значения размеров, отступов
// window.addEventListener('resize', function (event) {
// 	winw = window.innerWidth;
// 	winh = window.innerHeight;

// });

// function whatMainHappen() {
// 	for (i = 0; i < mb.length; i++) {
// 		ss[i].style.overflow = "hidden"
// 		ss[i].style.opacity = 0;
// 		mb[i].classList.add("mainselectable");
// 		mb[i].classList.remove("mainselected");
// 	}
// 	ss[ind].style.overflow = "visible"
// 	ss[ind].style.opacity = 1;
// 	ms.style.left = mleft - ind * 200;
// 	ms.style.top = 300;
// 	mb[ind].classList.remove("mainselectable");
// 	mb[ind].classList.add("mainselected");
// }
// function whatSecondHappen() {
// 	for (i = 0; i < sb[ind].length; i++) {
// 		sb[ind][i].classList.add("selectable");
// 		sb[ind][i].classList.remove("selected");
// 	}
// 	ss[ind].style.top = 300 - num[ind] * 140;
// 	sb[ind][num[ind]].classList.remove("selectable");
// 	sb[ind][num[ind]].classList.add("selected");
// }



// //main click =========================
// for (i = 0; i < mb.length; i++) {
// 	mb[i].onclick = Mclick;
// }
// function Mclick() {
// 	for (i = 0; i < mb.length; i++) {
// 		if (mb[i] == this) {
// 			ind = i;
// 			console.log(ind + ";" + num[ind] + " - Mclick" + " : " + sb[ind].length + " elems");
// 			x[0].style.opacity = 1;
// 			x[1].style.opacity = 1;
// 			whatMainHappen();
// 		}
// 	}
// 	// x click
// 	x[0].onclick = function () {
// 		if (ind > 0) { ind-- }
// 		whatMainHappen();
// 	}
// 	x[1].onclick = function () {
// 		if (ind < 7) { ind++ }
// 		whatMainHappen();
// 	}

// 	//second click
// 	for (i = 0; i < sb[ind].length; i++) {
// 		sb[ind][i].onclick = Sclick;
// 	}
// 	function Sclick() {
// 		for (i = 0; i < sb[ind].length; i++) {
// 			// calling content - - - - - - - 
// 			if (sb[ind][i] == this) {
// 				if (i == num[ind]) {
// 					scroll = false;
// 					ms.style.top = -500;
// 					ss[ind].style.left = -1500;
// 					x[0].style.opacity = 0;
// 					x[1].style.opacity = 0;
// 					c[ind][num[ind]].style.opacity = 1;
// 					c[ind][num[ind]].style.transform = "scale(1)";
// 					//!remove content
// 					c[ind][num[ind]].querySelector('.clickable').onclick = removeCont;
// 					function removeCont() {
// 						scroll = true;
// 						ms.style.top = 300;
// 						ss[ind].style.left = 350;
// 						x[0].style.opacity = 1;
// 						x[1].style.opacity = 1;
// 						c[ind][num[ind]].style.opacity = 0;
// 						c[ind][num[ind]].style.transform = "scale(0)";
// 					}
// 				}
// 				// end of calling - - - - - - - 
// 				else {
// 					num[ind] = i;
// 					console.log(ind + ";" + num[ind] + " - Sclick");
// 					whatSecondHappen();
// 				}
// 			}
// 		}
// 	}
// }
// //second scroll
// elem = document;
// if (elem.addEventListener) {
// 	if ('onwheel' in document) {
// 		elem.addEventListener("wheel", onWheel);				// IE9+, FF17+, Ch31+
// 	} else if ('onmousewheel' in document) {
// 		elem.addEventListener("mousewheel", onWheel);			// устаревший вариант события
// 	} else {
// 		elem.addEventListener("MozMousePixelScroll", onWheel);	// Firefox < 17
// 	}
// } else {
// 	elem.attachEvent("onmousewheel", onWheel);					// IE8-
// }
// function onWheel(e) {
// 	if (scroll) {
// 		delta = e.deltaY || e.detail || e.wheelDelta;
// 		if (sb[ind].length > 1) {
// 			if (num[ind] < 1) {
// 				if (delta > 0) { num[ind]++ }
// 			}
// 			else if (num[ind] < sb[ind].length - 1) {
// 				if (delta > 0) { num[ind]++ }
// 				else { num[ind]-- }
// 			}
// 			else {
// 				if (delta < 0) { num[ind]-- }
// 			}
// 			whatSecondHappen();
// 			console.log(ind + ";" + num[ind] + " - wheel")
// 		}
// 	}
// }