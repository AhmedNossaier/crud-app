let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescInput = document.getElementById("productDescInput");

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click",function()
{
    if(addBtn.innerHTML == "add Product")
    {
        addProduct();
    }
    else
    {
      saveUpdate();  
    }
})

let productContainer ;
let currentIndex = 0  ;

if(localStorage.getItem("myProduct")==null)
{
    productContainer = [];
}
else
{
    productContainer = JSON.parse(localStorage.getItem("myProduct"));
    displayProduct();  
}

function addProduct()
{
    let product = 
    {
        name: productNameInput.value , 
        price: productPriceInput.value , 
        category:productCategoryInput.value,
        desc:productDescInput.value ,
    } ;

   productContainer.push(product);

   localStorage.setItem("myProduct", JSON.stringify(productContainer));
   displayProduct();
   clearForm();
   
   
}



function displayProduct()
{
    let Box = ""; 
    for(let i = 0 ; i < productContainer.length ; i++)
    {
        Box += `<tr>
                <td> `+i+` </td>
                 <td> `+productContainer[i].name+`</td>
                <td>`+productContainer[i].price+`</td>
                <td>`+productContainer[i].category+`</td>
                <td>`+productContainer[i].desc+`</td>
                <td><button onclick="updateProduct(`+i+`)" class="btn btn-warning"> Update </button > </td>
                <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger"> Delete </button > </td>
                </tr>` ;
    }

    document.getElementById("tableBody").innerHTML = Box ;

}


function clearForm()
{
    document.getElementById("inputform").reset();
}




function searchProducts(keyWord)
{
    let searchResult = ``;
    let searchResult2 = ``;
    for( let i = 0 ; i<productContainer.length;i++)
    {
       if(productContainer[i].name.includes(keyWord.trim()) == true)
       {
        searchResult = `<a href="###" class="d-block text-decoration-none">`+productContainer[i].name+`</a>`;
            searchResult2 += `<tr> <td> `+productContainer[i].name+`</td>
            <td>`+productContainer[i].price+`</td>
            <td>`+productContainer[i].category+`</td>
            <td>`+productContainer[i].desc+`</td></tr>` ;


       }

       
    }

    document.getElementById("result").innerHTML=searchResult;
    document.getElementById("tableBody").innerHTML=searchResult2;
}

function deleteProduct (index)
{
    productContainer.splice(index,1);
    localStorage.setItem("myProduct", JSON.stringify(productContainer));
   displayProduct();
}

function updateProduct(index)
{
    currentIndex = index ;
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;
    addBtn.innerHTML = "update";

   
}

function saveUpdate ()
{
    let product = 
    {
        name: productNameInput.value , 
        price: productPriceInput.value , 
        category:productCategoryInput.value,
        desc:productDescInput.value ,
    } ;

    productContainer[currentIndex] = product ; 
    localStorage.setItem("myProduct", JSON.stringify(productContainer));
    displayProduct();
    addBtn.innerHTML= "add Product";

}