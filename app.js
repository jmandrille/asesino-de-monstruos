new Vue ({
    el: '#app',
    data: {
        jugadorSalud: 100,
        monstruoSalud: 100,
        juegoIniciado: false,
    },
    methods: {
        comenzarJuego: function() {
            this.juegoIniciado = true;
            this.jugadorSalud = 100;
            this.monstruoSalud = 100;
        },

        atacar: function () {
            var dañomax = 10;
            var dañomin = 3;
            var daño = Math.floor(Math.random() * dañomax) + dañomin;
            this.monstruoSalud -= daño;
      
        },

        ataqueespecial: function () {
            var dañomax = 15;
            var dañomin = 5;
            var daño = Math.floor(Math.random() * dañomax) + dañomin;
            this.monstruoSalud -= daño;
           },

        curar: function () {
            this.jugadorSalud += 15;

            
        },
        
        rendirse: function () {
            this.juegoIniciado = false
          }
    },
         
})