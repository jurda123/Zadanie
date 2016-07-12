var $frm = $("#frmArt");

//Pridanie funkcionality pre kliknutie na tlacidlo "Ulož článok"
$frm.submit(function(event){  //tu potrebujem aj objekt s udalosťou, aby som
    event.preventDefault(); //zrušiť pôvodné spracovanie udalosti
    skontrolujAOdosli();
});

function skontrolujAOdosli(){
    //1. Uloží údaje z formulára do objektu
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){//ak je hodnota neprázdny reťazec
                data[item.name] = itemValueTrimmed;
            }
        }
    );

    console.log("skontrolujAOdosli> Údaje po uložení z formulára do objektu:");
    console.log(JSON.stringify(data));

    //3.Kontrola, či boli zadané povinné polia
    if(!data.title){ //toto len pre istotu
        alert("Názov článku musí byť zadaný a musí obsahovať čitateľné znaky");
        return;
    }
    if(!data.content){ //toto je dôležité, keďže na textarea sa nedá použiť pattern. Odchytí, keď používateľ do prvku content
        //zadal iba biele znaky
        alert("Obsah článku musí byť zadaný a musí obsahovať čitateľné znaky.");
        return;
    }
    console.log("prepareAndSendArticle> Povinné údaje úspešne skontrolované:");
    data.content += "<br>";
   
    //pohlavie
    if(data.pohlavie == "1"){
        data.content += "<br> pohlavie: neuvedene";
        }
    else if(data.pohlavie == "2"){
        data.content += "<br> pohlavie: zena";
        }
    else if(data.pohlavie == "1"){
        data.content += "<br> pohlavie: muz";
        }
   
    
    //hrad
    
    if(data.hrad == "historia"){
    data.content += "<br> na hrade ma zaujala historia";
    }
    
    else if(data.hrad == "poloha"){
        data.content += "<br> na hrade ma zaujala poloha";
    }
    else if(data.hrad == "vzhlad"){
        data.content += "<br> na hrade ma zaujal vzhlad";
    }
    else {
        data.content += "<br> na hrade ma nic nezaujalo";
    }
    //dojmy
    if(data.dojmy == "1"){
        data.content += "<br> neuvedene hodnotenie";
    }
    else if(data.dojmy == "2"){
        data.content += "<br> Stranka sa mi paci";
    }
    else if(data.dojmy == "3"){
        data.content += "<br> Stranka sa mi nepaci";
    }
    else if(data.dojmy == "4"){
        data.content += "<br> Stranka by mohla byt lepsia";
    }
    else if(data.dojmy == "5"){
        data.content += "<br> Stranka je katastrofa";
    }
    
    //dojmy
    switch(data.navsteva){
    case "1": data.content += "<br>  Hrad by som navstivil";break
    case "2": data.content += "<br>  Hrad by som nenavstivil";break
    	
    }
//    if(data.navsteva == 1){
//        data.content += "<br>  Hrad by som navstivil";
//    }
//    if(data.navsteva == 1){
//        data.content += "<br> Hrad by som nenavstivil";
//    }
    
    
    
    
    
    //4. odoslanie údajov
    if(window.confirm("Skutočne si želáte článok odoslať?")){
        $.ajax({
            type: "POST",
            url: "http://wt.kpi.fei.tuke.sk/api/article",
            contentType:"application/json;charset=UTF-8",
            dataType: "json",
            data:JSON.stringify(data),
            success: function (response) {
                if(response.id){
                    console.log(response.id);
                    window.alert("Článok úspešne uložený s id=" + response.id + ".");
                    window.open('http://hron.fei.tuke.sk/~korecko/WebTechAkademia/wtKpiBlogBrowser/article.html?id='+response.id, '_blank');
                    $frm.trigger('reset');
                }
            },
            error: function (jxhr) {
                window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}
