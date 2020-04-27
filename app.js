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
            var dano = this.calcularDano(3, 10);
            this.monstruoSalud -= dano;
            
            if (this.chequearVictoria()) {
                return;
            }

            this.monstruoAtaca();
      
        },

        ataqueespecial: function () {
            var dano = this.calcularDano(5, 12);
            this.monstruoSalud -= dano;
            
            if (this.chequearVictoria()) {
                return;
            }

            this.monstruoAtaca();
           },

        curar: function () {
            if (this.jugadorSalud <= 85) {
                this.jugadorSalud += 15;
            } else {
                this.jugadorSalud = 100;
            }
            this.monstruoAtaca();
            
        },
        
        rendirse: function () {
            this.juegoIniciado = false
        },
        monstruoAtaca: function () {
            var dano = this.calcularDano(5, 12);
            this.jugadorSalud -= dano;
            if (this.chequearVictoria()) {
                return;
            }
        },
        calcularDano: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },
        
        chequearVictoria: function() {
            if (this.monstruoSalud <= 0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.comenzarJuego();
                } else {
                    this.juegoIniciado = false;
                }
                return true;
            } else if (this.jugadorSalud <= 0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.comenzarJuego();
                } else {
                    this.juegoIniciado = false;
                }
                return true;
            }
            return false;
        }
        


        
    },

         
})