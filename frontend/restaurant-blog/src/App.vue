<script>
  import axios from 'axios';
 export default {
    name:'App',
    data(){
      return {
        auth : localStorage.getItem('userAuth')
      }
    },
    methods:{
      logout(e){
                e.preventDefault();
                axios.post(
                'http://localhost:3000/api/users/logout',
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':"Bearer " + this.auth
                    }
                }
                )
                .then( message =>{
                    if(message){
                        localStorage.clear();
                        window.location.href = "http://localhost:8080/#/login";
                        this.$router.push('/login')
                        location.reload();
                    }
                })
            },
    }
 }
</script>

<template>
  <nav v-if="auth == null">
        <ul class="me">
          <li class="log"><a href="#">restaurant blog</a></li>
          <li class="it but sec"><router-link to="/">Sign Up</router-link></li>
          <li class="it but sec"><router-link to="/login">Login</router-link></li>
          <li class="tog"><a href="#"><i class="fas fa-bars"></i></a></li>
        </ul>
  </nav>
  <nav v-else-if ="auth !== null">
        <ul class="me">
          <li class="log"><router-link to="/home">restaurant blog</router-link></li>
          <li class="it text-decoration-none"><router-link @click="logout" to="#">Logout</router-link></li>
          <li class="tog"><a><i class="fas fa-bars"></i></a></li>
        </ul>
  </nav>
  <router-view/>
</template>

<style>
  
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

  body {
      font-family: 'Montserrat', sans-serif;
      line-height: 1.6;
      margin: 0;
      min-height: 100vh;
      background-color: #f9f5f5;
  }

  nav {
      width: 100%;
      position:fixed;
      top: 0px;
      background-color: #f4f4f4;
      padding: 5px 20px; 
      -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  }
  ul {
      list-style-type: none;
  }

  a {
      color: #34495e;
      font-size: .99em;
      text-decoration: none;
  }

  a:hover {
      text-decoration: underline;
  }

  .log a:hover {
      text-decoration: none;
  }

  .me li {
      font-size: 16px;
      padding: 15px 5px;
      white-space: nowrap;
      text-transform: uppercase;
  }
  .log a,
  .tog a {
      font-size: 1.45em;
  }
  .but.sec {
      border-bottom: 1px #444 solid;
  }
  .me {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin:0px 0px 0 -30px;
  }

  .tog {
      order: 1;
  }
  .it.but {
      order: 2;
  }
  .it {
      width: 100%;
      text-align: center;
      order: 3;
      display: none;
  }
  .it.active {
    display: block;
  }
  @media all and (min-width: 600px) {
    .me{
      justify-content: center;
    }
    .log{
      flex: 1;
    }
    .tog{
      flex: 1;
      text-align: right;
    }
    .it.but{
      width: auto;
      order: 1;
      display: block;
    }
    .tog{
      order: 2;
    }
    .but.sec{
      border: 0;
    }
    .but a {
      padding: 7.5px 15px;
      background: teal;
      border: 1px #006d6d solid;
    }
    .but.sec a {
      background: transparent;
    }
    .but a:hover {
      text-decoration: none;
    }
    .but:not(.secondary) a:hover {
      background: #006d6d;
      border-color: #005959;
    }
    .but.secondary a:hover {
      color: #ddd;
    }

    nav{
        width: 100%;
        position:fixed;
    }
  }
  @media all and (min-width: 960px) {
    .it {
        display: block;
        width: auto;
    }
    .tog {
        display: none;
    }
    .log {
        order: 0;
    }
    .it {
        order: 1;
    }
    .but {
        order: 2;
    }
    .me li {
        padding: 15px 10px;
    }
    .me li.but {
        padding-right: 0;
    }
    nav{
        width: 100%;
        position:fixed;
    }
  }
</style>
