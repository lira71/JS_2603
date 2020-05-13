const smoothScroll = () => {
    const menuList = document.querySelectorAll('li>a[href*="#"]');
    const arrow = document.querySelector("a>img");

    menuList.forEach((eachElements) => {
        eachElements.addEventListener("click", (event) => {
            event.preventDefault();
            const gotId = eachElements.getAttribute("href");
            document.querySelector("" + gotId).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    arrow.addEventListener("click", () => {
        event.preventDefault();
        arrow.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
};

export default smoothScroll;