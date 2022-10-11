<template>
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
            <register_comp/>
        </body>
    </html>
</template>

<script>
    import register_comp from '../components/register_comp.vue'
    export default {
        name : 'register',
        components:{
            register_comp
        }
    }
</script>