let toggle = document.getElementById("toggle");

function changeDisplay(isChecked){
    let searchDiv = document.getElementById("searchDiv");
    //console.log(searchDiv.innerHTML);
    console.log(searchDiv.style.display);
    if(isChecked){
        searchDiv.style.display = "block";
    }
    else {
        searchDiv.style.display = "none";
    }
}

toggle.addEventListener("change", function(){
    console.log(toggle.checked);
    chrome.storage.local.set({"isChecked": toggle.checked});
    changeDisplay(toggle.checked);
});

chrome.storage.local.get("isChecked", function(result){
    if (result){
        isChecked = result.isChecked;
        toggle.checked = isChecked;
        changeDisplay(isChecked);
    }
})

//console.log(searchDiv.innerHTML);
