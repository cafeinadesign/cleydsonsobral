// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDMMsf4SCTDlHlekBj74YogqIwaDWubFv0',
    authDomain: 'cleydson-sobral.firebaseapp.com',
    databaseURL: 'https://cleydson-sobral.firebaseio.com',
    projectId: 'cleydson-sobral',
    storageBucket: 'cleydson-sobral.appspot.com',
    messagingSenderId: '683770682284',
    appId: '1:683770682284:web:f1f79869626c67de08f809',
    measurementId: 'G-XJ00YTCYZF',
  },
  pagarme: {
    encryptionKey: 'ek_test_OSxEIhfFAQqcqaewfXUr9p9bNpQffG',
    url: 'http://localhost:5001/cleydson-sobral/us-central1',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
