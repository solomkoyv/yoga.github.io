window.addEventListener('DOMContentLoaded', function () {

	'use strict';
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}
	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
	//  Timer
	let deadLine = '2018-10-21';

	function getTimeRemaninig(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));
		// hours = Math.floor((t / 1000 / 60 / 60) % 24),
		// days = Math.floor((t / (1000 * 60 * 60 * 24)));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setCloack(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaninig(endtime),
				h = t.hours.toString(),
				m = t.minutes.toString(),
				s = t.seconds.toString();

			if (t.total <= 0 && t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
				clearInterval(timeInterval);
			} else {
				if (h.length < 2) {
					hours.textContent = '0' + h;
				} else {
					hours.textContent = h;
				}
				if (m.length < 2) {
					minutes.textContent = '0' + m;
				} else {
					minutes.textContent = m;
				}
				if (s.length < 2) {
					seconds.textContent = '0' + s;
				} else {
					seconds.textContent = s;
				}
			}
		}

	}
	setCloack('timer', deadLine);

	// собираем все якоря; устанавливаем время анимации и количество кадров
	const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
		animationTime = 500,
		framesCount = 20;

	anchors.forEach(function (item) {
		// каждому якорю присваиваем обработчик события
		item.addEventListener('click', function (e) {
			// убираем стандартное поведение
			e.preventDefault();

			// для каждого якоря берем соответствующий ему элемент и определяем его координату Y
			let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;

			// запускаем интервал, в котором
			let scroller = setInterval(function () {
				// считаем на сколько скроллить за 1 такт
				let scrollBy = coordY / framesCount;

				// если к-во пикселей для скролла за 1 такт больше расстояния до элемента
				// и дно страницы не достигнуто
				if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
					// то скроллим на к-во пикселей, которое соответствует одному такту
					window.scrollBy(0, scrollBy);
				} else {
					// иначе добираемся до элемента и выходим из интервала
					window.scrollTo(0, coordY);
					clearInterval(scroller);
				}
				// время интервала равняется частному от времени анимации и к-ва кадров
			}, animationTime / framesCount);
		});
	});
});