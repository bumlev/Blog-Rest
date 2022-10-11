<template>
    <div class="block_login">
        <span>Sign In</span>
        <form class="form_login" action="#" @submit="login">
            <div class="login">
                <label for="email">Email</label>
                <input v-model="email" class="input_email" type="text" id="email"/>
                <span id="err_email">Error de input_email</span>
            </div>
            <div class="login">
                <label for="password">Password</label>
                <input v-model="password" class="input_password" type="text" id="password"/>
                <span id="err_password">Error de input_password</span>
            </div>
            <div class="login">
                <button class="btn btn-primary">login</button>
            </div>
        </form>
    </div>
</template>

<script>

    import axios from 'axios'
    export default{
        name: "login_comp",
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            async login(e){
                e.preventDefault();
                let err_password = document.getElementById('err_password');
                err_password.style.display = 'none';

                let err_email = document.getElementById('err_email');
                err_email.style.display = 'none';
                
                let user = {
                    email:this.email,
                    password: this.password
                }
                await axios.post(
                    'http://localhost:3000/api/users/login',
                    user
                ) 
                .then( userAuthenticated => {
                    if(userAuthenticated){
                        let userId = userAuthenticated.data.userId;
                        let userisAdmin = userAuthenticated.data.userisAdmin;
                        let username = userAuthenticated.data.username;
                        let attachment = userAuthenticated.data.attachment;
                        let bio = userAuthenticated.data.bio;
                        let token = userAuthenticated.data.token;
                        let userAuth ={userId:userId , userisAdmin:userisAdmin , username:username , attachment:attachment , token:token , bio:bio};
                        localStorage.setItem('userAuth' , JSON.stringify(userAuth));
                        window.location.href = "http://localhost:8080/#/home";
                        this.$router.push('/home');
                        location.reload();
                    } 
                })
                .catch( err =>{
                    let data = err.response.data;
                    if(data.password_err){
                        err_password.style.display = 'flex';
                        err_password.textContent = data.password_err;
                    }
                    if(data.email_err){
                        err_email.style.display = 'flex';
                        err_email.textContent = data.email_err;
                    }
                })
            }
        }
    }
</script>