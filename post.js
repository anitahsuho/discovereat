
$(function(){
    $('#time').combodate({
        firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
        minuteStep: 1
    });  
});


function goHome(){
    window.location.href = "..";
}
function logout(){
    toggleSignIn();
    goHome();
}