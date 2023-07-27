import { auth, db, storage } from "./firebase.mjs";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getStorage, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
var myEmail;
var myName;
var myId

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user)
        myId = uid;
        myEmail = user.email
        // user name ki value get krne ke lye firestore se
        const q = query(collection(db, "chatapp"), where("email", "==", myEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById('myName').innerHTML = doc.data().fname + " " + doc.data().lname;
        });
        
        // const q = query(collection(db, "chatapp"), where("email", "==", myEmail));
        
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     document.getElementById('myName').innerHTML = doc.data().fname
            
        //     getDownloadURL(ref(storage, myEmail))
        //         .then((url) => {
        //             const img = document.getElementById('img');
        //             img.setAttribute('src', url);
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         });
        
            
            
            
        // });
        // console.log(myEmail, 'email')
        // const query1 = query(collection(db, "chatapp"), where("email", "!=", myEmail));
        // const querySnapshot1 = await getDocs(query1);
        // querySnapshot1.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //     document.getElementById('users').innerHTML += `
        //     <div class="items">
        //                 <div class="userName" onclick='selectedUser("${doc.data().fname}" , "${doc.data().email}")'>
        //                     ${doc.data().fname}
        //                 </div>
        //     </div>
        //     `
        // });
        // ...
    } else {
        // User is signed out
        // ...
    }
});

// function selectedUser(name, email) {
//     console.log(name , email)

//     getDownloadURL(ref(storage, email))
//                 .then((url) => {
//                     const img = document.getElementById('selectedImg');
//                     img.setAttribute('src', url);
//                     document.getElementById('selectedName').innerHTML = name
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 });

// }

// document.getElementById('logout').addEventListener('click', () => {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         window.location.href = '../index.html'
//     }).catch((error) => {
//         // An error happened.
//     });
// })

// window.selectedUser = selectedUser;