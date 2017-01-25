/**
 * author: ji zhou
 * net id: jz65
 * student id : S01255993
 */
window.onload = function () {
    var update_btn = document.getElementsByClassName('card-btn')[0]
    update_btn.addEventListener('click',check_diff,false)


    var prof_items = document.getElementsByClassName("profile-item")
    var profile = new Object();
    
    for( i=0; i<prof_items.length; i++){
        if (prof_items[i].getAttribute('name')) {
            profile[prof_items[i].getAttribute('name')] = {
                default_value: prof_items[i].children[2].innerHTML.trim(),
                default_div: prof_items[i].children[2],
                alert_div: prof_items[i].children[3],
                input_field: (prof_items[i].children[1]).getElementsByTagName('input')[0]
            }
            profile[prof_items[i].getAttribute('name')].input_field.addEventListener('focus', function (item) {
                item.currentTarget.parentNode.parentNode.children[3].innerHTML = ''
            })
        }
    }




    function validate_psw() {
        var psw = profile['password'].input_field.value
        var psw_confirm = profile['password_confirm'].input_field.value
        if(!psw.value && psw_confirm.value){
            profile['password'].alert_div.style.display = 'inline'
            profile['password'].alert_div.innerHTML = 'No new password entered'
            return false
        }else if(psw.value && !psw_confirm.value){
            profile['password'].alert_div.style.display = 'inline'
            profile['password'].alert_div.innerHTML = 'Please confirm your password'
            return false
        }else if(psw.value && psw_confirm.value){
            if(psw.value == psw_confirm.value){
                return true
            }
        }else if(!psw.value && !psw_confirm.value){
            return true
        }
        return false
    }

    var validate_reg = [
        {id: "email", reg: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$", alert: "e.g. 123@de.de"},
        {id: "phone", reg: "[0-9]{10}", alert: "should be a ten digit number"},
        {id: "zipcode", reg: "[0-9]{5}", alert: "should be five digits"}
    ]

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
    function check_diff() {

       if( validate_psw() && validate_reg.reduce(validate_val, true)) {

           for(var key in profile){
               if(profile[key].input_field.value){
                   var newVal=profile[key].input_field.value
                   if(profile[key].default_value != profile[key].input_field.value){
                       profile[key].alert_div.innerHTML = 'changed from '+ profile[key].default_value +' to '+ newVal
                       profile[key].input_field.value = ''
                       profile[key].default_div.innerHTML = newVal
                   }
               }
           }
           return true
       }
       return false
    }
}