window.addEventListener("DOMContentLoaded", function () {
	"use strict";
	let body = document.querySelector("body"),
		tab = document.querySelectorAll(".info-header-tab"),
		info = document.querySelector(".info"),
		tabContent = document.querySelectorAll(".info-tabcontent");

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	}

	//   Modal
	let overlay = document.querySelector(".overlay");

	function showModal(modBtn) {
		overlay.style.display = "block";
		info.classList.add("more-splash");
		document.body.style.overflow = "hidden";
	}

	function hideModal(modCloseBtn) {
		overlay.style.display = "none";
		info.classList.remove("more-splash");
		document.body.style.overflow = "";
	}

	//  Timer
	let deadLine = "2018-10-22";

	function getTimeRemaninig(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor(t / (1000 * 60 * 60));
		// hours = Math.floor((t / 1000 / 60 / 60) % 24),
		// days = Math.floor((t / (1000 * 60 * 60 * 24)));

		return {
			total: t,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
	}

	function setCloack(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds"),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaninig(endtime),
				h = t.hours.toString(),
				m = t.minutes.toString(),
				s = t.seconds.toString();

			if (t.total <= 0 && t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";
				clearInterval(timeInterval);
			} else {
				if (h.length < 2) {
					hours.textContent = "0" + h;
				} else {
					hours.textContent = h;
				}
				if (m.length < 2) {
					minutes.textContent = "0" + m;
				} else {
					minutes.textContent = m;
				}
				if (s.length < 2) {
					seconds.textContent = "0" + s;
				} else {
					seconds.textContent = s;
				}
			}
		}
	}
	setCloack("timer", deadLine);

	body.addEventListener("click", e => {
		let target = e.target;

		if (target && target.classList.contains("info-header-tab")) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}

		// Modal

		if (target && target.classList.contains("more")) {
			showModal(target);
		}
		if (target && target.classList.contains("popup-close")) {
			hideModal(target);
		}
		if (target && target.classList.contains("description-btn")) {
			showModal(target);
		}

		// Smooth scroll
		if (target && target.matches('a[href*="#"]')) {
			e.preventDefault();

			const blockID = target.getAttribute("href");

			document.querySelector("" + blockID).scrollIntoView({
				block: "start",
				behavior: "smooth"
			});
		}
	});
});