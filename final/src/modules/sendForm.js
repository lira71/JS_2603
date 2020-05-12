    const sendForm = () => {
        const input = document.querySelectorAll("input");

        const errorMessage = "Something went wrong...",
            successMessage = "Message successfully sent!",
            loadMessage = "Loading...";

        const forms = document.querySelectorAll("form");

        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status-message");
        statusMessage.style.cssText = `font: normal 2rem Roboto; color: white;`;

        forms.forEach((form) => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);

                const preloader = () => {
                    return `
            <div class="preloader">
              <img src="images/745 (1).svg"></img>
            </div>
          `;
                };
                statusMessage.innerHTML = preloader();

                const formData = new FormData(form);
                const body = {};
                formData.forEach((value, key) => (body[key] = value));

                const outputData = () => {
                        statusMessage.textContent = successMessage;

                        input.forEach((input) => (input.value = ""));
                    },
                    error = (error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    };

                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error("status newtwork not 200");
                        }
                        console.log(response);
                        statusMessage.textContent = successMessage;
                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            });

            form.addEventListener("input", (event) => {
                const target = event.target,
                    sendButton = document.querySelector(".btn");

                const addStyles = () => {
                    target.style.cssText = `border: 1px solid red`;
                    form.appendChild(statusMessage);
                    statusMessage.textContent =
                        "You have entered an insufficient number of digits, must be from 8 up to 12 numbers";
                    statusMessage.style.cssText = `color: #E25741;`;
                };

                const resetStyles = () => {
                    statusMessage.remove();
                    sendButton.disabled = false;
                    target.style.cssText = `border: auto;`;
                    statusMessage.style.cssText = `color: #FFFFFF;`;
                };

                if (target.name === "user_name") {
                    target.value = target.value.replace(/[^а-яА-ЯёЁ]/gi, "");
                }

                if (target.name === "user_email") {
                    target.value = target.value.replace(/[а-яА-ЯЁё?!,%&~'}[{:*(/><)^#$+="№;\s]/, '');
                }

                if (target.name === "user_phone") {

                    if (target.value.length <= 8) {
                        sendButton.disabled = true;
                        addStyles();
                    }
                    if (target.value.length > 8) {
                        resetStyles();
                    }

                    if (!/^\+?(\d){0,18}$/g.test(target.value)) {
                        target.value = target.value.substring(0, target.value.length - 1);
                    }

                    if (target.value === "") {
                        resetStyles();
                    }
                }

                if (target.name === "user_message") {
                    target.value = target.value.replace(/[^а-яА-ЯёЁ!?\s]/gi, "");
                }
            });
        });

        const postData = (body) => {
            return fetch("./server.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(body),
            });
        };
};
    
export default sendForm;