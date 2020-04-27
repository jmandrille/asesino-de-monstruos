new Vue ({
    el: '#app',
    data: {
        jugadorSalud: 100,
        monstruoSalud: 100,
        juegoIniciado: false,
    },
    methods: {
        comenzarJuego: function() {
            this.comenzarJuego = true;
            this.jugadorSalud = 100;
            this.monstruoSalud = 100;
        }
    }
})