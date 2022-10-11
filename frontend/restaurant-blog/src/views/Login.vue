<template>
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="css/index.css" />
            <link rel="stylesheet" href="css/responsive.css" />
            <link rel="stylesheet" href="css/authentication.css" />
            <title>Restaurant Blog</title>
        </head>
        <body>
            <login_comp/>
            <handle_elt/>
        </body>
    </html>
</template>
<script>
    import handle_elt from '@/components/handle_elt.vue';
    import login_comp from '@/components/login_comp.vue'
    export default {
        name: "Login",
        components:{
            login_comp,
            handle_elt
        }
    }
</script>
<style></style>