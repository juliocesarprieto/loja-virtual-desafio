var myObj;// Lista de produtos
var objProd;//produto para atualizar
function getListagemProdutos(){
    myObj = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
                                    
            var tbody = document.getElementById("tbody");
            while (tbody.hasChildNodes()) {
                tbody.removeChild(tbody.firstChild);
            }                               
            for (var y = 0; y < myObj.length; y++) {
                var tr = tbody.insertRow(y);
                var tdNome = tr.insertCell(-1);
                tdNome.innerHTML = myObj[y].nomeProduto;
                var tdDescricao = tr.insertCell(-1);
                tdDescricao.innerHTML = myObj[y].descricaoProduto;
                var tdPreco = tr.insertCell(-1);
                tdPreco.innerHTML = myObj[y].precoProduto;
                var tdBtnDelete = tr.insertCell(-1);
                tdBtnDelete.innerHTML = "<button class='btn-update' onclick='updateProduto(this)'><i class='fas fa-edit'></i></button>"
                                        +"<button class='btn-delete' onclick='removerProduto(this)'><i class='fas fa-trash-alt'></i></button> ";
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/api/produto", true);    
    xmlhttp.send();
}

function getVitrine(){
    myObj = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            if (myObj.length > 0){
                var vitrine = document.getElementById("vitrine");
                var src;
                var newImage;
                var div_box;
                var div;
                var btn_add;
                var span_btn;
                
                while (vitrine.hasChildNodes()) {
                    vitrine.removeChild(vitrine.firstChild);
                }
    
                for(var i=0; i < myObj.length; i++){
                    src = "data:image/jpeg;base64," + myObj[i].imageProduto;                
                    newImage = document.createElement('img');
                    newImage.src = src;                   
    
                    btn_add = document.createElement('button');
                    btn_add.type = 'Button';
                    btn_add.innerHTML = 'Adicionar ';
    
                    span_btn = document.createElement('span');
                    span_btn.className = 'fas fa-shopping-cart';
                    btn_add.appendChild(span_btn);
                    div = document.createElement('div');
    
                    div.appendChild(btn_add);
       
                    div_box = document.createElement('div');
                    div_box.className = 'box';
                    div_box.innerHTML = newImage.outerHTML;
                    div_box.appendChild(div);
       
                    vitrine.appendChild(div_box);
                    src = null;
                }  
            }            
        }        
    };
    xmlhttp.open("GET", "http://localhost:8080/api/produto", true);    
    xmlhttp.send();
}
function sendProduto(){
    
    if (validation()){
        var files = document.getElementById('files').files;
        var id = Number(document.getElementById('idProd').value);
        var nomeProduto = document.getElementById('nomeProd').value;
        var descricaoProduto = document.getElementById('descricaoProd').value;
        var precoProduto = document.getElementById('precoProd').value;
        var imageProduto = '';
        var promise; 
        var objJson;    

        if (id !== null ){
            if ( files.length === 0){
                imageProduto = objProd.imageProduto;
                objJson = JSON.stringify({id, nomeProduto, descricaoProduto, precoProduto, imageProduto});
                send(objJson, 'PUT');
            }else{
                promise = getBase64(files[0]);
                promise.then(function(data) {
                    imageProduto = data;
                    objJson = JSON.stringify({id, nomeProduto, descricaoProduto, precoProduto, imageProduto});
                    send(objJson, 'POST');
                });   
            }
        }else {
            if (files.length > 0) {       
                promise = getBase64(files[0]);
                promise.then(function(data) {
                    imageProduto = data;
                    objJson = JSON.stringify({nomeProduto, descricaoProduto, precoProduto, imageProduto});
                    send(objJson, 'POST');
                });                 
            }
        }
    }
}

function send(data, method){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            closeCadastro();
            var ressult = JSON.parse(this.responseText);
            getListagemProdutos();
            clearForm();
        }
    };
    xmlhttp.open(method, "http://localhost:8080/api/produto", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlhttp.send(data);
}

function removerProduto(element){
    var position = element.parentNode.parentNode.rowIndex;   
    var data = myObj[position -1].id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           getListagemProdutos();              
        }
    };
    xmlhttp.open("DELETE", "http://localhost:8080/api/produto/"+data, true);    
    xmlhttp.send();
}

function updateProduto(element){
    var position = element.parentNode.parentNode.rowIndex;   
    objProd = myObj[position -1];
    var modal = document.getElementById('myModal');
    var hidden = document.getElementById('idProd');
    var nomeProd = document.getElementById('nomeProd');
    var precoProd = document.getElementById('precoProd');
    var descricaoProd = document.getElementById('descricaoProd');    

    hidden.value = objProd.id;
    nomeProd.value = objProd.nomeProduto;
    precoProd.value = objProd.precoProduto;
    descricaoProd.value = objProd.descricaoProduto;
   
    modal.style.display = "block";    

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function getBase64(file){
    let promise = new Promise(resolve => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            resolve(event.target.result);
        };       
    });
    let result = await promise;   
    return result.split(',')[1];
}

function loadHome(){
    var produtos = document.getElementById('produtos');
    var vitrine = document.getElementById('vitrine');
    var menuCadastro = document.getElementById('mnAdd');
    if (produtos.style.display !== "none") {
        produtos.style.display = "none";
        menuCadastro.style.display='none';
        vitrine.style.display = "block";
        getVitrine();
      }
}

function loadProdutos(){
    var vitrine = document.getElementById('vitrine');
    var produtos = document.getElementById('produtos');
    var menuCadastro = document.getElementById('mnAdd');
    if (vitrine.style.display !== "none") {
        menuCadastro.style.display='block';
        vitrine.style.display = "none";
        produtos.style.display = "block";
      }     
}

function onloadPage(){
    var produtos = document.getElementById('produtos'); 
    var menuCadastro = document.getElementById('mnAdd');  
    if (produtos.style.display !== "none") {
        produtos.style.display = "none";
        menuCadastro.style.display = "none";
    }  
}

function openCadastro(){
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");     
    
    modal.style.display = "block";    

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

function closeCadastro(){        
    var modal = document.getElementById('myModal');
    var spa = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
}

function clearForm(){
    var hidden = document.getElementById('idProd');
    var nomeProd = document.getElementById('nomeProd');
    var precoProd = document.getElementById('precoProd');
    var descricaoProd = document.getElementById('descricaoProd');
    var imageProd = document.getElementById('files');

    hidden.value = '';
    nomeProd.value = '';
    precoProd.value = '';
    descricaoProd.value = '';
    imageProd.value = '';
}
function validation(){
    var nomeProd = document.getElementById('nomeProd');
    var descricaoProd = document.getElementById('descricaoProd');
    var precoProd = document.getElementById('precoProd');
    if(nomeProd.value === '' && nomeProd.hasAttribute('required')){
        nomeProd.focus();
        nomeProd.style = "border-style: solid; border-width: 1px; border-color: #FF5722;";
        return false;
      }   
      nomeProd.style = "border-style: none;";   
      if(precoProd.value === '' && precoProd.hasAttribute('required')){
        precoProd.focus();
        precoProd.style = "border-style: solid; border-width: 1px; border-color: #FF5722;";
        return false;
      }
      precoProd.style = "border-style: none; ";
      if(descricaoProd.value === '' && descricaoProd.hasAttribute('required')){
        descricaoProd.focus();
        descricaoProd.style = "border-style: solid; border-width: 1px; border-color: #FF5722;";
        return false;
      }
      descricaoProd.style = "border-style: none;";
      return true;
}