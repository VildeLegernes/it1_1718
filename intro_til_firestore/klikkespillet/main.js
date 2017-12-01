firebase.initializeApp({
    apiKey: "AIzaSyBsN_vFuzZ5JoWPnhjX8fto4QmemiCaHn4",
    authDomain: "klikkespillet.firebaseapp.com",
    projectId: "klikkespillet",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var  navnE = document.querySelector('.navn');
var startE = document.querySelector('.start');
var klikkE = document.querySelector('.klikk');
var klikkverdiE = document.querySelector('.klikkverdi');
var listeE = document.querySelector('.poengliste');

var antKlikk = 0;

klikkE.addEventListener('click', function () {
    antKlikk = antKlikk + 1;
    klikkverdiE.innerHTML = antKlikk;
});

startE.addEventListener('click', function () {
    antKlikk = 0;
    klikkverdiE.innerHTML = antKlikk;

    setTimeout(function () {
        db.collection("spill").add({
            navn: navnE.value,
            poeng: antKlikk
        });
        alert(antKlikk);
    }, 3000);
});

var mappe = db.collection('spill').orderBy('poeng', 'desc').limit(20);

mappe.onsnapShot(function(data){
    listeE.innerHTML = "";
   var dokumenter = data.docs;

   for(var x in dokumenter){
       listeE.innerHTML += "<li>" + dokumenter[x].data().navn + ": " + dokumenter[x].data().poeng + "</li>"
   }
});