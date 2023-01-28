class Engine
{

    /**
     * @constructor
     * @param {string} canvasId - The id of the canvas tag
     */
    constructor(canvasId)
    {
        // Also get the rendering context (see this.canvas setter)
        this.canvas = document.getElementById(canvasId);

        this.context.strokeStyle = "black";
        this.context.fillStyle = "black";
    }

    /**
     * Render a frame in the canvas.
     * @param {number} table  - The multiplication table to display
     * @param {number} modulo - The modulo of the representation circle
     */
    render(table, modulo)
    {
        this.clear();

        let grid = new CircleGrid(
            this.width / 2,
            this.height / 2,
            this.width < this.height ? this.width / 2 - 10 : this.height / 2 - 10,
            modulo
        );
        grid.render(this.context);

        for(let i = 0; i < modulo; i++) {
            let result = i * table,
                start = grid.getXYCoordinates(i),
                end = grid.getXYCoordinates(result);

            this.context.beginPath();

            this.context.moveTo(start.x, start.y);
            this.context.lineTo(end.x, end.y);

            this.context.stroke();
        }

        this.context.fillText("Table: " + table, 10, this.height - 20);
        this.context.fillText("Modulo: " + modulo, 10, this.height - 10);
    }

    /**
     * Clear the canvas of all previous renderings.
     */
    clear()
    {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fillStyle = "black";
    }

    /**
     * The canvas object.
     * @type {HTMLCanvasElement}
     */
    get canvas() { return this._canvas_; }
    set canvas(value)
    {
        if (!(value instanceof HTMLCanvasElement)) { throw new Error("Not a valid canvas!"); }
        this._canvas_ = value;

        this._context_ = this._canvas_.getContext('2d');
        if (!this._context_) { throw new Error("Cannot get 2D context from the canvas!"); }

        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight
    }

    /**
     * The rendering context.
     * @type {CanvasRenderingContext2D}
     * @readonly
     */
    get context() { return this._context_; }

    /**
     * The width of the rendering surface.
     * @type {number}
     */
    get width() { return this._width_; }
    set width(value)
    {
        if (!typeof(value) === 'number') { throw new Error(value + " is not a valid width!"); }
        this._width_ = this.canvas.width = value;
    }

    /**
     * The height of the rendering surface.
     * @type {number}
     */
    get height() { return this._height_; }
    set height(value)
    {
        if (!typeof(value) === 'number') { throw new Error(value + " is not a valid height!"); }
        this._height_ = this.canvas.height = value;
    }

    _canvas_ = null;
    _context_ = null;

    _width_ = null;
    _height = null;

}