const navMenu = {
    init: false,
    items: '[id^="stage"]',
    activeElement: null,
    nav: '.nav-tabs',
    run: function () {
        if (!this.init) {
            this.init = true;
            this.items = document.querySelectorAll(this.items);
            this.activeElement = this.items[0];
            this.nav = document.querySelector(this.nav);
            this.addEvent();
        }
    },
    addEvent: function () {
        document.addEventListener('scroll', () => {
            this.items.forEach((item) => {
                if (item.getBoundingClientRect().top < (window.innerHeight / 2)
                    && item.getBoundingClientRect().top > 0
                ) {
                    if (this.activeElement != item) {
                        this.activeElement = item;
                        this.changeNavActiveItem();
                    }
                }
            });
            this.menuScroll();
        });
    },
    changeNavActiveItem: function () {
        let activeItem = this.nav.querySelector('.active');
        
        if (activeItem) {
            activeItem.classList.remove('active');
        }

        activeItem = this.nav.querySelector('a[href="#' + this.activeElement.getAttribute('id') + '"]');
        activeItem.classList.add('active');
    },
    menuScroll : function () {
        let items = this.nav.querySelectorAll('a[href^="#"]');
        items.forEach(item => {
            if (item.getAttribute('href').length > 1) {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    smoothScroll(item.getAttribute('href'));
                    this.changeNavActiveItem();
                });
            }
        });
    }
};
navMenu.run();