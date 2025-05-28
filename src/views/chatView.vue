<script>
import router from '@/router';
import { db, auth } from '@/firebase/config';
import { query, collection, onSnapshot,addDoc } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

export default {
    data() {
        return {
            messages: [],
            currentUser: null,
            inputMessage: '',
            inputUserName: ''
        }
    },
    methods: {
        getchat() {
            const q = query(collection(db, "messages"));
            onSnapshot(q, (querySnapshot) => {
                this.messages=[];
                querySnapshot.forEach((doc) => {
                this.messages.push({
                    id: doc.id,
                    ...doc.data(),
                    });
                });
            });
        },
        addMessage(){
            addDoc(collection(db, "messages"), {
                content: this.inputMessage,
                userId: this.currentUser.uid,
                userName: this.inputUserName,
                createdAt: new Date()
            });
            this.inputMessage = '';
        },
        setUserName() {
            updateProfile(this.currentUser, {
                displayName: this.inputUserName
            });
        }
    },
    mounted(){
        this.getchat();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.currentUser = user;
            } else {
                router.push('/login');
            }
        });
    }
}
</script>


<template>
    <div>
        <input v-model="inputUserName" placeholder="Nombre de usuario" type="text" />
        <button @click="setUserName">Establecer nombre de usuario</button>
    </div>

<div>
    <input v-model="inputMessage" type="text" placeholder="Escribe tu mensaje aquí..." />
    <button @click="addMessage">Enviar</button>
</div>
<ul style="margin-top: 50px;">
    <li v-for="message in messages" :key="message.id">
    <span>
        <strong>{{ message.userName }}</strong>--
        {{ message.content }}   
    </span>
    <span> -- {{ message.createdAt.toDate().toLocaleString() }}</span>
    </li>
</ul>

</template>

