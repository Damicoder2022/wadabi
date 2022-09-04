window.onload= function(){


	class Producto{

		constructor(name, basicPrice,id,description){
			this.name = name;
			this.image = 'imagenes/' + this.name+'.jpg';
			this.basicPrice = basicPrice;
			this.qty = 0;
			this.id = "00"+id;
			this.description = description;
			this.partialViewDescription = '';
			this.partialViewCatalogue = '';
			this.partialViewFacture = '';
			this.facture = '';
		}
	}
	//  VARIABLES GLOBALES
	if (localStorage.getItem('listaProducto') == null) {
		var tablaProducto =
		[
		new Producto('Vestido',150.50,61,"Vestido"),
		new Producto('Pantalon',260.50,62,"Pantalon"),
		new Producto('Blusa',170.50,63,"Blusa"),
		new Producto('Zapato',580.50,64,"Zapato"),
		new Producto('Remera',390.50,65,"Remera"),
		new Producto('Buzo',1100.50,66,"Buzo"),
		new Producto('Campera',1110.50,67,"Campera"),
		new Producto('Zapatilla',1120.50,68,"Zapatilla"),
		new Producto('Camisa',1130.50,69,"Camisa")
		];
	}else var tablaProducto = JSON.parse(localStorage.getItem('listaProducto'));

	// 
		for (var i = 0; i < tablaProducto.length; i++) {
			tablaProducto[i].partialViewCatalogue = `<div id="tarjeta">
						<div class="card">
						  <img class="card-img-top" src="${tablaProducto[i].image}" alt="Card image cap" width="250px">
						   <div class="overlay">
   							 <div class="text">${tablaProducto[i].description}</div>
 						   </div>
						  <div class="card-body">
							  <h5 class="card-title">${tablaProducto[i].name}</h5>
							    <p class="mb-0">id#: ${tablaProducto[i].id}</p> 
							    <p class="mt-0">prix: ${tablaProducto[i].basicPrice.toFixed(2)}$</p>
							  <span class="span">Cantidad:</span> 
							  <input class="inputNumber" type="number" value="0">
							 <button id="premier" class="btn btn-primary">Carrito</button>
						  </div>
						</div>
					</div>`
					$('#myCatalogue').append(tablaProducto[i].partialViewCatalogue);
		}

	var quantite = 0;

	$('.btn-primary').each(function(){
		$(this).click(function(){
			console.log($(this).parent().children('.card-title').text());
			console.log($(this).parent().children('.inputNumber').val());

			if ($(this).parent().children('.inputNumber').val() > 0) {
				quantite = $(this).parent().children('.inputNumber').val();
				updateQuantite($(this));
			}

		
		});
	});


	function updateQuantite(button){
		for (var i = 0; i < tablaProducto.length; i++) {
			if(tablaProducto[i].name ==  button.parent().children('.card-title').text()){
				tablaProducto[i].qty += parseInt(quantite);

				console.log('El monto total es: ' + tablaProducto[i].qty * tablaProducto[i].basicPrice);
				console.log('El valor por producto es: ' + tablaProducto[i].basicPrice);
				console.log('La cantidad total de productos son: ' + tablaProducto[i].qty);
			}
		}
			quantite = 0;
			button.parent().children('.inputNumber').val('0');
			copiaListaProducto();
	}

	//
	$('.inputNumber').each(function(){
		$(this).keyup(function(){

		 	if (!(isNaN(parseInt($(this).val())))) {						

			 	if (parseInt($(this).val()) < 0) {$(this).val('0')}
		 	}
		 })
	});

	$('.inputNumber').each(function(){
		$(this).change(function(){

		 	if (!(isNaN(parseInt($(this).val())))) {						

			 	if (parseInt($(this).val()) < 0) {$(this).val('0')}
		 	}
		 })
	});

	function copiaListaProducto(listaProducto){
		if (typeof(Storage) !== 'undefined'){
			localStorage.clear();
			localStorage.setItem('listaProducto',JSON.stringify(tablaProducto));
			
		}
		else {
			console.log('Lamentablemente su navegador no soporta esta pagina...');
		}
	}
}

var links = document.getElementById("links");
var categoriesList = document.getElementById("categories");

function burgerClicked(event) {
    links.classList.toggle("hide");
}

function mouseInLinks(event) {
    categories.classList.add('active');
}



var dispProducts = [...products];
// 1- function that shows all products
function filterAll() {
  document.getElementById("displayCard").innerHTML = "";
  dispProducts = [...products];
  displayProducts();
}
// 2- function that shows only mobile products
function filterHom() {
  document.getElementById("displayCard").innerHTML = "";
  dispProducts = products.filter((item) => item.category === "hombre");
  displayProducts();
}
// 3- function that shows only camera products
function filterMuj() {
  document.getElementById("displayCard").innerHTML = "";
  dispProducts = products.filter((item) => item.category === "mujer");
  displayProducts();
}
// 4- function that shows only laptop products
function filterKids() {
  document.getElementById("displayCard").innerHTML = "";
  dispProducts = products.filter((item) => item.category === "kids");
  displayProducts();
}

//create a function to display products.
function displayProducts() {
  var cardsContainers = document.getElementById("displayCard");
  for (var i = 0; i < dispProducts.length; i++) {
    var src = dispProducts[i].imgSrc;
    var title = dispProducts[i].name;
    var price = dispProducts[i].price;
    //main card div
    var card = document.createElement("div");
    card.setAttribute("class", "card item");
    card.setAttribute("style", "width: 15rem");
    //two elements inside main card element
    var img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("class", "card-img-top");
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    //card body has three elements
    var cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = title;
    var cardDesc = document.createElement("p");
    cardDesc.setAttribute("class", "card-text");
    cardDesc.innerText = price;
    var cardBtn = document.createElement("a");
    cardBtn.setAttribute("class", "btn btn-primary");
    cardBtn.setAttribute("onclick", "addToCart()");
    cardBtn.innerText = "Add to the cart";
    //inserting elements in card div
    cardBody.append(cardTitle, cardDesc, cardBtn);
    card.append(img, cardBody);
    cardsContainers.appendChild(card);
  }
  var cardArray = document.getElementsByClassName("card");
  for (var i = 0; i < cardArray.length; i++) {
    cardArray[i].style.backgroundColor = "#f2f2f2";
  }
}

displayProducts();

//Add prodcut to the cart
var cartQuantity = 0;
function addToCart() {
  cartQuantity++;
  document.getElementById("cartQuant").innerText = cartQuantity;
}