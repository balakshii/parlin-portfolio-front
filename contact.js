let contactForm = {
    init: false,
    form: 'form.form',
    formFields: '.form__field',
    run: function () {
        if (!this.init) {
            this.init = true;
            this.formFields = document.querySelectorAll(this.formFields);
            this.motion();
            let form = document.querySelector('form.form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (this.validateFields()) {
                    fetchProductsData("http://127.0.0.1:5500/contact.json", result => {
                        if (result.response) {
                            this.success();
                        }
                    });
                }

            });
        }
    },
    motion: function () {
        this.formFields.forEach(field => {

            field.addEventListener('focus', (event) => {
                event.target.closest('.form__field-group').classList.add('active');
            });

            field.addEventListener('blur', (event) => {
                if (event.target.value == '') {
                    event.target.closest('.form__field-group').classList.remove('active');
                }
            });

        });
    },
    validateEmail: function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    validateFields: function () {
        let result = true;
        this.formFields.forEach(field => {
            if (field.value.length < 1) {
                field.closest('.form__field-group').classList.add('error');
                result = false;
            } else if (!this.validateEmail(field.value) && field.getAttribute('id') == 'email') {
                field.closest('.form__field-group').classList.add('error-email');
                field.closest('.form__field-group').classList.remove('error');
                result = false;
            } else {
                field.closest('.form__field-group').classList.remove('error');
                field.closest('.form__field-group').classList.remove('error-email');
            }
        });
        return result;
    },
    success: function () {
        this.formFields.forEach(field => {
            field.value = '';
            field.closest('.form__field-group').classList.remove('active');
            document.querySelector('.form__result-message').style.display = 'flex';
        });
    }
}
contactForm.run();