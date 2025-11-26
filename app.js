class AuthApp {
    constructor() {
        // 1. Configuração do Firebase
        const firebaseConfig = {
            // Suas credenciais CORRETAS
            apiKey: "AIzaSyBmWyuu8psIwguWgiCFZzFr9wdwsf4L6Q8",
            authDomain: "login-poo-2af7f.firebaseapp.com",
            projectId: "login-poo-2af7f",
            storageBucket: "login-poo-2af7f.firebasestorage.app",
            messagingSenderId: "872605727899",
            appId: "1:872605727899:web:f810515e757d0db2f25a3e",
            measurementId: "G-NE0B1LL6LY"
        };
        
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();

        // 2. Referências do DOM
        this.cadastroScreen = document.getElementById('cadastro-screen');
        this.loginScreen = document.getElementById('login-screen');
        this.dashboardScreen = document.getElementById('dashboard-screen');
        this.cadastroForm = document.getElementById('cadastro-form');
        this.loginForm = document.getElementById('login-form');
        this.btnLogout = document.getElementById('btn-logout');
        this.userEmailDisplay = document.getElementById('user-email-display');
        
        // 3. Inicializa os Event Listeners
        this.initListeners();
        
        // 4. Inicia o Observador de Estado
        this.observeAuthState();
    }

    // Método para alternar as telas
    switchScreen(screenToShow) {
        [this.cadastroScreen, this.loginScreen, this.dashboardScreen].forEach(screen => {
            screen.classList.remove('active-screen');
            screen.classList.add('hidden-screen');
        });
        screenToShow.classList.remove('hidden-screen');
        screenToShow.classList.add('active-screen');
    }

    // Lógica de Cadastro (POO)
    handleCadastro(e) {
        e.preventDefault();
        const email = document.getElementById('cadastro-email').value;
        const senha = document.getElementById('cadastro-senha').value;

        this.auth.createUserWithEmailAndPassword(email, senha)
            .then(() => {
                alert('Conta criada com sucesso! Faça login.');
                this.switchScreen(this.loginScreen);
                this.cadastroForm.reset();
            })
            .catch((error) => {
                alert(`Erro ao cadastrar: ${error.message}`);
            });
    }

    // Lógica de Login (POO) COM MENSAGEM DE SUCESSO 🚀
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        this.auth.signInWithEmailAndPassword(email, senha)
            .then(() => {
                // 🚀 FEEDBACK DE SUCESSO ANTES DO REDIRECIONAMENTO
                alert('Login efetuado com sucesso! Bem-vindo ao Dashboard.'); 
                this.loginForm.reset(); 
                // O observador (onAuthStateChanged) será acionado logo após este .then()
            })
            .catch((error) => {
                alert(`Erro ao fazer login: ${error.message}`);
            });
    }

    // Lógica de Logout (POO)
    handleLogout() {
        this.auth.signOut()
            .catch((error) => {
                alert(`Erro ao sair: ${error.message}`);
            });
    }

    // Observador de Estado (POO)
    observeAuthState() {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.userEmailDisplay.textContent = user.email;
                this.switchScreen(this.dashboardScreen);
            } else {
                this.switchScreen(this.loginScreen); 
            }
        });
    }

    // Inicializa todos os Event Listeners
    initListeners() {
        this.cadastroForm.addEventListener('submit', this.handleCadastro.bind(this));
        this.loginForm.addEventListener('submit', this.handleLogin.bind(this));
        this.btnLogout.addEventListener('click', this.handleLogout.bind(this));

        document.getElementById('link-ir-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchScreen(this.loginScreen);
        });
        document.getElementById('link-ir-cadastro').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchScreen(this.cadastroScreen);
        });
    }
}

// Inicia a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new AuthApp();

});

