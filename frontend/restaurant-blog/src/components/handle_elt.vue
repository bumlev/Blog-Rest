<script>
    import $ from 'jquery'
    export default{
        name:'handle_elt',    
    }

    $(function() {
        $(".tog").on("click", function() {
            if ($(".it").hasClass("active")) {
                $(".it").removeClass("active");
                $(this).find("a").html("<i class='fas fa-bars'></i>");
            } else {
                $(".it").addClass("active");
                $(this).find("a").html("<i class='fas fa-times'></i>");
            }
        });

        //Creating post
        $('#button_create_post').on('click' , function(){
            $('#post_upload').css('display' , 'none');
            $('#block_form_post').css('display' , 'flex');
        })

        // Cancel creating post
        $('#cancel_post').on('click' , function(e){
            e.preventDefault()
            $('#block_form_post').css('display' , 'none');
            $('#post_upload').css('display' , 'flex');
        })

        $('#likes_post').on('click' , function(e){
            e.preventDefault();  
            if($('.icon_1').hasClass('far fa-heart')){ 
                $('.icon_1').removeClass('far fa-heart');
                $('.icon_1').addClass('fas fa-heart');
            }else{
                $('.icon_1').removeClass('fas fa-heart')
                $('.icon_1').addClass('far fa-heart');
            } 
        })

        let len =  $('#input_1') .attr('maxlength')
        let count =0;
        // write a comment
        $('#input_1').on('input' , function(){
            let len_input = $(this).val().length;
            let val_input =$(this).css('height').replace('px' , '');

            if(len_input == $(this).attr('maxlength')){
                count +=20;
                $(this).css('height' , Number(val_input)+count);
                $(this).attr('maxlength' , len_input*2);
            }else if(len_input == len){
                $(this).css('height' , len);
                $(this).attr('maxlength' , len);
            }
        })
    });
</script>