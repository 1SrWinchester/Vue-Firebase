<script>
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    data() {
        return {
            // Aquí puedes definir las propiedades que necesites
        email: '',
        password: '',
        message: ''
        }
    },
    methods: {
        // Aquí puedes definir los métodos que necesites
        register() {
            // Lógica para registrar al usuario
            console.log(this.email, this.password);
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Registro exitoso
                    const user = userCredential.user;
                    this.message = user.email, user.password;
                    console.log("Usuario registrado:", user);
                    // Aquí puedes redirigir al usuario a otra vista o mostrar un mensaje de éxito
                    this.$router.push('/login');
                })
                .catch((error) => {
                    // Manejo de errores
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.message = errorMessage;
                    // Aquí puedes mostrar un mensaje de error al usuario
                });
        }
    }

}

</script>


<template>
    <div>
        <h1>Registro</h1>
        <input v-model="email" type="email">
        <input v-model="password" type="password">
        <button @click="register">Registrarse</button>

    </div>
</template>