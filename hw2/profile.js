/**
 * author: ji zhou
 * net id: jz65
 * student id : S01255993
 */




// get profile item list
var prof_items = document.getElementsByClassName("profile-item")

// object profile stores the label - input - default value - alert space pairs
var profile = new Object();

// array of field and related matching regex
var validate_reg = [
    {id: "email", reg: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$", alert: "e.g. 123@de.de"},
    {id: "phone", reg: "[0-9]{10}", alert: "should be a ten digit number"},
    {id: "zipcode", reg: "[0-9]{5}", alert: "should be five digits"}
]

// validation for password and confirmation password
function validate_psw() {
    var psw = profile['password'].input_field.value
    var default_psw = profile['password'].default_value
    var psw_confirm = profile['password_confirm'].input_field.value
    if( psw == default_psw){
        // check if new password is same as default value
        profile['password'].alert_div.style.display = 'inline'
        profile['password'].alert_div.innerHTML = 'password has not changed'
        return false;
    }
    if(!psw && psw_confirm){
        // check if the user input a new psw confirm but without a new psw
        profile['password'].alert_div.style.display = 'inline'
        profile['password'].alert_div.innerHTML = 'No new password entered'
        return false
    }else if(psw && !psw_confirm){
        // check if the user input a new psw but without a new psw confirmation
        profile['password'].alert_div.style.display = 'inline'
        profile['password'].alert_div.innerHTML = 'Please confirm your password'
        return false
    }else if(psw && psw_confirm){
        // check if psw equals psw confirmation
        if(psw == psw_confirm){
            return true
        }
    }else if(!psw && !psw_confirm){
        // check if there is no new psw and confirmation section clear
        return true
    }
    return false
}

// method for validation reduction
function validate_val(status, item){
    var newVal = profile[item.id].input_field.value
    if(newVal){
        if(!newVal.match(item.reg)){
            profile[item.id].alert_div.innerHTML = item.alert
        }
        return newVal.match(item.reg)&&status
    }
    return status
}

/* function for update button on click
 * 1. check if there is a new password and confirmed and equals
 * 2. check if there are new email, phone num, or zipcode
 * 2.1 if new, check if matched pattern regex
 * 2.2 if one of them fails, the result is false
 * 3. update default value part using alert field to notify user of value change
 */
function check_diff() {

    if( validate_psw() && validate_reg.reduce(validate_val, true)) {

        for(var key in profile){
            var newVal=profile[key].input_field.value
            if(newVal != "" && key != 'password'&& key !='password_confirm'){
                if(profile[key].default_value != newVal){
                    profile[key].alert_div.innerHTML = 'changed from '+ profile[key].default_value +' to '+ newVal
                    profile[key].default_div.innerHTML = newVal
                }else{
                    profile[key].alert_div.innerHTML = 'no change'
                }
            }else if(key == 'password'  && newVal){

                profile[key].alert_div.innerHTML = 'password changed successfully'
            }
            // update default field
            profile[key].input_field.value = null
            if(newVal != "" && newVal != null){
                profile[key].default_value = newVal
            }
        }
        return true
    }
    return false
}

window.onload = function () {


    // get the update button
    var update_btn = document.getElementsByClassName('card-btn')[0]
    // add listener to update button
    update_btn.addEventListener('click',check_diff,false)



    // look up and initialize the value for each corresponding profile item
    for( i=0; i<prof_items.length; i++){
        if (prof_items[i].getAttribute('name')) {
            profile[prof_items[i].getAttribute('name')] = {
                default_value: prof_items[i].children[2].innerHTML.trim(),
                default_div: prof_items[i].children[2],
                alert_div: prof_items[i].children[3],
                input_field: (prof_items[i].children[1]).getElementsByTagName('input')[0]
            }

            // define focus event for each input field
            profile[prof_items[i].getAttribute('name')].input_field.addEventListener('focus', function (item) {
                item.currentTarget.parentNode.parentNode.children[3].innerHTML = ''
            })
        }
    }

}