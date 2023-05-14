const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
    infoText.innerText = "Connexion en cours...";
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Cliquez ici pour scanner l'image de votre code wifi reçu depuis votre téléphone" : "Impossible de scanner le code QR";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
        window.location.href=result;
    }).catch(() => {
        infoText.innerText = "Impossible de scanner le code QR";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

/*
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").innerText;
    window.location.href= infoText.innerText.result;
});
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));*/
