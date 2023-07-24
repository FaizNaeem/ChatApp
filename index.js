import { ref,  getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { auth, storage } from "./firebase.mjs";
// let pic = document.getElementById("img")
function abcd(){
console.log(auth);
    getDownloadURL(ref(storage, "faiznaeem@gmail.com"))
    .then((url) => {
        const img = document.getElementById('img');
        img.src=(auth.currentUser.email);
    })
    .catch((error) => {
        // Handle any errors
        console.log(error);
    });
}
abcd()