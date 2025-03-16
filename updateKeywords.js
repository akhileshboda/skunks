keyWordsElement = document.getElementById("keywords");

chome.storage.local.get(["keyWords"], (result) => {
    const {keyWords} = result;
    if(keyWords){
        console.log(keyWords);
        keyWordsElement.innerHTML = keyWords;
    }
});
