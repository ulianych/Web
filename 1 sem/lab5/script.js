function createFormFields(formArray, formName) {
    var form = document.forms[formName];

    for (var i = 0; i < formArray.length; ++i) {        
        var field = formArray[i];

        var label = document.createElement('label');
        label.innerHTML = field.label
        
        var element;
        switch (field.elemtype) {
        case 'textline':
            element = document.createElement('input');
            element.type = 'text';
            element.name = field.name;
            element.style.width = field.width + 'px';
            element.placeholder = field.placeholder;

            element.oninput = function() {
                validation_text(this);
            };

            break;
        case 'check':
            element = document.createElement('input');
            element.type = 'checkbox';
            element.name = field.name;
            break;
        case 'radio':
            element = document.createElement('div');
            for (var j = 0; j < field.options.length; j++) {
                var optionLabel = document.createElement('label');
                var option = document.createElement('input');
                option.type = 'radio';
                option.name = field.name;
                option.value = field.options[j];
                optionLabel.appendChild(option);
                optionLabel.appendChild(document.createTextNode(field.options[j]));
                option.onchange = function() {
                   validation_radio(this);
                };
                element.appendChild(optionLabel);
            }
            break;
        case 'button':
            element = document.createElement('input');
            element.type = 'submit';
            element.value = field.value;
            break;
        default:
            continue;
        }

        form.appendChild(label);
        form.appendChild(element);
        form.appendChild(document.createElement('br'));
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        var ok = valid_all(formArray, formName);

        if (ok) {
            form.submit();
        }
    };
}

function validation_text(elem) {
    var errorElement = elem.nextElementSibling;
    if (elem.value.trim() === "") {
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            elem.parentNode.insertBefore(errorElement, elem.nextSibling);
        }
        errorElement.textContent = 'Field cannot be empty';
        errorElement.style.color = 'red';
        return false;
    } else if (errorElement) {
        errorElement.textContent = '';
        return true;
    }
}

function validation_radio(elem) {
    var radio_div = elem.parentNode.parentNode;
    var errorElement = radio_div.nextElementSibling;
    if(!(radio_div.children[0].querySelector('input[name="trip_type"]').checked) && !(radio_div.children[1].querySelector('input[name="trip_type"]').checked)) {
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            radio_div.parentNode.insertBefore(errorElement, radio_div.nextSibling);
        }
        errorElement.textContent = 'Choose any variant';
        errorElement.style.color = 'red';
        return false;
    } else if (errorElement) {
        errorElement.textContent = '';
        return true;
    }
}


function valid_all(formArray, formName) {
    var form = document.forms[formName];
    var ok = true;

    for (var i = 0; i < form.elements.length; ++i) {
        var type = form.elements[i].type;
        var elem = form.elements[i];
        
        switch (type) {
            case 'text':
                ok = validation_text(elem);
                break;
            case 'radio':
                validation_radio(elem);
        }
    }
    return ok;
}
