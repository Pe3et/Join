function openOverlayAddContact() {
    document.getElementById('overlayContainer').classList.add('overlayAppear');
    document.getElementById('overlayContainer').classList.add('overlayBackgroundColor');
    document.getElementById('addContactCardOverlay').classList.add('slideInRight');

}
   
function closeOverlayAddContact() {
    document.getElementById('overlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('addContactCardOverlay').classList.remove('slideInRight');
    setTimeout(() => {document.getElementById('overlayContainer').classList.remove('overlayAppear')}, 300);
}
