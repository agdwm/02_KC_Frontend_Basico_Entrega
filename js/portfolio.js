var portfolioItems = document.getElementsByClassName('portfolio-item');

for(var i = 0; i < portfolioItems.length; i++){
    portfolioItems[i].addEventListener('click', function (event){
        event.preventDefault();
    });
}

/* Function that loads more images into porfolio */
var contador = 1;

var loadMore = document.getElementById("load-more");

loadMore.addEventListener("click", function(event){
    event.preventDefault();
    peticionAjax(this);
})


function peticionAjax(){
    var xhr;

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    if (contador && contador !== 1){
        contador = 2;
    }

    xhr.open("GET", "http://localhost:8000/galeria"+contador+".html", true);
    xhr.setRequestHeader("Content-Type", "text/html");

    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200){
            var nameId = ("galeria"+contador).toString();
            document.getElementById(nameId).innerHTML = xhr.responseText;
            contador++;
            if (contador > 2){
                document.getElementById("load-more").classList.add("hidden");
            }
        }
    }

    xhr.send();

}

