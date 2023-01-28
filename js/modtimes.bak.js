class Engine
{

    constructor(canvasId)
    {
        this.canvas = document.getElementById(canvasId);

        this.context.strokeStyle = "black";
        this.context.fillStyle = "black";

        this.calibrate();

        window.addEventListener('resize', this.calibrate.bind(this));
    }

    calibrate()
    {
        this.width = this.canvas.width = this.canvas.clientWidth;
        this.height = this.canvas.height = this.canvas.clientHeight;

        if(this.grid) this.grid.calibrate(
            this.width / 2,
            this.height / 2,
            this.width < this.height ? this.width / 2 - 10 : this.height / 2 - 10,
            modulo
        );

        this.clear();

        if(this.isRendering) { this.render(); }
    }

    /**
     * Clear the surface.
     */
    clear()
    {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
    }

    render()
    {
        this.clear();

        this.grid.render(this.context);

        for(let i = 0; i < this.grid.modulo; i++) {
            let result = i * this.table,
                start = this.grid.getXYCoordinates(i),
                end = this.grid.getXYCoordinates(result);

            this.context.beginPath();

            this.context.moveTo(start.x, start.y);
            this.context.lineTo(end.x, end.y);

            this.context.stroke();
        }

        this.context.fillText("Table: " + this.table, 10, this.height - 40);
        this.context.fillText("Modulo: " + this.grid.modulo, 10, this.height - 30);

        this._isRendering_ = true;
    }

    /**
     * Set the informations required for the rendering.
     * @param {number} table  - The multiplication table to render
     * @param {number} modulo - the modulo of the rendering circle grid
     */
    setInformations(table, modulo)
    {
        this.table = table;
        if(this.grid !== null) {
            this.grid.modulo = modulo;
        } else {
            this.grid = new CircleGrid(
                this.width / 2,
                this.height / 2,
                this.width < this.height ? this.width / 2 - 10 : this.height / 2 - 10,
                modulo
            );
        }
    }

    get canvas() { return this._canvas_; }
    set canvas(value)
    {
        if(!(value instanceof HTMLCanvasElement)) { throw new Error("Not a valid canvas!"); }
        this._canvas_ = value;

        this._context_ = this._canvas_.getContext('2d');
        if(!this._context_) { throw new Error("Cannot get 2D context from the canvas!"); }
    }

    get context() { return this._context_; }

    get width() { return this._width_; }
    set width(value)
    {
        if(!typeof(value) === 'number') { throw new Error(value + " is not a valid width!"); }
        this._width_ = value;
    }

    get height() { return this._height_; }
    set height(value)
    {
        if(!typeof(value) === 'number') { throw new Error(value + " is not a valid height"); }
        this._height_ = value;
    }

    get grid() { return this._grid_; }
    set grid(value)
    {
        if(!(value instanceof CircleGrid)) { throw new Error("Invalid grid object!"); }
        this._grid_ = value;
    }

    get table() { return this._table_; }
    set table(value)
    {
        if(!typeof(value) === 'number') { throw new Error(value + " is not a valid table!"); }
        this._table_ = value;
    }

    get isRendering() { return this._isRendering_; }

    _canvas_ = null;
    _context_ = null;

    _width_ = null;
    _height_ = null;

    _grid_ = null;

    _table_ = null;

    _isRendering_ = false;

}

/** Class representing a circle grid. */
class CircleGrid
{

    /**
     * Create a circle grid
     * @param {number} x      - The x coordinate of the center of the circle
     * @param {number} y      - The y coordinate of the center of the circle
     * @param {number} r      - The radius of the circle
     * @param {number} modulo - The modulo of the grid
     */
    constructor(x, y, r, modulo)
    {
        this.calibrate(x, y, r, modulo);
    }

    calibrate(x, y, r, modulo)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.modulo = modulo;
    }

    /**
     * Render the circle grid.
     * @param {CanvasRenderingContext2D} context - The rendering context
     */
    render(context)
    {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        context.stroke();
    }

    /**
     * Calculate the coordinates in pixels of a point in of the circle grid.
     * @param {number} coordinate - The coordinate in the circle grid 
     * @returns {object}
     */
    getXYCoordinates(coordinate)
    {
        let angle = (coordinate % this.modulo) * this.angularSector - Math.PI / 2;
        let x = Math.cos(angle) * this.r + this.x,
            y = Math.sin(angle) * this.r + this.y;

        return {x: x, y: y};
    }

    /**
     * The x coordinate in pixels of the center of the grid.
     * @type {number}
     */
    get x() { return this._x_; }
    set x(value)
    {
        if(typeof(value) !== 'number') { throw new Error(value + " is not a valid x coordinate!"); }
        this._x_ = value;
    }

    /**
     * The y coordinate in pixels of the center of the grid.
     * @type {number}
     */
    get y() { return this._y_; }
    set y(value)
    {
        if(typeof(value) !== 'number') { throw new Error(value + " is not a valid y coordinate!"); }
        this._y_ = value;
    }

    /** 
     * The radius in pixels of the circle.
     * @type {number}
     */
    get r() { return this._r_; }
    set r(value)
    {
        if(typeof(value) !== 'number') { throw new Error(value + " is not a valid radius!"); }
        this._r_ = value;
    }

    /**
     * The modulo of the grid. Must be an integer.
     * @type {numnber}
     */
    get modulo() { return this._modulo_; }
    set modulo(value)
    {
        if(typeof(value) !== 'number' || !Number.isInteger(value)) { throw new Error(value + " is not a valid modulo!"); }
        this._modulo_ = value;
        this._angularSector_ = 2 * Math.PI / this.modulo;
    }

    get angularSector() { return this._angularSector_; }

    _x_= null;
    _y_ = null;
    _r_ = null;
    _modulo_ = null;
    _angularSector_ = null;

}

class Animator
{

    /**
     * @constructor
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        this.engine = engine;
    }

    animateTable(tableStart, tableEnd, step, modulo, speed)
    {
        let engine = this.engine;
        let tableCurrent = tableStart;

        let interval = setInterval(frame, 1000 / speed);

        function frame() {
            engine.setInformations(tableCurrent, modulo);
            engine.render();

            tableCurrent += step;
            if(tableCurrent > tableEnd) { clearInterval(interval); }
        }
    }

    get engine() { return this._engine_; }
    set engine(value)
    {
        if(!(value instanceof Engine)) { throw new Error("Invalid engine object!"); }
        this._engine_ = value;
    }

    _engine_ = null;

}