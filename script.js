function openOverlayAddContact() {
    document.getElementById('overlayContainer').classList.remove('displayNone');
    document.getElementById('addContactCardOverlay').classList.remove('hidden')
}
   
function closeOverlayAddContact() {
    document.getElementById('overlayContainer').classList.add('displayNone')
    document.getElementById('addContactCardOverlay').classList.add('hidden');
}


