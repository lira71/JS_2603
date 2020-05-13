const togglePopup = function () {
    const popup = document.querySelector(".popup"),
        popupBtn = document.querySelectorAll(".popup-btn"),
        popupClose = document.querySelector(".popup-close");

    popupBtn.forEach(((item) => {
        item.addEventListener('click', (function () {
            let requestAmimate, count = 0;
            if (screen.width < 768) {
                popup.style.display = 'block';
            } else {
                const animatePopup = () => {
                    requestAmimate = requestAnimationFrame(animatePopup);
                    count++;
                    if (count < 11) {
                        popup.style.display = 'block', popup.style.opacity = 10 * count + '%'
                    } else {
                        cancelAnimationFrame(animatePopup);
                    }
                }
                requestAnimationFrame(animatePopup);
            }
        }))
    }));

    popup.addEventListener("click", (function (requestAmimate) {
        let popupClickOutside = requestAmimate.target;
        popupClickOutside = popupClickOutside.closest(".popup-content");
        popup.style.display = popupClickOutside ? "block" : "none";
    }));

    popupClose.addEventListener("click", (function () {
        let requestAmimate, count = 10;
        requestAmimate = requestAnimationFrame((function animatePopup() {
            requestAmimate = requestAnimationFrame(animatePopup);
            count--;
            if (screen.width < 768) {
                cancelAnimationFrame(requestAmimate);
                popup.style.display = "none";
            } else {
                count > 0 && (popup.style.opacity = 10 * count + "%", 1 === count && (popup.style.display = "none"))
            }
        }))
    }))
};

export default togglePopup;