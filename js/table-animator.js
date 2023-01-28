/**
 * Create and handle an animation.
 * @class
 */
class TableAnimator
{

    /**
     * @constructor
     * @param {Engine} engine - The rendering engine
     */
    constructor(engine)
    {
        this.engine = engine;
    }

    /**
     * Define the animation to render
     * @param {number} tableStart - The begining table
     * @param {number} tableEnd   - The ending table
     * @param {number} step       - The table increase between each frame
     * @param {number} modulo     - The modulo of the grid
     * @param {number} speed      - The number od frames per seconds
     * @returns {TableAnimator}
     */
    setAnimation(tableStart, tableEnd, step, modulo, speed)
    {
        this.stop();

        this._animation_.start = tableStart;
        this._animation_.end = tableEnd;
        this._animation_.step = step;
        this._animation_.modulo = modulo;
        this._animation_.speed = speed;

        return this;
    }

    start()
    {
        if (
            typeof(this._animation_.start) !== 'number' ||
            typeof(this._animation_.end) !== 'number' ||
            typeof(this._animation_.step) !== 'number' ||
            typeof(this._animation_.modulo) !== 'number' ||
            typeof(this._animation_.speed) !== 'number'
        ) {
            throw new Error("Invalid animation paramaters!");
        }

        if(this._animation_.current === null) { this._animation_.current = this._animation_.start; }

        this._animation_.id = setInterval(frame.bind(this), 1000 / this._animation_.speed);

        function frame() {
            this._engine_.render(this._animation_.current, this._animation_.modulo);

            this._animation_.current += this._animation_.step;
            if(this._animation_.current > this._animation_.end) { this.stop(); }
        }
    }

    pause()
    {
        clearInterval(this._animation_.id);
        this._animation_.id = null;
    }

    stop()
    {
        this.pause();
        this._animation_.current = null;
    }

    get engine() { return this._engine_; }
    set engine(value)
    {
        if (!(value instanceof Engine)) { throw new Error("Invalid engine object!"); }
        this._engine_ = value;
    }

    _engine_ = null;

    _animation_ = {
        id: null,
        start: null,
        current: null,
        end: null,
        step: null,
        modulo: null,
        speed: null
    };

}