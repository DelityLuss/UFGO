const querystring = window.location.search;

const urlParams = new URLSearchParams(querystring);

const url = urlParams.get('url');

const link = document.getElementById("link");

link.value = url;

// const qrcode = document.getElementById("qrcode");

// qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;


function copy () {
    var copyText = document.getElementById("link");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    success("Copié !");
}