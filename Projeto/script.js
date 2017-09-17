valor = 0;
            tamMax = document.querySelectorAll('.grafico').length * -100;
            console.log(tamMax);

            function next() {
                console.log(valor)
                if(valor > tamMax + 100){
                    valor = valor - 100;
                    document.getElementById('slide').style = 'display: flex;' +
                                                                 'transform: translateX('+valor+'%);' +
                                                                 'transition: All 480ms ease-in';
                }
                }
            function prev() {
                if(valor < 0) {
                    valor = valor + 100;
                    document.getElementById('slide').style = 'display: flex;' +
                                                                 'transform: translateX('+valor+'%);' +
                                                                 'transition: All 480ms ease-in';
                }
            }


    function goTo(el, speed) {
            var href = el.attr('href');

            var top = $(href).offset().top;

            $("html, body").animate({scrollTop : top}, speed);
    }

    $(function() {
            $("nav a").click(function(e) {
                e.preventDefault();

                goTo($(this), 500)
            })
        })