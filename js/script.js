window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const body = document.querySelector("body"),
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
    const overlay = document.querySelector(".overlay");

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

            if (
                t.total <= 0 &&
                t.hours <= 0 &&
                t.minutes <= 0 &&
                t.seconds <= 0
            ) {
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
                clearInterval(timeInterval);
            } else {
                if (h.length < 2) {
                    hours.textContent = `0 ${h}`;
                } else {
                    hours.textContent = h;
                }
                if (m.length < 2) {
                    minutes.textContent = `0 ${m}`;
                } else {
                    minutes.textContent = m;
                }
                if (s.length < 2) {
                    seconds.textContent = `0 ${s}`;
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
            tab.forEach(function (e, i) {
                if (target == e) {
                    hideTabContent(0);
                    showTabContent(i);
                    // break;
                }
            });

            // for (let i = 0; i < tab.length; i++) {
            //     if (target == tab[i]) {
            //         hideTabContent(0);
            //         showTabContent(i);
            //         break;
            //     }
            // }
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

    //  Form

    let message = {
        loading: "Загрузка ...",
        success: "Спасибо скоро мы с вами свяжемся",
        failure: "Что-то пошло не так ..."
    };

    let form = document.querySelector(".main-form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

    statusMessage.classList.add("status");

    form.addEventListener("submit", function (evet) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("readystatechange", function () {
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.failure;
            }
        });

        [...input].forEach(elem => elem.value = '');
    });

    //  Contact Form


    let contactForm = document.querySelector("#form");


    contactForm.addEventListener("submit", function (evet) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let requestContact = new XMLHttpRequest();
        requestContact.open("POST", "server.php");
        requestContact.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formDataContact = new FormData(contactForm);

        let objContact = {};
        formDataContact.forEach(function (value, key) {
            objContact[key] = value;
        });
        let jsonContact = JSON.stringify(objContact);

        requestContact.send(jsonContact);

        requestContact.addEventListener("readystatechange", function () {
            if (requestContact.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (requestContact.readyState === 4 && requestContact.status == 200) {
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.failure;
            }
        });

        [...input].forEach(elem => elem.value = '');
    });

    const inputsPhone = document.querySelectorAll('input[name="phone"]');

    function onlyNumber(input) {
        input.onkeydown = function () {
            return this.value = this.value.replace(/[^0-9]/g, '')
        }
    }
    [...inputsPhone].forEach(elem => onlyNumber(elem));
});