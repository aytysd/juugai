self.addEventListener('push', function (event) {
  var options = {
    body: 'docker is coming',
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      { action: 'explore', title: 'I love uuuuuuuu.', icon: '/checkmark.png' },
      { action: 'close', title: 'Close notification', icon: '/xmark.png' },
    ],
  }

  event.waitUntil(self.registration.showNotification('animal detected now!!!!', options))
})