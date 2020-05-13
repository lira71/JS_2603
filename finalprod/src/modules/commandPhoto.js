const commandPhoto = () => {
    const command = document.querySelectorAll('#command .row img');
    let a;
    command.forEach(photo => {
        photo.addEventListener('mouseenter', (event) => {
            a = event.target.src;
            let target = event.target;
            target.src = target.getAttribute('data-img');
        });
        photo.addEventListener('mouseout', (event) => {
            let target = event.target;
            target.src = a;
        });
    });
};

export default commandPhoto;