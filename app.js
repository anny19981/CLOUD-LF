import { db, storage, auth } from "./firebase.js";
import {
    collection, addDoc, getDocs, doc, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
    ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const player = document.getElementById("player");

window.uploadSong = async () => {
    const file = songFile.files[0];
    const title = songTitle.value;

    const refSong = ref(storage, `songs/${file.name}`);
    await uploadBytes(refSong, file);
    const url = await getDownloadURL(refSong);

    await addDoc(collection(db, "songs"), { title, url });
    loadSongs();
};

async function loadSongs() {
    songList.innerHTML = "";
    const snap = await getDocs(collection(db, "songs"));
    snap.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d.data().title;
        li.onclick = () => player.src = d.data().url;
        songList.appendChild(li);
    });
}

window.createPlaylist = async () => {
    await addDoc(collection(db, "playlists"), {
        name: playlistName.value,
        user: auth.currentUser.uid,
        songs: []
    });
    loadPlaylists();
};

async function loadPlaylists() {
    playlistList.innerHTML = "";
    const snap = await getDocs(collection(db, "playlists"));
    snap.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d.data().name;
        playlistList.appendChild(li);
    });
}

loadSongs();
loadPlaylists();
