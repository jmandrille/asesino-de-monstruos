new Vue ({
    el: '#app',
    data: {
        jugadorSalud: 100,
        monstruoSalud: 100,
        juegoIniciado: false,
        registroJugadas: []
    },
    methods: {
        // NOTA. Cuando finaliza la batalla (no cuando Jugador se rinde)
        // la barra de vida del derrotado queda con un valor negativo (si 
        // es que no se acepta una nueva pelea). La barra de vida queda con
        // algun ancho, evidentemente no un número negativo. Esto se podría
        // mejorar.
        comenzarJuego() {
            this.juegoIniciado = true;
            this.jugadorSalud = 100;
            this.monstruoSalud = 100;
            this.registroJugadas = [];
        },
        atacar() {
            const danio = this.calcularDanio(3, 10);
            this.monstruoSalud -= danio;
            this.registrarAtaque(true,danio,false);
            if (this.chequearVictoria()) {
                return;
            }
            this.monstruoAtacar();
        },
        ataqueEspecial() {
            const danio = this.calcularDanio(10, 20);  // Mejor ataque, causa casi seguro mas daño sobre el covid-19
            this.monstruoSalud -= danio;
            this.registrarAtaque(true,danio,true);
            if (this.chequearVictoria()) {
                return;
            }
            this.monstruoAtacar();
           },
        curar() {
            if (this.jugadorSalud <= 90) {
                this.jugadorSalud += 10;
            } else {
                this.jugadorSalud = 100;
            }
            this.registrarCura();
            // En el asesino-de-mounstruos.pdf dice que cuando el jugador 
            // se cura el mounstruo (acá el famoso covid-19) reduce su barra de energía entre 5 y 12
            // Así siempre pierde el mounstruo. Se opta por establecer como
            // parte de la lógica que cuando el jugador se cura el mounstro
            // realiza un ataque
            this.monstruoAtacar();  
        },
        rendirse() {
            this.juegoIniciado = false
            // Cuando Jugador se rinde queda en pantalla el historial
            // de la batalla salvo que se comience otro juego
        },
        monstruoAtacar() {
            const danio = this.calcularDanio(5, 12);
            this.jugadorSalud -= danio;
            this.registrarAtaque(false,danio,false);
            if (this.chequearVictoria()) {
                return;
            }
        },
        calcularDanio(min, max) {
            // Genero un número aleatorio entre 0 y max
            // Dsp selecciono el máximo entre ese aleatorio generado y min
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },
        chequearVictoria(){
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
        },
        registrarAtaque(jugador,danio,esEspecial){
            if(jugador){
                atacante = 'Jugador'
                atacado = 'Covid-19'
            } else {
                atacante = 'Covid-19'
                atacado = 'Jugador'
            }
            this.registroJugadas.unshift(
                {
                    esJugador: jugador,
                    mensaje: `${atacante} golpea ${esEspecial ? 'FUERTE' : ''} y le quita ${danio} puntos de vida a ${atacado} ` 
                }
            )
        },  // registrarAtaque
        registrarCura(){
            this.registroJugadas.unshift(
                {
                    esJugador: true,
                    mensaje: 'Jugador recupera 10' 
                }
            )
        },  // registrarCura
    },  // methods  
})  // instancia Vue