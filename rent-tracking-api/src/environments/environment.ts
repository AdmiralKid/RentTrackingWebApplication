export const environment = {
  firebase: {
    apiKey: "AIzaSyB8zl8OmShqrDzZfA72PGPb2I7sWORUze8",
    authDomain: "renttrackingauth.firebaseapp.com",
    projectId: "renttrackingauth",
    storageBucket: "renttrackingauth.appspot.com",
    messagingSenderId: "999725662599",
    appId: "1:999725662599:web:439c11f6b60abab20f9322",
  },
  mysql: {
    host: process.env["DB_HOST"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASS"],
    database: process.env["DB"],
  },
};
