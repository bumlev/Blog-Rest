<template>
<!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="css/index.css" />
            <link rel="stylesheet" href="css/responsive.css" />
            <title>Restaurant Blog</title>
        </head>
        <body>
            <div class="cont">
                <div id="post_upload" class="post_upload">
                    <img v-if="userAuth.attachment !== null" class="img_profile_upload rounded-circle" :src="userAuth.attachment" />
                    <img v-else class="img_profile_upload rounded-circle" src="../assets/photo_anonyme1.jpg" />
                    <button @click="create_post" id="button_create_post" class="button_create_post">Create Post</button>
                </div> 

                <div id="block_form_post" class="block_form_post">
                    <form class="form_post" @submit="save_post" >
                        <div class="post">
                            <label for="title">Title</label>
                            <input class="input_title" v-model="title" id="title" />
                        </div>
                        <div class="post">
                            <label for="content">Content</label>
                            <textarea class="input_content" v-model="content" id="content"></textarea>
                        </div>
                        <div class="post">
                            <label for="attachment">Attachment</label>
                            <input v-on:change="selectFile" class="form-control input_attachment" ref="file" type="file" id="attachment" />
                        </div>
                        <div class="button_save_post">
                            <button id="save" class="btn btn-success save">Save</button>
                            <button @click="close_form" id="cancel_post" class="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
                <HomeItem/>
                <handle_elt/>
            </div>
        </body>
    </html>
</template>
<script>
    import axios from 'axios';
    import handle_elt  from '../components/handle_elt.vue'
    import HomeItem from "../components/Home_item.vue";
    export default {
        name:'Home',
        components:{
            HomeItem,
            handle_elt
        },
        data(){
            return{
                username:"",
                title:"",
                content:"",
                file:"",
                userAuth:{} 
            }
        },

        methods:{
            selectFile(){
                this.file = this.$refs.file.files[0]
                console.log(this.file)
            },
            save_post(e){
                e.preventDefault()

                let userAuth = localStorage.getItem('userAuth');
                let post = localStorage.getItem('post');
                userAuth = JSON.parse(userAuth);
                let formData = new FormData()
                formData.append("title", this.title);
                formData.append("content", this.content);
                formData.append("image", this.file);
                if(e.target.elements[4].style.display !== 'none'){
                    axios.post(
                        'http://localhost:3000/api/posts/create',
                        formData ,
                        {
                            headers:{
                                'Content-Type':'multipart/form-data',
                                'authorization' : 'Bearer ' + userAuth.token
                            },
                            
                        }
                    )
                    .then( newPost =>{
                        if(newPost){
                            this.$router.push('/home');
                            window.location.reload();
                        }
                    })
                    .catch( err =>{
                        console.log(err);
                    })
                }else{
                
                    axios.put(
                        'http://localhost:3000/api/posts/'+post+'/update',
                        formData ,
                        {
                            headers:{
                                'Content-Type':'multipart/form-data',
                                'authorization' : 'Bearer ' + userAuth.token
                            },
                            
                        }
                    )
                    .then( postUpdated =>{
                        if(postUpdated){
                            window.location.reload();
                        }
                    })
                    .catch( err =>{
                        console.log(err);
                    })  
                }    
            },
        },
        beforeMount(){
            let userAuth  = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth);
            this.userAuth = userAuth;
        },
    }
</script>
