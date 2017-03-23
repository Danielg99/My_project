let submitB = $("#submit");
let newPatientDiv = $("#newPatientFormDiv");

submitB.click(function(e){
  e.preventDefault();
  let name = $("#name").val();
  let last = $("#last").val();
  let input3 = $("#input3").val();
  let input4 = $("#input4").val();
  let input5 = $("#input5").val();
  let input6 = $("#input6").val();
  $("#allPatientsDiv").append(columnHTML(name, last, input3, input4, input5, input6));
});

$(".patient").click(function(){
  alert();
});

function columnHTML(name, last, input3, input4, input5, input6) {
  return `<div class="patient"><span class="name">${name}</span><span>${last}</span><span>${input3}</span><span>${input4}</span><span>${input5}</span><span>${input6}</span></div></a>`
}

$("#newPatient").click(function(e){
  e.preventDefault();
  newPatientDiv.show();
})

$("#closeNewPatientWindow").click(function(e){
  e.preventDefault();
  newPatientDiv.hide();
});
