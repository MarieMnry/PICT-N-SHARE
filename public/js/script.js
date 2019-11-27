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
      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#mssgBox').append($('<li>').text(msg));
      });


  // $('form').submit(function(e) {
	//   e.preventDefault(); // On évite le recharchement de la page lors de la validation du formulaire
  //   // On crée notre objet JSON correspondant à notre message
	//   var message = {
	// 	  text : $('#m').val()
	//   }
	//   socket.emit('chat-message', message); // On émet l'événement avec le message associé
  //   $('#m').val(''); // On vide le champ texte
  //   if (message.text.trim().length !== 0) { // Gestion message vide
  //     socket.emit('chat-message', message);
  //   }
  //   $('#chatContent input').focus(); // Focus sur le champ du message
  //   socket.on('chat-message', function (message) {
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
    
    







    
