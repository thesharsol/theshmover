window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}
export default function mover() {
    this.selector = ".t_movable_box";
    this.element = this.get_element(this.selector);
    this.mouseposx = null;
    this.mouseposy = null;
    this.leftpos = 0;
    this.toppos = 0;
    this.distancex = 0;
    this.distancey = 0;
    this.wrapper = null
    this.init();

}
mover.prototype.createWrapper = function(){
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class','m_wrapper');
    this.wrapper.style.height = `${this.element.clientHeight}px`
    this.wrapper.style.width = `${this.element.clientWidth}px`
    this.wrapper.style.position='absolute';
    this.wrapper.style.border='3px solid blue'; 
    this.moveWrapper();
    document.querySelector('body').appendChild(this.wrapper);

}
mover.prototype.moveWrapper = function(){
    this.wrapper.style.left = `${this.element.offsetLeft-2}px`;
    this.wrapper.style.top = `${this.element.offsetTop-2}px`;
    console.log(this.element)
}
mover.prototype.destroyWrapper = function(){
    this.wrapper.remove();
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
            that.createWrapper()

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
        that.destroyWrapper()

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
        that.moveWrapper()

        }

    })

}

mover.prototype.set_element_pos = function () {
        this.leftpos = this.element.style.left==''?parseInt(this.element.offsetLeft):this.px_to_int(this.element.style.left);

        this.toppos = this.element.style.top==''?this.element.offsetTop:this.px_to_int(this.element.style.top);

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
