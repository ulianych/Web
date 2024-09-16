window.onhashchange=switchToStateFromURLHash;

text_content = {"Main": 'ОАО «Авиакомпания «Белавиа»' + "<br>" + 'Генеральный директор: Чергинец Игорь Николаевич', "About": "Авиакомпания «Белавиа» - лидер пассажирских перевозок в Республике Беларусь. В основу деятельности авиакомпании заложен принцип создания положительного имиджа, который формируется на основе безопасности, регулярности и точности выполнения полетов, улучшении качества обслуживания пассажиров."}
var state={};

function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    var stateStr=URLHash.substring(1);

    if (stateStr!="" ) {
        var parts=stateStr.split("_")
        state={pagename: parts[0]};
    }
    else
        state={pagename:"Main"};

    var pageHTML="";
    switch(state.pagename) {
        case "Main":
            pageHTML+="<p>"+text_content[state.pagename]+"</p>";
            break;
        case "About":
            pageHTML+="<h2>"+"О нас"+"<h2>";
            pageHTML+="<p>"+text_content[state.pagename]+"</p>";
            var photo="source/plain2.jpg";
            pageHTML+="<img src='"+photo+"'>";
            break;
    }

    document.getElementById('APage').innerHTML=pageHTML;
}

function switchToState(newState) {
    var stateStr=newState.pagename;
    location.hash=stateStr;
}

function switchToMainPage() {
    switchToState( { pagename:'Main'} );
}

function switchToAboutPage() {
    switchToState( { pagename:'About'} );
}

