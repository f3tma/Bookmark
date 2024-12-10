var siteName=document.getElementById("bookmarkName")
var siteURL=document.getElementById("bookmarkURL")
var submeit=document.getElementById("submitBtn")
var deleteitem=document.getElementsByClassName("btn-delete ")
var model=document.querySelector("#model")
var closeElement=document.querySelector("#closeElement")
var visitBtns;
var arrSite=[];
if(localStorage.getItem("Sitelist")!=null){
    arrSite=JSON.parse(localStorage.getItem("Sitelist"))
    display()
}
function addSite(){
    if(isNameValid()==true&&isUrlValid()==true){
    //opj
var site={
    name:siteName.value,
    Url:siteURL.value
}


//push in array
arrSite.push(site)
localStorage.setItem("Sitelist" ,JSON.stringify(arrSite))
//display
display()
clearForm()
}}

function display(){
   var temp=``;
   for(var i=0 ; i<arrSite.length ;i++){
    temp+=` <tr>
     <td>`+i+`</td>
    <td>`+arrSite[i].name+`</td>              
    <td>
      <button class="btn btn-visit " data-index="`+i+`">
        <i class="fa-solid fa-eye pe-2"></i>Visited
      </button>
    </td>
    <td>
      <button onclick="deleteItem(`+ i +`)" class="btn btn-delete  pe-2"  >
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td> 
</tr>`
   } 
   document.getElementById("tableContent").innerHTML=temp
   visitBtns = document.querySelectorAll(".btn-visit");
   console.log(visitBtns)
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        console .log(e.target)
        visitWebsite(e);})}}
}


function deleteItem(x){
arrSite.splice( x , 1)

localStorage.setItem("Sitelist" ,JSON.stringify(arrSite))

display()
}
function clearForm() {
   siteName.value=null
 siteURL.value=null
}

submeit.addEventListener("click",function(){
        if (siteName.value=="" && siteURL.value == ""){
        model.classList.replace("d-none","d-flex")
    }else{
        addSite()
       
       
    }
})
closeElement.addEventListener("click",CloseModel)
function CloseModel(){
    model.classList.replace("d-flex","d-none")
}
model.addEventListener("click",function(e){
 
    if (e.target.getAttribute("id")=="model"){
        CloseModel()
    }
})

document.addEventListener("keyup",function(e){
 
if(e.key=="Escape"){
    CloseModel()
}
})
function isNameValid() {
    var reg =  /^[a-zA-Z ]{2,30}$/
    if(reg.test(siteName.value)== true){
    siteName.classList.add("is-valid")
    siteName.classList.remove("is-invalid")
    return true

}
    else
    siteName.classList.add("is-invalid")
    siteName.classList.remove("is-valid")
   
   return false;
}
siteName.addEventListener("change",isNameValid)
siteURL.addEventListener("change",isUrlValid)
function isUrlValid() {
    var reg = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(reg.test(siteURL.value)== true){
    siteURL.classList.add("is-valid")
    siteURL.classList.remove("is-invalid")
    return true

}
    else
    siteURL.classList.add("is-invalid")
    siteURL.classList.remove("is-valid")
   
   return false;
}
function visitWebsite(e) {
    console.log(e.target.dataset.index)
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);;
   
    if (httpsRegex.test(arrSite[websiteIndex].Url)) {
      open(arrSite[websiteIndex].Url);
      console.log(arrSite[websiteIndex].Url)
    } else {
      open(`https://${arrSite[websiteIndex].Url}`);
    }
  }