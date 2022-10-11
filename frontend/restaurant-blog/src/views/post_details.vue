<template>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="css/index.css" />
        <link rel="stylesheet" href="css/responsive.css" />
        <link rel="stylesheet" href="css/description.css" />
        <title>Restaurant Blog</title>
    </head>
    <body>
        <div class="description_text">
            <div class="user_description">
                <img v-if="post.user.attachment !== null" class="user_photo_desc" :src="post.user.attachment" alt="image for profile of users">
                <img v-else class="user_photo_desc" src="../assets/photo_anonyme1.jpg" alt="image for profile of users">
                <div class="user_data_desc">
                    <span>{{post.user.bio}}</span>
                    <span>{{post.createdAt}}</span>
                </div>
            </div>
            
            <h3 class="title_description">{{post.title}}</h3>
            <img v-if="post.attachment !== null" class="img_description" :src="post.attachment" alt="">
            <p class="content_description">
                {{ post.content}}
            </p>
            <div class="reactions_description">
                <a  @click="like_post" id="likes_post" class="likes_description" :data-post="post.id" href="#">
                    <span :data-post="post.id">
                        {{post.likes}}  
                        <i v-if="post.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 1)" style="color:red;" class="fa fa-thumbs-up fa-2x" :data-post="post.id"></i>
                        <i v-else class="fa fa-thumbs-up fa-2x" :data-post="post.id"></i>
                    </span>
                </a>
                <a  @click="dislike_post" id="dislikes_post" class="likes_description" :data-post="post.id" href="#">
                    <span :data-post="post.id">
                        <i v-if="post.liks.some(obj => obj.userId === userAuth.userId && obj.isLike == 0)" style="color:red;" class="fa fa-thumbs-down fa-2x" :data-post="post.id"></i>
                        <i v-else class="fa fa-thumbs-down fa-2x" :data-post="post.id"></i>
                    </span>
                </a>
                <a class="comments_description" href="#">
                    <span>{{post.comments.length}} Comment(s)</span>
                </a>
            </div>
            <div class="add_comments">
                <img v-if="userAuth.attachment !== null" class="image_add_comments" :src="userAuth.attachment" alt="User profile for comments">
                <img v-else class="image_add_comments" src="../assets/photo_anonyme1.jpg" alt="User profile for comments">
                <textarea id="input_1" maxlength="60" class="input_control input_comment"  @keyup.enter="post_comment" ></textarea>
            </div>
            <span class="comments">Comments</span>
            <div v-for="(comment , i) in post.comments" :key="i" class="written_comments">
                <img v-if="comment.user.attachment !== null" class="image_add_comments" :src="comment.user.attachment" alt="User profile for comments">
                <img v-else class="image_add_comments" src="../assets/photo_anonyme1.jpg" alt="User profile for comments">
                <div class="title_text_comments">
                    <span>{{comment.user.username}}</span>
                    <p>
                        {{ comment.content}}
                    </p>
                </div>
            </div>
        </div>
        <handle_elt/>
    </body>
</html>
</template>
<script>
    import axios from 'axios'
    export default{
        name:'post_details',
        data(){
            return{
                post:{},
                userAuth:{}
            }
        },
        methods:{
            post_comment(e){
                e.preventDefault()
                let comment = e.target.value;
                let postId = this.post.id;
                axios.post('http://localhost:3000/api/comments/'+ postId +'/create', 
                    {
                        content:comment
                    },
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':'Bearer ' + this.userAuth.token
                        }
                    }
                )
                .then(() =>{
                    alert('post commented ');
                    window.location.reload();
                })
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
        },
        beforeMount(){
            let userAuth = localStorage.getItem('userAuth');
            userAuth = JSON.parse(userAuth);
            this.userAuth = userAuth;
            let postId = this.$route.params.postId;
            axios.get('http://localhost:3000/api/posts/'+ postId + '/post' , 
            
                {
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+ userAuth.token
                    }
                }
            )
            .then(postFound =>{
               this.post = postFound.data
            })
        }
    }
</script>