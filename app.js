import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Firebase Config
const firebaseConfig = {
    apiKey: "DEIN_API_KEY",
    authDomain: "DEIN_PROJEKT.firebaseapp.com",
    projectId: "DEIN_PROJEKT",
    storageBucket: "DEIN_PROJEKT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

signInAnonymously(auth);

// 🎵 Song hochladen
async function uploadSong() {
    const file = document.getElementById("songFile").files[0];
    const title = document.getElementById("songTitle").value;

    if (!file || !title) return alert("Song & Titel fehlen!");

    const storageRef = ref(storage, `songs/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "songs"), {
        title,
        url
    });

    loadSongs();
}

// 🎧 Songs laden
async function loadSongs() {
    const list = document.getElementById("songList");
    list.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "songs"));
    querySnapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().title;
        li.onclick = () => playSong(doc.data().url);
        list.appendChild(li);
    });
}

function playSong(url) {
    const player = document.getElementById("audioPlayer");
    player.src = url;
    player.play();
}

loadSongs();
window.uploadSong = uploadSong;
