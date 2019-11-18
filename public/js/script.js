'use strict';

window.onload = function(){
    console.log('coucou au client from public/js/script.js');

    document.getElementById('btnLogout').onclick = function(){
        confirm('Vous allez être déconnecté !');
    };



    // AJAX TEST
    // var request = new XMLHttpRequest();
    // request.onreadystatechange = function(){
    //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
    //         var response = JSON.parse(this.responseText);
    //         console.log(response.current_condition.condition);
    //     }
    // }
    // request.open("GET", "http://localhost:8080/profil");
    // request.send();
}
