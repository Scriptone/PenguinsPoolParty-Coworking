("use strict");
(function () {
    let btnInfo = document.querySelector("#info");
    let overlay = document.querySelector("#info-overlay");

    btnInfo.addEventListener("click", function() {
        if(overlay.style.display = "none") {
            overlay.style.display = "block";
        }
        if(overlay.style.display != "none") {
            overlay.style.display = "block";
        }
    })

    overlay.addEventListener("click", function() {
        overlay.style.display = "none";
    })
})();
