// MC here 
var MC = {
    x : 0,
    y : 0,
    size : 50
}

$(document).ready(function(){
    $("#gameBody").on("click",updatePostion)
});

function updatePostion()
{
    MC.x = event.pageX;
    MC.y = event.pageY;
    console.info("MC Current position :: X : "+ MC.x + "Y : "+ MC.y);
}


