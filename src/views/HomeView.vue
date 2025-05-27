<script>
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default {
  name: 'HomeView',
  data() {
    return {
      inputCity: "",
      inputCountry: "",
      cities: [],
      editingCity: null
    }
  },
  methods: {

    // ++++++ Añadir datos en firestore
    // Este método añade una nueva ciudad a la colección "viajes" en Firestore
    // Si se está editando una ciudad, actualiza los datos en lugar de añadir una nueva
    // import { addDoc }
    async addCity() {

      // Validación de campos vacíos
      // Si los campos de ciudad o país están vacíos, muestra un mensaje de alerta
      if (this.inputCity === "" || this.inputCountry === "") {
        alert("Por favor, completa los campos de ciudad y país.");
        return;
      }
      // Si se está editando una ciudad, llama al método updateCity
      // de lo contrario, añade una nueva ciudad a la colección "viajes"
      if (this.editingCity) {
        this.updateCity()
      } else {
        console.log("añadir ciudad", this.inputCity);

        const docRef = await addDoc(collection(db, "viajes"), {
          title: this.inputCity,
          country: this.inputCountry,
        });
        console.log("Document written with ID: ", docRef.id);

      }


      this.inputCity = "";
      this.inputCountry = "";
      this.editingCity = null
      this.getCities();

    },
    // ++++++ Obtener datos de firestore
    // Este método obtiene los datos de la colección "viajes" y los almacena en el array "cities"
    async getCities() {
      // import { collection, onSnapshot }
      // Utilizando onSnapshot para escuchar los cambios en tiempo real
      const viajesRef = collection(db, "viajes");
      onSnapshot(viajesRef, (snapshot) => {
        this.cities = [];
        snapshot.forEach((doc) => {
          this.cities.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
      //----------------------------------------------------------------------------
      //import { getDocs }
      // Alternativamente, se puede usar getDocs para obtener los datos una sola vez
      // this.cities = [];
      // const viajes = collection(db, "viajes")
      // const todosLosViajes = await getDocs(viajes);
      // todosLosViajes.forEach((doc) => {
      //  console.log(doc.id, " => ", doc.data());

        // this.cities.push({
        //  id: doc.id,
        //  ...doc.data()
          //que hace esto?
          // ...doc.data() es una forma de desestructurar el objeto
          // y añadir sus propiedades al nuevo objeto que estamos creando
          // en este caso, estamos añadiendo las propiedades title y country
          // del documento Firestore al nuevo objeto que estamos creando
          // con el id del documento
          // de esta forma, podemos acceder a las propiedades title y country
          // directamente desde el objeto city
       // })
      // });
      //---------------------------------------------------------------------------
    },
    // ++++++ Editar datos en firestore
    // Este método permite editar una ciudad seleccionada, cargando sus datos en los campos de entrada
    // y cambiando el botón de añadir a actualizar
    editCity(city) {
      this.editingCity = city
      this.inputCity = city.title
      this.inputCountry = city.country
    },
    // ++++++ Actualizar datos en firestore
    // Este método actualiza los datos de la ciudad que se está editando
    // utilizando el ID de la ciudad para identificar el documento en Firestore
    // import { updateDoc, doc }
    async updateCity() {
      const citiRef = doc(db, "viajes", this.editingCity.id);
      await updateDoc(citiRef, {
        title: this.inputCity,
        country: this.inputCountry,
      });
    },
    // ++++++ Borrar datos en firestore
    // Este método borra una ciudad de la colección "viajes" utilizando su ID
    // import { deleteDoc, doc }
    async borrarCity(id) {
      const citiRef = doc(db, "viajes", id);
      await deleteDoc(citiRef);
      await this.getCities();
    }
  },
  // Cuando el componente o vista está lista para el usuario, es visible, se ejecuta el método mounted
  mounted() {
    this.getCities();
  }
}
</script>

<template>
  <main style="margin-top: 100px;">

    <div>
      <input v-model="inputCity" placeholder="Ciudad" type="text">
      <input v-model="inputCountry" placeholder="País" type="text">
      <button @click="addCity">{{ editingCity ? 'Actualizar' : 'Añadir' }}</button>
    </div>

    <ul style="margin-top: 50px;">
      <li v-for="city in cities" :key="city.id">{{ city.title }} - {{ city.country }} 
        <button @click="editCity(city)">Editar</button>
          <button @click="borrarCity(city.id)">Borrar</button>
          </li>
    </ul>

  </main>
</template>
