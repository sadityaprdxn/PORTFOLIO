'use strict';
import common from './common.js';
import data from './getData.js';

window.onload = function () {
	const page = document.querySelector('.container');

	const reset = new common;

	if (page.classList.contains('home-page')) {
		console.log('hi');

		const professionList = document.querySelector('.profession ul');
		let professionListAt = (professionList.offsetTop + professionList.offsetHeight * 0.5);
		const experienceList = document.querySelector('.experience ul');
		let experienceListAt = (experienceList.offsetTop + experienceList.offsetHeight * 0.15);
		let experienceListLi = Array.from(experienceList.querySelectorAll('li div.year-content'));

		// window on scroll functions
		window.addEventListener('scroll', () => {
			let pageAt = (window.scrollY + window.innerHeight);

			if(window.scrollY > 0 && !reset.header.classList.contains('active')) { 
				reset.header.classList.add('active');
			} else if( window.scrollY === 0) {
				reset.header.classList.remove('active');
			}

			// condition for running the counter
			if (pageAt > professionListAt && !professionList.classList.contains('active')) { runCounter(professionList); }

			// condition for activating the experienceList
			if (pageAt > experienceListAt && !experienceList.classList.contains('active')) { experienceList.classList.add('active') }

			// condition for activating year content div
			experienceListLi.forEach(element => {
				let elementAt = (experienceList.offsetTop + element.parentElement.offsetTop + element.offsetHeight * 0.95);

				if (pageAt > elementAt && !element.classList.contains('active')) { element.classList.add('active') }
			});
		});

		// function for running the counter
		let runCounter = (div) => {

			div.classList.add('active');
			let professionListLi = Array.from(div.querySelectorAll('li div.progress-bar'));

			professionListLi.forEach(element => {

				let updateWidth = () => {

					let currentWidth = parseInt(element.firstElementChild.getAttribute('data-current'));
					let actualWidth = parseInt(element.firstElementChild.getAttribute('data-actual'));

					let increment = actualWidth / 10;

					if (actualWidth > currentWidth) {

						currentWidth += increment / 2;
						element.firstElementChild.setAttribute('data-current', currentWidth);

						element.firstElementChild.style.width = `${currentWidth}%`;
						element.lastElementChild.innerText = `${Math.floor(currentWidth)}%`;
						setTimeout(updateWidth, 50);
					}
				}
				updateWidth();
			});
		}

		
		// regex object for verifying the inputs
		const RegexExpression = {
			username_regex: /^([a-zA-Z]){2,10}$/,
			email_regex: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/
		}

		let inputArray = Array.from(document.querySelectorAll('form input'));

		inputArray.forEach(element => {
			element.addEventListener('keyup', () => {
				validateInput(element);
			});
		});

		let validateInput = (input) => {
			var requiredRegex = input.getAttribute('data-regex');
			var parent = input.parentNode;
			
			if (input.value == "") {
				parent.classList = "form-group";
			}
			else if (RegexExpression[requiredRegex].test(input.value)) {
				parent.classList = "form-group success"
			} else {
				parent.classList = "form-group error"
			}
		}
	} else if (page.classList.contains('portfolio-page')) {
		let receiveData = new data;
		let project = new URL(window.location.href).searchParams.get("projectid")

		let baseUrl = "https://raw.githubusercontent.com/sadityaprdxn/PORTFOLIO/master/assets/data/projectData.json";

		receiveData.getData(baseUrl).then((data) => {
			let projectData = null;

			for (let i = 0; i < data.length; i++) {
				if (data[i]['projectId'] == project) {
					projectData = data[i];
				}
			}

			let imageArray = Array.from(document.querySelectorAll('.project-banner img'));
			let projectName = document.querySelector('.project-banner h3');
			let content = document.querySelector('.info p');
			let projectIoLink = document.querySelector('#github-io-link');
			let projectRepoLink = document.querySelector('#github-repo-link');

			imageArray[0].setAttribute('src', projectData['imageSourceDesktop']);
			imageArray[1].setAttribute('src', projectData['imageSourceMobile']);
			projectName.innerText = projectData['projectName'];
			content.innerText = projectData['content'];
			projectIoLink.setAttribute('href', projectData['githubIoLink']);
			projectRepoLink.setAttribute('href', projectData['githubLink']);			
			projectIoLink.innerText = projectData['githubIoLink'];
			projectRepoLink.innerText = projectData['githubLink'];

		}).catch((err) => { 
			let imageArray = Array.from(document.querySelectorAll('.project-banner img'));
			
			imageArray[0].setAttribute('src', 'assets/images/error.png');
			imageArray[1].setAttribute('src', 'assets/images/error.png');
			document.querySelector('.project-banner h3').classList.add('none');
			document.querySelector('.info').classList.add('none');
			document.querySelector('footer').classList.add('none');

			console.log(err);
		});

		// window on scroll functions
		window.addEventListener('scroll', () => {

			if(window.scrollY > 0 && !reset.header.classList.contains('active')) { 
				reset.header.classList.add('active');
			} else if( window.scrollY === 0) {
				reset.header.classList.remove('active');
			}
		});
	}
}
