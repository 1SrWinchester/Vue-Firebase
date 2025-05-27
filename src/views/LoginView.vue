<script>
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
export default {
    data() {
        return {
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        login() {
            console.log (this.email, this.password);
            // Lógica para iniciar sesión del usuario
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Inicio de sesión exitoso
                    const user = userCredential.user;
                    this.$router.push('/');
                    // Aquí puedes redirigir al usuario a otra vista o mostrar un mensaje de éxito
                })
                .catch((error) => {
                    // Manejo de errores
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.message = `Error: ${errorMessage}`;
                    // Aquí puedes mostrar un mensaje de error al usuario
                });
        }
    },
    mounted() {
        // Verificar el estado de autenticación al montar el componente
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // que es uid?
                // Aquí puedes manejar el usuario autenticado
                this.message = `Usuario autenticado: ${user.email}`;
                console.log(this.message);
            } else {
                this.message = 'No hay usuario autenticado';
            }
        });
    }
}
</script>


<template>
<div>
    <h1> iniciar sesion</h1>
    <input v-model="email" type="email">
    <input v-model="password" type="password">
    <button @click="login">entrar</button>
    <p>{{ message }}</p>

    <router-link to="/register">
    <button>registrarse</button>
  </router-link>

</div>
</template>