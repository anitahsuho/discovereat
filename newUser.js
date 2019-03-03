function createUser(){
    var a = handleSignUp();
    if(a == "success") { goHome(); }
}
function getChecked(){
    var radios = document.getElementsByName('race');
    for (var i = 0, length = radios.length; i < length; i++){
        if (radios[i].checked){
            return radios[i].value;
        }
    }
}