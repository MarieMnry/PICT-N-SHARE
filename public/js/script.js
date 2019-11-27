'use strict';
document.addEventListener("DOMContentLoaded", () => {

  const socket = io();

    // Déconnexion
    console.log('Coucou le client c\'est public/js/script.js');
    document.getElementById('btnLogout').onclick = function(){
      if(confirm('Vous allez être déconnecté !')){
            document.location.href="/"
        } else {
          console.log('Finally want to stay !')
        };
    };

    // Chat instantané
    // $(function () { 
    //   $('form').submit(function(e){
    //     e.preventDefault(); // pas de rechargement de la page

    //     var message = {
    //       text: $('#mssgInput').val()
    //     }
    //     socket.emit('chatMessage', message);
    //     $('#mssgInput').val('');
    //     if (message.text.trim().length !== 0) { // Gestion message vide
    //       socket.emit('chatMessage', message);
    //     }
    //     $('#chatContent input').focus();
    //   }); 
          
    //   socket.on('chatMessage', function(message){
    //     $('#mssgBox').append($('<li>').text(message.text));
    //   });
    // });

    //Affichage du message de confirmation page /signup sur profil
      var alert = document.getElementById('alert');
      var alertText = alert.innerText || alert.textContent;
      console.log(alertText);
      if(alertText.length < 2){
        alert.style.display = 'none';
      }
});
    
    







    
