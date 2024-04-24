<template>
  <div class="home" style="color: white;">
    <h1>
      Daily-App
    </h1>
    <div class="intro-home">
      <p> Welcome to your Daily-App! <br> Manage your daily tasks here. <br> <br> <b>Select one and try it out!</b></p>
    </div>
    <div class="bigbox">
      <div class="mediumbox">
        <div class="smallbox">
          <router-link to="/weather"><span>Weather</span> <img src="../assets/rain.webp" alt=""></router-link>
        </div>
        <div class="smallbox">
          <router-link to="/todo"><span>Todo-List</span> <img src="../assets/todo.gif" alt=""> </router-link>
        </div>
      </div>
      <div class="mediumbox">
        <div class="smallbox">
          <router-link to="/calculator"><span>Calculator</span> <img src="../assets/calc.gif" alt=""> </router-link>
        </div>
        <div class="smallbox">
          <router-link to="/map"><span>Google Maps</span> <img src="../assets/map.webp" alt=""> </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>

<style>

.home>h1{
  margin: 90px auto 70px;
  text-decoration: underline overline;
}

.intro-home{
  margin-bottom: 30px;
}

.intro-home>p{
  margin: 0 auto
}

.bigbox{
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
}

.mediumbox{
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.smallbox{
  position: relative;
  border-radius: 30px;
  height: 250px;
  width: 300px;
  background-color: #253d5c;
  margin: 5px;
}

.smallbox>a>span{
  text-decoration: none;
  font-weight: 700;
  position: absolute;
  display: flex;
  top: 20px;
  left: 20px;
  color: white;
  background-color: rgba(255, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 5px;
}

a>img{
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

</style>