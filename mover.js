window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}
function mover() {
    this.selector = ".movable";
    this.element = this.get_element(this.selector);
    this.mouseposx = null;
    this.mouseposy = null;
    this.leftpos = 0;
    this.toppos = 0;
    this.distancex = 0;
    this.distancey = 0;
    this.init();

}
mover.prototype.init = function () {
    // listeter from any mousedown on a body element 
    var that = this;
    // alert(that.distancex);
    document.addEventListener('mousedown', function (e) {
        

        // if the e target is one of the selectors 
        // alert(that.identify_element(e))
        if (that.identify_element(e) != -1) {
            that.element = e.target;
            if (that.element != e.target) {
                that.set_element_pos();
                that.set_distance(e)
            }
            console.log('element change')

            that.element.setAttribute('class', that.element.getAttribute('class') + ' tomove');

            that.set_mouse_pos(e);
            that.set_element_pos();
            that.set_distance(e)

            console.log('distance : ' + that.distancex + ',' + that.distancey)
            // alert(that.distancex)
        }
    })

    // that.element.addEventListener('mouseup', function () {
    //     that.element.setAttribute('class', that.getAttribute('class').split(' ')[0]);
    // })

    document.addEventListener('mouseup', function () {
        var moveSelected = document.querySelector('.tomove');
        if (moveSelected != null) {
            var tab =  moveSelected.getAttribute('class').split(' ');
            tab.pop();
            moveSelected.setAttribute('class',tab.join(' '));
        }

    })

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        that.element = document.querySelector('.tomove');
        // document.getElementById('coordonnes').value = x + ', ' + y;
        if (that.element != null) {
            that.element.style.position = 'absolute';
            that.element.style.left = (x - that.distancex) + 'px';
            that.element.style.top = (y - that.distancey) + 'px';
            that.element = document.getElementById(this.selector);
        }

    })

}

mover.prototype.set_element_pos = function () {
    if (this.element.style.left != '') {
        this.leftpos = this.px_to_int(this.element.style.left);
    }
    if (this.element.style.top != '') {
        this.toppos = this.px_to_int(this.element.style.top);
    }
    console.log('position : ' + this.leftpos + ',' + this.toppos)

}
mover.prototype.set_mouse_pos = function (e) {
    this.mouseposx = e.clientX;
    this.mouseposy = e.clientY;
}
mover.prototype.set_distance = function (e) {
    this.distancex = e.clientX - this.leftpos;
    this.distancey = e.clientY - this.toppos;

}
mover.prototype.px_to_int = function (px) {
    return parseInt(px.substr(0, px.length - 2));

}
mover.prototype.identify_element = function (e) {
    return Array.prototype.indexOf.call(document.querySelectorAll(this.selector), e.target);

}
mover.prototype.get_element = function(selector){
    return document.querySelector(selector);
}
mover.prototype.copy = function(obj){
    
    this.selector = obj.selector;
    this.element = obj.element;
    this.mouseposx = obj.mouseposx;
    this.mouseposy = obj.mouseposy;
    this.leftpos = obj.leftpos;
    this.toppos = obj.toppos;
    this.distancex = obj.distancex;
    this.distancey = obj.distancey;

    console.log('copy done');
}


var mover = new mover();
// alert(mover.length);

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }