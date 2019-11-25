'use strict';
const socket = io();


window.onload = function(){
    console.log('coucou au client from public/js/script.js');
    
    document.getElementById('btnLogout').onclick = function(){
        
        if(confirm('Vous allez être déconnecté !')){
            document.location.href="/"
        } else {
            console.log('on reste')
        };
    };
    
}



    // $("#myForm").submit(function(e){
    //     e.preventDefault();

    //     var donnees = $(this).serialize();

    //     $.ajax({
    //         type: 'post',
    //         url: '/profil',
    //         async: true,
    //         data: donnees,
    //         success: function(data){
    //             console.log(donnees);
    //         },
    //     });
    // })