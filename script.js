/*
Create (új sor, új objektum)
Read (táblázat lista)
Update (sor (objektum) módoisítás)
Delete (sor tötlés)

CRUD műveletek
*/

//state

state = {
    //Adatstruktúra
    products: [
        {
            id: idGen(),
            name: "Áru 1",
            price: 1500,
            quantity: 97,
            isInStock: true
        },
        {
            id: idGen(),
            name: "Áru 2",
            price: 2500,
            quantity: 15,
            isInStock: true
        },
        {
            id: idGen(),
            name: "Áru 3",
            price: 3500,
            quantity: 25,
            isInStock: false
        },
        {
            id: idGen(),
            name: "Áru 4",
            price: 4500,
            quantity: 10,
            isInStock: true
        }
    ],

    cart: [],

    event: "read", //milyen állapotban van: read, delete, update, create
    currentId: null //Update esetén itt tároljuk a módosítandó product id-jét
}

//#region Segéd függvények
//Űrlap megjelenítése
function formView(){
    document.getElementById("form").classList.remove("d-none")
}

//űrlap elrejtése
function formHide(){
    document.getElementById("form").classList.add("d-none")
}

//Id generátor
function idGen(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

//id alapján megkeresi az index-et: id -> index
function searchIndex(id){
    for (let index = 0; index < state.products.length; index++) {
        if (id === state.products[index].id) {
            return index;
        }
    }
}
//#endregion 

//Mégse gomb működtetése
document.getElementById("cancel-product").onclick=function(){
    state.event = "read";
    formHide();
};

//Create: Új áru gomb
document.getElementById("new-product").onclick = function(id){
    state.event = "create";
    //látszódjon az Új áru cím

    document.getElementById("title-new").classList.remove("d-none");
    document.getElementById("title-update").classList.add("d-none");
    formView();
};

//Save: Mentés gomb
document.getElementById("save-product").onclick = function(event){
    event.preventDefault();

    //Hozzájutás az adatokhoz
    let name = document.getElementById("name").value;
    let price = +document.getElementById("price").value;
    let isInStock = document.getElementById("isInStock").checked;

    //validálás
    let errorList = [];
    if (! (name)){
        console.log("namehiba");
        document.getElementById("name-label").classList.add("text-danger");
        errorList.push("Name hiba");
    }else{
        document.getElementById("name-label").classList.remove("text-danger");
    }
    if (! (price)){
        console.log("namehiba");
        document.getElementById("price-label").classList.add("text-danger");
        errorList.push("Price hiba");
    }else{
        document.getElementById("price-label").classList.remove("text-danger");
    }

    if (errorList.length >0) {
        return;
    }

   //alapban generálunk
    let id = idGen();
    if(state.event === "update") {
        //update: az kéne, amire kattintottunk
        id = state.currentId;
    }
  

    let product = {
        id: id,
        name: name,
        price: price,
        isInStock: isInStock
    }

    if (state.event == "create" ) {
        state.products.push(product);
    }
   else if (state.event = "update") {
        let index = searchIndex(id);
        state.products[index] = product;
    }
    
    renderProducts();
    formHide()

    //mezők ürítése
    document.getElementById("name").value = null;
    document.getElementById("price").value = null;
}

//Kosár megmutatása
function cartRender(){
    //kosár ablak megjelenítése
    cardBoxView();

    //lista előállítása
    let cardHtml = "";
    let total = 0
    //végigmegyünk a kosáron (state.cart)
    for (const product of state.cart) {
        cardHtml += `
        <li class="list-group-item">
            ${product.name}, ${product.price} Ft/db, ${product.quantity}db ár: ${product.price*product.quantity} Ft
            <button
              type="button"
              class="btn btn-danger btn-sm"
              onclick="deleteFromCart('${product.id}')"
            >
              Törlés
            </button>
        </li>
        `;
        total += product.price*product.quantity;
    }

    //lista berkása az ul-be
    document.getElementById("cart-list").innerHTML = cardHtml;
    //total kiírása
    document.getElementById("total").innerHTML = total;
}

//kosár áru mennyiség kiszámolása, és beírása
function renderCartCount(){
    //mennyi áru van a kosárban?
    let count = state.cart.length;
    //Írd ki ezt az értéket a "cart-count"-ba
    document.getElementById("cart-count").innerHTML=count;
}

//Törlés a kosárból
//issue: Törlés a kosárból
function deleteFromCart(id){
    //megkeressük a cart-ban az idexet ami az id-hez tartozik
    let index = seachIndexByIdInCart(id);
    //kiszedjük a kosárból az index-hez tartozó árut
    
    //darabszám korrekció
    //1. megkesem a darabszámot
    let quantity = state.cart[index].quantity;
    //2. megkeresem a ratkárban a kitörölt árut
    let indexPducts = searchIndex(id);
    //3. korrigálom a darbszámát
    state.products[indexPducts].quantity += quantity;
    
    state.cart.splice(index,1);
    //render: kosár, kártyák
    cartRender();
    renderProducts();
}

//megkeressük a cart-ban az idexet ami az id-hez tartozik
function seachIndexByIdInCart(id){
    let indexReturn = -1;
    for (let index = 0; index < state.cart.length; index++) {
        if (state.cart[index].id == id) {
            indexReturn = index;
            break;
        }
    }

    return indexReturn;
}

//A fizetés folymata
//issue: ki kell doglozni a fizetés folymatát
function payRender(){
    console.log("payRender()");
    cartBoxHide();
}

//Tovább vásárolok
function continueBy(){
    console.log("continueBy()");
    cartBoxHide();
}

//Kosár eltüntetése
function cartBoxHide(){
    document.getElementById("cart-box").classList.add("d-none");
}

//kosár megjelenítése
function cardBoxView(){
    document.getElementById("cart-box").classList.remove("d-none");

}


    

//Read: product lista
function renderProducts(){
    console.log(state.products);
    state.event = "read";
    let prodctsHtml = "";
    
    state.products.forEach(product => {
        prodctsHtml += `
        <div class="col">
            <div class="card ${product.quantity > 0 ? "" : "bg-warning"}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Termék ár: ${product.price} Ft</p>
                    <p class="card-text">Raktáron: ${product.quantity} db</p>
                </div>

                <div class="d-flex flex-row m-2">

                    <!-- Törlés -->
                    <button type="button" 
                        class="btn btn-danger btn-sm"
                        onclick="deleteProduct('${product.id}')"
                    >
                        Törlés
                    </button>

                    <!-- Módosítás -->
                    <button type="button" 
                        class="btn btn-success btn-sm ms-2"
                        onclick="updateProduct('${product.id}')"
                    >
                        Módosít
                    </button>
                </div>

                <div class="d-flex flex-row m-2">
                    <!-- Kosárba rakás -->
                    <button type="button" 
                        class="btn btn-outline-success col-4"
                        onclick="intoCart('${product.id}')"
                    >
                        <i class="bi bi-cart-plus"></i>
                    </button>
                    
                    <!-- Mennyit rakok a kosárba -->
                    <input
                        type="number"
                        class="form-control ms-2"
                        id="${product.id}"
                        value="1"
                        min="1"
                        max="${product.quantity}"
                        onchange="quantityInputCheck('${product.id}')"
                    />
                </div>
            </div>
        </div>`;
        
    });
    document.getElementById("product-list").innerHTML = prodctsHtml;
}

function quantityInputCheck(id){
    //kiszedjük mi van beleírva
    let quantity = +document.getElementById(id).value;
    console.log("check", id, quantity);

    //kiszedjük az id alpján, hogy a raktrban mennyi van belőle
    let index = searchIndex(id);
    let quantityProduct = state.products[index].quantity;
    //vizsgálódás, ha többet, vagy negatívot írtunk, akkor korrigálunk
    if (quantity < 0) {
        document.getElementById(id).value = 1;
    } else if(quantity > quantityProduct) {
        document.getElementById(id).value = quantityProduct;
    }
}

//Kosár
//issue: nem kell az isInsStock: bevitel, és egyéb helyeken
function intoCart(id){
    //Derítsük ki az indexet
    let index = searchIndex(id);
    
    let quantity = +document.getElementById(`${id}`).value

    //Mennyiség korrektció:
    //le kell vonni az eredeti mennyiségből
    state.products[index].quantity = state.products[index].quantity - quantity;

    // let product = {
    //     id: state.products[index].id,
    //     name: state.products[index].name,
    //     price: state.products[index].price,
    //     quantity: quantity,
    //     isInStock: state.products[index].isInStock
    // }
    let product = {...state.products[index]}
    product.quantity = quantity;

    // let product = state.products[index];

    //van-a kosárban id-jű áru???
    let indexCart = seachIndexByIdInCart(id);
    if (indexCart === -1) {
        //még nincs ilyen áru a kosárban
        //push a kosárba
        state.cart.push(product);
    } else {
        state.cart[indexCart].quantity += quantity;
    }
    //a kosárba ezzel amennyiséggel kell berakni


    //újrarendereljük a termékeket
    renderProducts();
    renderCartCount()

    //logojuk a kosarat
    console.log(state.cart);

}



//Update: Módosít gomb függvénye
function updateProduct(id){
    state.event = "update"
    state.currentId = id;
    //kerüljenek bele az űrlapba a kártya datai
    let index = searchIndex(id);
    //beolvassuk az űrlapba
    let name = state.products[index].name
    let price = state.products[index].price
    let isInStock = state.products[index].isInStock
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("isInStock").checked = isInStock;

    document.getElementById("title-update").classList.remove("d-none");
    document.getElementById("title-new").classList.add("d-none");

    formView();
    console.log(id);
}

//Delete: Töröl gomb függvénye
function deleteProduct(id){
    state.event = "delete";
    let index = searchIndex(id)
    state.products.splice(index,1);
    renderProducts()
}

//Amikor betöltődött az oldal, elindul a: renderProducts függvény
window.onload = renderProducts;