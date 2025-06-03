let notify = document.getElementById('notify-bar');
let notifytext = document.getElementById('notify-text');
let notifyicon = document.getElementById('notify-icon');

let notifyTimeout;

const statusStyles = {
  info: { color: '#020d57', icon: 'fa-bell' },
  success: { color: '#28a745', icon: 'fa-check-circle' },
  error: { color: '#cd0b28', icon: 'fa-circle-xmark' },
  warning: { color: '#ffc107', icon: 'fa-exclamation-triangle' },
  debug: { color: '#7e1cc9', icon: 'fa-bug' }
};

function spawnnotify(message = "", status = 'info', time = 3000) {

  if (typeof message !== 'string') {
    console.error('Invalid message type provided');
    return {
      success: false,
      msg: 'Invalid message type provided',
      SpwnType: "NOMSG",
      duration: NaN
    };
  }

  if (typeof time !== 'number' || isNaN(time) || time < 0) {
    console.error('Invalid time value');
    return {
      success: false,
      msg: 'Invalid time value',
      SpwnType: status,
      duration: NaN
    };
  }


  let st = status.toLowerCase();

  if (st === 'default'){
    st = 'info';
  }

  const style = statusStyles[st];

  if (!style) {
    console.error('Invalid status provided');
    return {
      success: false,
      msg: 'Invalid status provided',
      SpwnType: status,
      duration: NaN
    };
  }

  if (message.trim() === '') {
    console.error('No message provided for notification');
    return {
      success: false,
      msg: 'No message provided for notification',
      SpwnType: "NOMSG",
      duration: NaN
    };
  }

  if (notifyTimeout) clearTimeout(notifyTimeout);

  notify.ariaHidden = 'false';
  notify.style.backgroundColor = style.color;
  notifyicon.className = 'fa ' + style.icon;
  notifytext.textContent = message;
  notify.classList.add('open');

  notifyTimeout = setTimeout(() => {
    notify.classList.remove('open');
    notifytext.textContent = '';
    notify.ariaHidden = 'true';
  }, time);

  return {
    success: true,
    msg: message,
    SpwnType: st,
    duration: time
  };
}

document.addEventListener('DOMContentLoaded', () => {
  notify.ariaHidden = 'true';
  notify.role = 'alert';
});