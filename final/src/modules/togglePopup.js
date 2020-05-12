   const togglePopup = function () {
       let popup = document.querySelector(".popup"),
           popupBtn = document.querySelectorAll(".popup-btn"),
           popupClose = document.querySelector(".popup-close");

       popupBtn.forEach((function (requestAmimate) {
           requestAmimate.addEventListener("click", (function () {
               let requestAmimate, count = 0;
               popupOpacity = requestAnimationFrame((function animatePopup() {
                   requestAmimate = requestAnimationFrame(animatePopup);
                   count++;
                   if (screen.width < 768) {
                       cancelAnimationFrame(popupOpacity);
                       popup.style.display = "block";
                   } else {
                       count < 11 && (
                           popup.style.display = "block", popup.style.opacity = 10 * count + "%")
                   }
               }))
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