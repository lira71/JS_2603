    const calculateNumber = () => {
        document.querySelectorAll('[type="number"]').forEach(((event) => {
            event.addEventListener("input", (function () {
                event.value = event.value.replace(/\D/, "")
            }))
        }))
};
export default calculateNumber;