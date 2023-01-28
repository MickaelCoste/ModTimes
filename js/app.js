window.addEventListener('load', function() {

    window.engine = new Engine("surface");
    window.animator = new TableAnimator(window.engine);

    let fixedForm = document.getElementById('table-fixed-form');
    fixedForm.addEventListener('submit', onTableFixedSubmit);

    let animatedForm = document.getElementById('table-animated-form');
    animatedForm.addEventListener('submit', onTableAnimatedSubmit);

    function onTableFixedSubmit(event)
    {
        let table = Number(document.getElementById('table-fixed-input').value);
        let modulo = Number(document.getElementById('table-fixed-modulo-input').value);

        window.engine.render(table, modulo);

        event.preventDefault();
    }

    function onTableAnimatedSubmit(event)
    {
        let tableStart = Number(document.getElementById('table-animated-start-input').value);
        let tableEnd = Number(document.getElementById('table-animated-end-input').value);
        let precision = Number(document.getElementById('table-animated-precision-input').value);
        let modulo = Number(document.getElementById('table-animated-modulo-input').value);

        window.animator.setAnimation(tableStart, tableEnd, 1 / precision, modulo, 60);
        window.animator.start();

        event.preventDefault();
    }

});