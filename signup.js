import { auth, db, storage } from './firebase.mjs'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
document.getElementById('SignUp').addEventListener('click', () => {
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let file = document.getElementById('file').files
    let data = {
        fname: fname,
        lname: lname,
        email: email,
        password, password,
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            try {
                const docRef = await addDoc(collection(db, "chatapp", ), {
                    ...data,
                    // user: user.uid,
                    
                });
             
                
                console.log("Document written with ID: ", docRef.id);
            }
             catch (e) {
                console.error("Error adding document: ", e);
            }
            const storageRef = ref(storage, email);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // alert('singUp successfully');
            // window.location.href = './login.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        })
    })
    async function abc() {
        const querySnapshot = await getDocs(collection(db, "chatapp"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().fname);
        console.log(doc.data().lname);
        console.log(doc.data().password);
        console.log(doc.data().email);
    });
    
  
    // console.log(file);
}
abc();