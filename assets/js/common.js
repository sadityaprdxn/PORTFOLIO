
export default class Common {
    constructor() {
        // for DOM manipulation
        this.html = document.querySelector('html');
        this.header = document.querySelector('header');
        this.hamburger = document.querySelector('.hamburger');
        this.navbar = document.querySelector('.navbar');
        this.ellipsis = document.querySelector('.ellipsis');
        this.socialLinks = document.querySelector('.social-links');
        this.navbarLinks = Array.from(document.querySelectorAll('ul.navbar li:not(:last-child) a'));


        // function for activating the social icons
        this.ellipsis.addEventListener('click', () => {
            this.ellipsis.parentElement.classList.toggle('active');
            this.socialLinks.classList.toggle('active');
        });

        // function for closing the social icons
        window.addEventListener('click', e => {
            if (e.target !== this.ellipsis) {
                this.ellipsis.parentElement.classList.remove('active');
                this.socialLinks.classList.remove('active');
            }
        });

        // function for activating the navbar
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navbar.classList.toggle('active');
            this.html.classList.toggle('no-scroll');
            this.html.classList.remove('welcome-user');
        });

        // function for closing the navbar on click of the navbar links
        this.navbarLinks.forEach(element => {
            element.addEventListener('click', () => {
                if (this.hamburger.classList.contains('active') || this.navbar.classList.contains('active')) {
                    this.html.classList.remove('no-scroll');
                    this.hamburger.classList.remove('active');
                    this.navbar.classList.remove('active');
                    this.html.classList.remove('welcome-user');
                }
            });
        });
    }
}