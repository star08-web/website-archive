let notify = document.getElementById('notify-bar');
let notifytext = document.getElementById('notify-text');
let notifyicon = document.getElementById('notify-icon');
function spawnnotify(message, status='default', time=3000) {
  if (status == 'default') {
    notify.style.backgroundColor = '#020d57';
  } else if (status == 'success') {
    notify.style.backgroundColor = '#28a745';
    notifyicon.classList.remove('fa-bell');
    notifyicon.classList.add('fa-check-circle');
  } else if (status == 'error') {
    notify.style.backgroundColor = '#cd0b28';
    notifyicon.classList.remove('fa-bell');
    notifyicon.classList.add('fa-circle-xmark');
  }
  notifytext.textContent = message;
  notify.classList.add('open');
  setTimeout(function() {
    notify.classList.remove('open');
    notify.style.backgroundColor = '#020d57';
    notifyicon.classList.remove('fa-check-circle');
    notifyicon.classList.remove('fa-circle-xmark');
    notifyicon.classList.add('fa-bell');
    notifytext.textContent = '';
  }, time);
}
