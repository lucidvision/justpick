export const { GOOGLE_API_KEY, FIREBASE } = {
  production: {
    GOOGLE_API_KEY: 'AIzaSyDPRa3b3H7m5LxyHmQ9D1RSxIvPnbKGvzM',
    FIREBASE: {
      apiKey: 'AIzaSyDZqSL4qn7ZMQmdEHiK9Qv6GZHyO5Frefk',
      authDomain: 'just-pick-c9a04.firebaseapp.com',
      databaseURL: 'https://just-pick-c9a04.firebaseio.com',
      projectId: 'just-pick-c9a04',
      storageBucket: 'just-pick-c9a04.appspot.com',
      messagingSenderId: '1036528309157',
    },
  },
  development: {
    GOOGLE_API_KEY: 'AIzaSyDPRa3b3H7m5LxyHmQ9D1RSxIvPnbKGvzM',
    FIREBASE: {
      apiKey: 'AIzaSyDZqSL4qn7ZMQmdEHiK9Qv6GZHyO5Frefk',
      authDomain: 'just-pick-c9a04.firebaseapp.com',
      databaseURL: 'https://just-pick-c9a04.firebaseio.com',
      projectId: 'just-pick-c9a04',
      storageBucket: 'just-pick-c9a04.appspot.com',
      messagingSenderId: '1036528309157',
    },
  },
}[process.env.NODE_ENV]
