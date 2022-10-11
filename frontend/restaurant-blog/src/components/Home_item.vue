
<script>
import axios from 'axios'
    export default {
        name:'Home_item',
        data(){
            return {
                posts:[],
                userAuth:{},
                post:{},
                mydate:null,
                fileUpdate:"",
                title_update:"",
                content_update:""
            }
        },
        methods:{
            selectFileUpdate(e){
                this.fileUpdate = e.target.files[0]
            },
            like_post(e){
                e.preventDefault() 

                if(e.target.__vnode.type == 'a'){
                    let dislike_icon =  e.target.parentElement.children[1].firstChild;
                    dislike_icon.firstChild.style.color = 'black';
                }else if(e.target.__vnode.type == 'span'){
                    let dislike_icon = e.target.parentElement.parentElement;
                    dislike_icon = dislike_icon.children[1].firstChild;
                    dislike_icon.firstChild.style.color = 'black'
                }else{
                    let dislike_icon = e.target.parentElement.parentElement.parentElement;
                    dislike_icon = dislike_icon.children[1].firstChild;
                    dislike_icon.firstChild.style.color = 'black'
                }
                let like_icon =  e.explicitOriginalTarget;
                let postId = like_icon.dataset.post;
            
                axios.post('http://localhost:3000/api/likes/'+postId+'/like',
                
                {
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':"Bearer " + this.userAuth.token
                    }
                }
                
                )
                .then((like) =>{
                    if(e.target.__vnode.type == 'a'){
                        let span = e.target.firstChild.firstElementChild.previousSibling;
                        span.data = like.data.likes +' ';
                        e.target.firstChild.firstElementChild.style.color = 'red'

                    }else if(e.target.__vnode.type == 'span'){
                        e.target.firstChild.data = like.data.likes + ' '
                        e.target.firstElementChild.style.color = 'red';

                    }else{
                        e.target.previousSibling.data = like.data.likes + ' ';
                        e.target.style.color = 'red';
                    }
                })
            },

            dislike_post(e){
                e.preventDefault()
                if(e.target.__vnode.type == 'a'){
                    let like_icon =  e.target.parentElement.children[0].firstChild;
                    like_icon.firstElementChild.style.color = 'black';
                }else if(e.target.__vnode.type == 'span'){
                    let like_icon = e.target.parentElement.parentElement;
                    like_icon = like_icon.children[0].firstChild;
                    like_icon.firstElementChild.style.color = 'black'
                }else{
                    let like_icon = e.target.parentElement.parentElement.parentElement;
                    like_icon = like_icon.children[0].firstChild;
                    like_icon.firstElementChild.style.color = 'black'
                }
                
                let postId = e.explicitOriginalTarget.dataset.post;
                axios.post('http://localhost:3000/api/likes/'+postId+'/dislike',
                    
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':"Bearer " + this.userAuth.token
                        }
                    }
                    
                    )
                    .then((dislike) =>{
                        if(e.target.__vnode.type == 'a'){
                            let like_icon =  e.target.parentElement.children[0].firstChild
                            like_icon.firstChild.data = dislike.data.dislike ? dislike.data.like +' ': dislike.data.likes +' ' ;
                            e.target.firstChild.firstElementChild.style.color = 'red'

                        }else if(e.target.__vnode.type == 'span'){
                            let like_icon = e.target.parentElement.parentElement;
                            like_icon = like_icon.children[0].firstChild;
                            like_icon.firstChild.data =  dislike.data.dislike ? dislike.data.like +' ': dislike.data.likes +' ' ;
                            e.target.firstElementChild.style.color = 'red';

                        }else{
                            let like_icon = e.target.parentElement.parentElement.parentElement;
                            like_icon = like_icon.children[0].firstChild;
                            like_icon.firstChild.data = dislike.data.dislike ? dislike.data.like +' ' : dislike.data.likes +' ';
                            e.target.style.color = 'red';
                        }

                    })
            },

            find_post(e){  
                e.preventDefault()
                let postId = e.target.dataset.post;
                this.$router.push('/post_details/'+postId);
            },
            delete_post(e){
                e.preventDefault()
                let postId = e.target.dataset.post;
                axios.delete('http://localhost:3000/api/posts/'+ postId + '/delete', 
                    {
                        headers:{
                            'authorization':'Bearer ' + this.userAuth.token
                        }
                    }
                )
                .then( () =>{
                   alert('post deleted');
                   window.location.reload();
                })
            },
            update_post(e){
                e.preventDefault()
                let list_posts = e.explicitOriginalTarget.closest('.list_posts');
                let postId = e.explicitOriginalTarget.dataset.post;
                localStorage.setItem('post' , postId);
                list_posts.children[0].style.display="none";
                list_posts.children[1].style.display="none";
                list_posts.children[2].style.display="flex";
                axios.get('http://localhost:3000/api/posts/'+ postId + '/post',
                    {
                        headers:{
                            'authorization': 'Bearer '+ this.userAuth.token
                        }
                    }
                )
                .then( postFound =>{
                    this.post = postFound
                    this.title_update = postFound.data.title
                    this.content_update= postFound.data.content;
                })
            },
            update(e){
                e.preventDefault();
                console.log(e);
                let userAuth = localStorage.getItem('userAuth');
                let post = localStorage.getItem('post');
                userAuth = JSON.parse(userAuth);
                let formData = new FormData()
                formData.append("title", this.title_update);
                formData.append("content", this.content_update);
                formData.append("image", this.fileUpdate);
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
            },
            close_form(e){
                    e.preventDefault();
                    let list_posts = e.target.closest('.list_posts');
                    list_posts.children[2].style.display="none";
                    list_posts.children[0].style.display="flex";
                    list_posts.children[1].style.display="flex";
            },
            edit_post(e){
                e.preventDefault();
                let item = e.target.parentElement;  
                let edit_item = item.nextElementSibling;
                edit_item.style.display ="flex";
                edit_item.addEventListener('mouseleave' , ()=>{
                    edit_item.style.display ="none";
                })
            },
            format_date(value){
                var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var d = new Date(value);
                var monthName=months[d.getMonth()]
                return d.getDate() + ' ' + monthName + ' '+ d.getFullYear() + ' '+d.getHours() + ':' + d.getMinutes();
            },
        },
        
        beforeMount(){
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth)
            this.userAuth = userAuth;
            axios.get(
                'http://localhost:3000/api/posts/',
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+ userAuth.token
                    }
                }
            )
            .then( postsFound =>{  
                if(postsFound){
                    this.posts = postsFound.data;
                }
            })
        }
    }
</script>

<template>
    <div v-for="(item , i) in posts" :key="i" class="list_posts" id="list_posts">
            <div  v-if="item.attachment !== null" class="image_posts">
              <img class="photo_posts" :src="item.attachment" alt="image for  post"/>
            </div>
            <div class="text_posts">
              <div class="user_post">
                <div class="user_text">
                    <img v-if="item.user.attachment !== null" class="user_photo" :src="item.user.attachment" alt="image of profile of a user">
                    <img v-else class="user_photo" src="../assets/photo_anonyme1.jpg" alt="image of profile of a user" />
                    <div class="user_data">
                      <span>{{ item.user.bio}}</span>
                      <span>{{format_date(item.createdAt)}}</span>
                    </div>
                </div>
                <div class="edit_profil">
                        <a v-if="userAuth.userId == item.user.id"  @click="edit_post" id="item" class="item" href="#"><i class="fa fa-ellipsis-h" aria-hidden="true"></i>
</a>
                        <div id="edit_item" class="edit_item">
                              <a @click="delete_post" :data-post="item.id" class="item_1" href="#">delete</a>
                              <a @click="update_post" :data-post="item.id" class="item_2" href="#">update</a>
                        </div>
                </div>
            </div>
                <div class="description_post">
                  <a @click="find_post" :data-post="item.id" class="link_post" href="#">
                      <h4 :data-post="item.id">{{item.title}}</h4>
                      <p :data-post="item.id">
                        {{item.content}} 
                      </p>
                  </a>
                </div>
              <div class="reactions_post">
                <a @click="like_post" id="likes_post" class="likes_post" :data-post="item.id" href="#">
                    <span :data-post="item.id">{{item.likes}}
                        <i v-if="item.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 1)" style="color:red;" class="fa fa-thumbs-up fa-2x" :data-post="item.id"></i>
                        <i v-else class="fa fa-thumbs-up fa-2x" :data-post="item.id"></i>
                    </span>
                </a>
                <a @click="dislike_post" id="dislikes_post" class="likes_post" :data-post="item.id" href="#">
                    <span :data-post="item.id">  
                        <i v-if="item.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 0)" style="color:red;" class="fa fa-thumbs-down fa-2x" :data-post="item.id"></i>
                        <i v-else class="fa fa-thumbs-down fa-2x" :data-post="item.id"></i>
                    </span>
                </a>
                <a class="comments_post" href="#">
                <span>{{item.comments.length}} Comment(s)</span>
                </a>
              </div>
            </div>
            <div id="change_form_post" class="change_form_post">
                <form class="form_post" @submit="update" >
                    <div class="post">
                        <label for="title">Title</label>
                        <input class="input_title" v-model="title_update" id="title_update" />
                    </div>
                    <div class="post">
                        <label for="content">Content</label>
                        <textarea class="input_content" v-model="content_update" id="content_update"></textarea>
                    </div>
                    <div class="post">
                        <label for="attachment">Attachment</label>
                        <input v-on:change="selectFileUpdate" class="form-control input_attachment" ref="file" type="file" id="attachment_update" />
                    </div>
                    <div class="button_save_post">
                        <button id="update" class="btn btn-success update">Save</button>
                        <button @click="close_form" id="cancel_update_post" class="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
    </div>
</template>