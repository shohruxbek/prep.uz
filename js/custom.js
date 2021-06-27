var sctollTop_length = 0;
var i=true;
var j=false;
function scroll_pause(){
    if(i){
        sctollTop_length = $(window).scrollTop();
        $("body").css("overflow", "hidden");
        i=false;
        j=false;
    }else{
        $("body").css("overflow", "auto");
        $(window).scrollTop(sctollTop_length);
        i=true;
        j=true;
    }
}

function scroll_resume(){
    if(j){
        $("body").css("overflow", "auto");
        $(window).scrollTop(sctollTop_length);
        i=true;
        j=false;
    }
    else{j=true;}
}

$(".phone-mask").inputmask({"mask": "+(\\9\\98) 99-999-99-99"});
$("input").attr('autocomplete', 'off');
