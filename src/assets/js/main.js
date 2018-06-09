(function () {
  const PUBLIC_KEY = 'BOkXDmPG1NTchFEVzbESDLFr97uMMHXklZVMVlSXf7DPwzsBRQqDMLjC6QIhk1XVOSR7mB05fArnn_92zbRXJgo';

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const subscribe = () => {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    let sw;

    navigator.serviceWorker.ready.then(swreg => {
      sw = swreg;
      return sw.pushManager.getSubscription();
    }).then(sub => {
      if (sub === null) {
        const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_KEY);
        return sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
      } else {

      }
    }).then(sub => {
      if (sub) {
        return fetch('/api/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(sub)
        });
      }
    }).then(res => {
      if (res && res.ok) {
        notification();
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const notification = () => {
    var options = {
      body: 'You successfully subscribed to our Notification service!',
      icon: 'assets/images/logo_blue.png',
      dir: 'ltr',
      lang: 'en-US', // BCP 47,
      vibrate: [100, 50, 200],
      badge: 'assets/images/logo_blue.png'
    };

    navigator.serviceWorker.ready.then(sw => {
      sw.showNotification('Successfully subscribed!', options);
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js');
    });
  }

  if ('Notification' in window) {
    Notification.requestPermission(result => {
      if (result === 'granted') {
        subscribe();
      }
    })
  }
})();
