const body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

};

DomElement.prototype.render = function(){
    let newElem;
    if(this.selector[0] === '.'){
        newElem = document.createElement('div');
        newElem.classList.add('block');
    } else if(this.selector[0] === '#'){
        newElem = document.createElement('p');
        newElem.classList.add('best');
    };

    newElem.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        fontSize: ${this.fontSize}px;
    `;

    newElem.textContent = '12345';
    body.append(newElem);


};

let randomObject = new DomElement('.id', 100, 100, 'green', 50);
randomObject.render();
let randomObject1 = new DomElement('#id', 200, 200, 'blue', 50);
randomObject1.render();