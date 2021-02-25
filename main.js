

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
    offsetY = $("#gameBody").position().top;
    generateNPCs();
}



// MC here 
var MC = {
    x : 0,
    y : 0,
    size : 50
}

// console.log(MC.prop);

var NPC = {
    id : 0,   
    x : 0,
    y : 0,
    size : 0,
}

function generateNPCs()
{
    for (var i = 0 ; i < 10 ; i++ )
    {
        var NPC = generateNPC(i);

        while(checkOverLapBetweenAll(NPC))
        {
            // console.log(`Old NPC :: ${JSON.stringify(NPC)}`)
            NPC = generateNPC(i);
            // console.log(`New NPC :: ${JSON.stringify(NPC)}`)
        }        
        NPCArray.push(NPC);
    }
    for (var i = 0 ; i < 10 ; i++ )
    {
        htmlStructureForNPC = `<div id = "NPC${i}" class="NPC"></div>`;
        $("#gameBody").append(htmlStructureForNPC);
        drawnCharacter("NPC"+i,NPCArray[i]);
    }
}


function generateNPC(id)
{
    var gameBodyX = $("#gameBody").position().left + 10;
    var gameBodyY = $("#gameBody").position().top + 10;
    var gameBodyWidth = $("#gameBody").width() -  ($("#gameBody").width()/10);
    var gameBodyHeight = $("#gameBody").height() -  ($("#gameBody").height()/10);
    var NPC = {
        id : id,
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
        if(y <  gameBodyHeight) break;
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
    MC.x = event.pageX - offsetX - MC.size;
    MC.y = event.pageY- offsetY - MC.size;
    //console.info("MC Current position :: X : "+ MC.x + "Y : "+ MC.y);
    drawnCharacter('MC',MC);
}

function drawnCharacter(characterId,character)
{
    $("#"+characterId).css({"top":""+character.y+"px","left":""+character.x+"px"});
    $("#"+characterId).width(character.size);
    $("#"+characterId).height(character.size);
}



function detectOverlap(character1,character2,char1id,char2id)
{  
    // Checking for overlap by projection on axis

    x1min = 0;
    x1max = 0;
    y1min = 0;
    y1max = 0;
    x2min = 0;
    x2max = 0;
    y2min = 0;
    y2max = 0;

    if(character1 == MC)
    {
        y1min = parseInt($("#MC").css("top"));
        y1max = y1min + parseInt(character1.size);
        x1min = parseInt($("#MC").css("left"));
        x1max = x1min + parseInt(character1.size);
    }
    else
    {
        y1min = parseInt(character1.y);
        y1max = y1min + parseInt(character1.size);
        x1min = parseInt(character1.x);
        x1max = x1min + parseInt(character1.size);
    }

    x2min = parseInt(character2.x);
    x2max = x2min + parseInt(character2.size);
    y2min = parseInt(character2.y);
    y2max = y2min + parseInt(character2.size);

    overlapOnxAxis = (x1max >= x2min && x2max >= x1min );
    overlapOnyAxis = (y1max >= y2min && y2max >= y1min );

    if( overlapOnxAxis && overlapOnyAxis) 
    {
        // console.info(`Overlap found between ${char1id} and ${char2id}`); 
        return true;
    }
    return false;
}

function checkOverLapBetweenAll(NPC)
{
    //checking between MC and NPC
    let status = "";
    status = detectOverlap(MC,NPC,'Mc',NPC.id);

    if(status == true) return true;

    for (curNPC of NPCArray)
    {
        status = detectOverlap(curNPC,NPC,curNPC.id,NPC.id);
        if(status == true) 
        {
            return true
        };
    }
    return status;
}