let i = document.querySelector(".top")
window.onscroll = function() {
   if(window.pageYOffset === 0) {
        i.style.opacity="0"
   }  else {
    i.style.opacity="1"
   }
}
i.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
// end scroll to Top function
let nav = document.querySelector("nav")
nav.onmouseover = function() {
   this.classList.add("open")
}
nav.onmouseout = function() {
    this.classList.remove("open")
 }
//  end navbar function
let status = "false";
let statusOpened = document.getElementById("opened")
let statusClosed = document.getElementById("closed")
let subject = document.getElementById("subject")
let number = document.getElementById("number")
let name = document.getElementById("name")
let add = document.getElementById("add")
let allInputs =document.querySelectorAll("input")
let inputTypeText = document.querySelectorAll("input[type='text']")
let TR = ""
let index
let testInputs = /^\s{1,}/
let nameValidate = true
let subjectValidate = true
let numberValidate = true
let statusValidate = true
function validateInputs() {
   if (number.value=="") numberValidate=false
   else  numberValidate=true
   if (name.value=="" || testInputs.test(name.value)) nameValidate=false
   else nameValidate=true
   if (subject.value=="" || testInputs.test(subject.value)) subjectValidate=false
   else  subjectValidate=true
   if (status.value=="" || testInputs.test(status.value)) statusValidate=false
   else statusValidate=true
   if (nameValidate == true && numberValidate == true && subjectValidate == true && statusValidate == true) return true
   else return  false
}
statusClosed.click()
// start fetch data from localStorage
if(localStorage.getItem("dataContainer") !== null) {
   dataContainer = JSON.parse(localStorage.getItem("dataContainer"))
   showData()
} else {
   dataContainer = [
      {name:"one",subject:"lorem",number:20,status:"true"},
      {name:"two",subject:"lorem",number:70,status:"false"},
      {name:"three",subject:"lorem",number:280,status:"false"},
      {name:"four",subject:"lorem",number:60,status:"true"},
      {name:"five",subject:"lorem",number:90,status:"false"},
      {name:"six",subject:"lorem",number:40,status:"true"},
      {name:"seven",subject:"lorem",number:620,status:"true"},
      {name:"eight",subject:"lorem",number:620,status:"false"},
      {name:"nine",subject:"lorem",number:880,status:"true"},
      {name:"ten",subject:"lorem",number:360,status:"false"},
   ]
   showData()
}
// end fetch data from localStorage
//start check which radio button user click
statusOpened.onclick = function() {
   status = "true"
}
statusClosed.onclick = function() {
   status = "false"
}
//start check which radio button user click
// start add row to the table function
add.onclick = function() {
  if (validateInputs()) {
     console.log(nameValidate)
     console.log(subjectValidate)
     console.log(numberValidate)
     console.log(statusValidate)
   if(add.innerHTML == "Add Item") {
      creatData()
      showData()
      clearForm()
     
      localStorage.setItem("dataContainer",JSON.stringify(dataContainer))
      document.querySelectorAll("tbody tr")[0].style.background ="#cac3c3"
     setTimeout(() => {
        document.querySelectorAll("tbody tr")[0].style.background ="transparent"
     },1000) 
   } else {
      dataContainer[index].name=name.value
      dataContainer[index].subject=subject.value
      dataContainer[index].number=number.value
      dataContainer[index].status=status
      showData()
      localStorage.setItem("dataContainer",JSON.stringify(dataContainer))
      document.querySelectorAll("input").forEach(item => {
         item.style.borderColor="#b2bec3"
      })
      add.innerHTML = "Add Item"
      clearForm()
   }
     document.querySelector(".error").style.display="none"
  } else {
   document.querySelector(".error").style.display="block"
  }

}
// end add row to the table function
// start create data which user enter them
function creatData() {
   let tableRow = {
      subject:subject.value,
      number:number.value,
      name:name.value,
      status:status
}
dataContainer.push(tableRow)
}
// end create data which user enter them
// start show data in the table
function showData() {
   TR=""
   for (let i = dataContainer.length - 1;i>=0;i--) {
      TR += `
      <tr>
         <td>${dataContainer[i].number}</td>
         <td>${dataContainer[i].subject}</td>
         <td>${dataContainer[i].status}</td>
         <td>${dataContainer[i].name}</td>
         <td><button onclick='deleteRow(${i})'>Delete</button></td>
         <td><button onclick='UpdateRow(${i})'>Update</button></td>
       </tr>
      `
   }
 document.querySelector("tbody").innerHTML = TR
}
// end show data in the table
// start delete row from the table
function deleteRow(i) {
   dataContainer.splice(i,1);
   showData()
   localStorage.setItem("dataContainer",JSON.stringify(dataContainer))
}
// end delete row from the table
// start update row from the table
function UpdateRow(i) {
     subject.value=dataContainer[i].subject
     number.value=dataContainer[i].number
     name.value=dataContainer[i].name
     if (dataContainer[i].status=="true") statusOpened.click()
     else statusClosed.click()
     add.innerHTML ="Update"
     index=i
     allInputs.forEach(item => {
      item.style.borderColor="tomato"
   })

}
// end delete row from the table
// start clear the form after write all data
function clearForm() {
   allInputs.forEach(item => {
      item.value="" 
   })
}
// end clear the form after write all data