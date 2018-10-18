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

	// Smooth scroll
	const anchors = document.querySelectorAll('a[href*="#"]');

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const blockID = anchor.getAttribute('href');

			document.querySelector('' + blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}

	// Modal
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descriptionBtn = document.querySelectorAll('.description-btn');

	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function () {
		more.classList.remove('more-splash');
		overlay.style.display = 'none';
		document.body.style.overflow = '';
	});

	descriptionBtn.forEach(function (element) {
		element.addEventListener('click', function () {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});
});