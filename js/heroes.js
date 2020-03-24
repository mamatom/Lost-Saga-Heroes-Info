
var lastResultsId = [];
$.holdReady(true);
var heroesJson = $.getJSON("./json/newHeroes.json", function (json) {
    //console.log(json);
    heroesJson = json;
    $.holdReady(false);
});


 var newHeroJson = {};

function newJson(){
    $.each(heroesJson, function (_,hero){
        var id = hero.id
        //newHeroJson['id'+('00' + (id)).slice(-3)] = hero;
        newHeroJson['heroId'+id] = hero;


    });
    console.log(JSON.stringify(newHeroJson));

}

function selectHero(heroId){
    $('#resultsContainer').hide();
    var id= ('00' + (heroId.id)).slice(-3);
    $('#heroImg').attr('src','img/heroes sprite/'+id+'_M.png')
    console.log(id);
}



$(document).ready(function populateHeroes() {
    
    var image;
    $.each(heroesJson, function (_, hero) {
        var imgPos = -1 * ((hero.id - 1) * 48);
        var image = '<a class="resultsImg" style="background: url(./img/heroFace.jpg) ' + imgPos + 'px 0px;"></a>';
        var list = '<div class="result" onclick="selectHero(heroesJson.heroId' + hero.id+')" id="heroId' + hero.id + '">' + image + '<div class="resultsTxt">' + hero.name + '</div></div>'
        $("#resultsContainer").append(list);
        lastResultsId.push(hero.id);
    })
    $("#resultsContainer").hide();
});1


function filterHeroes(name, isenter = false) {
    var inputs
    if (isenter)
        inputs = name
    else
        inputs = name.value
    if (inputs != "") {
        var results = [];
        var newResultsId = [];
        var found;
        var reg = '/' + inputs + '/i'
        $.each(heroesJson, function (_, hero) {
            var char = hero.name;
            var reg = RegExp(inputs, 'i');
            search = char.search(reg);
            if (search != -1) {
                var string = [],
                    hlString = [];
                newResultsId.push(hero.id);
                while (char.search(reg) != -1) {
                    search = char.search(reg);
                    string.push(char.slice(0, search));
                    hlString.push(char.slice(search, search + inputs.length));
                    char = char.substr(search + inputs.length);
                }
                string.push(char);
                results.push({
                    'name': hero.name,
                    'id': hero.id,
                    'hlTxt': hlString,
                    'txt': string
                });
            }
        })
        var toRemove = lastResultsId.filter(x => !newResultsId.includes(x));
        for (i = 0; i < toRemove.length; i++) {
            if (i < 8) {
                $("#heroId" + toRemove[i]).hide(500);
            } else {
                $("#heroId" + toRemove[i]).hide();
            }

        }
        lastResultsId = [];
        $(".resultsTxt").remove();
        $("#resultsContainer").show(250);
        var text = '';
        for (i = 0; i < results.length; i++) {
            text = '';
            for (j = 0; j < results[i].txt.length; j++) {
                var txt = '<a class="txt">' + results[i].txt[j] + '</a>',
                    hlTxt = '<a class="hlTxt">' + results[i].hlTxt[j] + '</a>';
                text = text + txt;
                if (j != results[i].txt.length - 1) {
                    text = text + hlTxt;
                }
            }
            $("#heroId" + results[i].id).append('<div class="resultsTxt">' + text + '</div>')
            if (i < 8) {
                $("#heroId" + results[i].id).show(500);
            } else {
                $("#heroId" + results[i].id).show();
            }
            lastResultsId.push(results[i].id);
        }
    } else {
        $("#resultsContainer").hide(250);
    }
}


$(document).mouseup(function (e) {
    var container = $("#resultsContainer"),
        alt = $(".heroInput");
    // If the target of the click isn't the container
    if (!(container.is(e.target) || alt.is(e.target)) && container.has(e.target).length === 0) {
        container.hide('linear');
    }
});