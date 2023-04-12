erreurp = document.getElementById("erreur");
successp = document.getElementById("success");

function erreur(status) {

    erreurp.innerHTML = `<i class='bx bxs-error-circle' ></i> ${status} `;
    erreurp.classList.remove("none");

    setTimeout(() => {
        erreurp.classList.add("none");
    }, 3000);
}

function success(status) {
    successp.innerHTML = `<i class='bx bxs-check-circle' ></i> ${status} `;
    successp.classList.remove("none");

    setTimeout(() => {
        successp.classList.add("none");
    }, 3000);
}







function upload() {

    const button = document.getElementById("up");
    button.innerHTML = `<i class='bx bx-loader bx-spin' ></i> Chargement...`;
    button.disabled = true;

    var file = document.getElementById("file").files[0];
    if (!file) {
        erreur("Veuillez choisir un fichier");
        button.innerHTML = `<i class='bx bx-upload' ></i> Upload`;
        button.disabled = false;
        return;
    }

    const formData = new FormData()
    formData.append('file', file)

    console.log("Get server")
    fetch('https://api.gofile.io/getServer')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                console.log(data.data.server)
                server = data.data.server
                console.log("Server: " + server)
                console.log("Upload file")
                fetch(`https://${server}.gofile.io/uploadFile`, {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            console.log('Success:', data);
                            window.location.href = "upload.html?url=" + data.data.downloadPage;
                            const link = document.getElementById("link");

                            console.log(link)

                        }
                        console.log(data)
                    })
                    .catch(error => console.error(error))
            }
            return false
        })
        .catch(error => console.error(error))

}

