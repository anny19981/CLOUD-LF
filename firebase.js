import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getDatabase, onValue, ref } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCIiCloSpQgL_sBHbDTAz0NXt8TqyoN17I",
  authDomain: "cloudfm-2a65a.firebaseapp.com",
  databaseURL: "https://cloudfm-2a65a-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "cloudfm-2a65a",
  storageBucket: "cloudfm-2a65a.firebasestorage.app",
  messagingSenderId: "249887318112",
  appId: "1:249887318112:web:2c3a1167392c4be784a305",
  measurementId: "G-ESE8B52TCE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const db = getDatabase(); 
const distanceRef = ref(db, 'user/' + userId + '/distance');
onValue(distanceRef, (snapshot) => {
  const data = snapshot,val();
  updateDistance(postElement, data);
});
