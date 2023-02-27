function Validator(options){

    var selectorRule = {};
    // hàm thực thi validate
    function validate(inputElement, rule){
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        var errorMessage ;    

        var rules = selectorRule[rule.selector];
        for(var i = 0; i < rules.length; ++i){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
           }else{
            errorElement.innerText = ' ';
            inputElement.parentElement.classList.remove('invalid')
           }
           return !errorMessage;
    }
 var formElement = document.querySelector(options.form);
    if(formElement){
    //     formElement.onsubmit = function(e){
    //         e.preventDefault();
    //         var isFormVlaid = true;
    //         options.rules.forEach(function(rule){
    //                 var inputElement = formElement.querySelector(rule.selector);
    //                 var isValid = validate(inputElement,rule)
    //                 if(!isValid){
    //                     isFormVlaid = false;
    //                 }
    //         });
          
    //         if(isFormVlaid){
    //          if(typeof options.onSubmit === 'function'){
    //             var enableInput = formElement.querySelector('[name]');
    //             var formValues = Array.from(enableInput).reduce(function(values,input){
    //                 return (values[input.name]= input.value) && values;
    //             },{});
    //             options.onSubmit(formValues)
    //          }
    //     }
    // }
    formElement.onsubmit = function (e) {
        e.preventDefault();

        var isFormValid = true;

        // Lặp qua từng rules và validate
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement, rule);
            if (!isValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Trường hợp submit với javascript
            if (typeof options.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    
                    switch(input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }

                    return values;
                }, {});
                options.onSubmit(formValues);
            }
            // Trường hợp submit với hành vi mặc định
            else {
                formElement.submit();
            }
        }
    }
        options.rules.forEach(function(rule){
            //Luu lại các rule cho moi input
            if(Array.isArray(selectorRule[rule.selector])){
                selectorRule[rule.selector].push(rule.test);
            }else{
                selectorRule[rule.selector] = [rule.test]
            }
            // selectorRule[rule.selector]=rule.test;

            var inputElement = formElement.querySelector(rule.selector)

            if(inputElement){
                // xy ly TH blur khoi input
                inputElement.onblur = function(){
                 validate(inputElement,rule);
                }
                //xu ly khi moi nguoi dung nhap vao input
                inputElement.oninput = function(){
                    console.log(inputElement.value)
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
        console.log(selectorRule);
    } 
}


Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  'Vui lòng nhập trường này'
        }
    };
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };
}
Validator.isPhone = function(selector){
    return{
        selector:selector,
        test: function(value){
            var regex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return regex.test(value) ? undefined: 'Chưa đứng định dạng '
        }
    }
}