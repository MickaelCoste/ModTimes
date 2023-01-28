/** Class representing a circle grid. */
class CircleGrid
{

    /**
     * Create a circle grid.
     * @param {number} x      - The x coordinate of the center of the circle
     * @param {number} y      - The y coordinate of the center of the circle
     * @param {number} r      - The radius of the circle
     * @param {number} modulo - The modulo of the grid
     */
    constructor(x, y, r, modulo)
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
        if (typeof(value) !== 'number') { throw new Error(value + " is not a valid x coordinate!"); }
        this._x_ = value;
    }

    /**
     * The y coordinate in pixels of the center of the grid.
     * @type {number}
     */
    get y() { return this._y_; }
    set y(value)
    {
        if (typeof(value) !== 'number') { throw new Error(value + " is not a valid y coordinate!"); }
        this._y_ = value;
    }

    /** 
     * The radius in pixels of the circle.
     * @type {number}
     */
    get r() { return this._r_; }
    set r(value)
    {
        if (typeof(value) !== 'number') { throw new Error(value + " is not a valid radius!"); }
        this._r_ = value;
    }

    /**
     * The modulo of the grid. Must be an integer.
     * @type {numnber}
     */
    get modulo() { return this._modulo_; }
    set modulo(value)
    {
        if (typeof(value) !== 'number' || !Number.isInteger(value)) { throw new Error(value + " is not a valid modulo!"); }
        this._modulo_ = value;
        this._angularSector_ = 2 * Math.PI / this.modulo;
    }

    /**
     * The angle in radian between two consecutive points and the center of the grid.
     * @type {number}
     */
    get angularSector() { return this._angularSector_; }

    _x_= null;
    _y_ = null;
    _r_ = null;
    _modulo_ = null;
    _angularSector_ = null;

}