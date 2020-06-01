

$(document).ready(function(){
    $("#gameBody").on("click",updatePostion)
    init();
});


//Offset for position

var offsetX = "";
var offsetY = "";
var NPCArray = [];
function init()
{
    offsetX = $("#gameBody").position().left + 15;
    offsetY = $("#gameBody").position().top + 15;
    generateNPCs();
}



// MC here 
var MC = {
    x : 0,
    y : 0,
    size : 50
}

console.log(MC.prop);

var NPC = {   
    x : 0,
    y : 0,
    size : 0,
}

function generateNPCs()
{
    for (var i = 0 ; i < 10 ; i++ )
    {
        var NPC = generateNPC();
        NPCArray.push(NPC);
    }
    for (var i = 0 ; i < 10 ; i++ )
    {
        htmlStructureForNPC = `<div id = "NPC${i}" class="NPC"></div>`;
        $("#gameBody").append(htmlStructureForNPC);
        drawnCharacter("NPC"+i,NPCArray[i]);
    }
}


function generateNPC()
{
    var gameBodyX = $("#gameBody").position().left + 10;
    var gameBodyY = $("#gameBody").position().top + 10;
    var gameBodyWidth = $("#gameBody").width() -  ($("#gameBody").width()/10);
    var gameBodyHeight = $("#gameBody").height() -  ($("#gameBody").height()/10);
    var NPC = {
        x : 0,
        y : 0,
        size :0
    }

    while(true)
    {
        x = Math.random() * 1000;
        if(x < gameBodyX + gameBodyWidth) break;
    }
    while(true)
    {
        y = Math.random() * 1000;
        if(y < gameBodyY + gameBodyHeight) break;
    }
    while(true)
    {
        size = Math.random() * 100;
        if(size <= 80 && size > 20) break;
    }
    NPC.x = x.toFixed(0) ;
    NPC.y = y.toFixed(0);
    NPC.size = size.toFixed(0);
    return NPC;
}



function updatePostion()
{
    MC.x = event.pageX - offsetX;
    MC.y = event.pageY- offsetY;
    //console.info("MC Current position :: X : "+ MC.x + "Y : "+ MC.y);
    drawnCharacter('MC',MC);
}

function drawnCharacter(characterId,character)
{
    $("#"+characterId).css({"top":""+character.y+"px","left":""+character.x+"px"});
    $("#"+characterId).width(character.size);
    $("#"+characterId).height(character.size);
}



function detectCollision()
{

}