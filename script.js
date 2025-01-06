class AeosGame {
  constructor(config) {
      this.config = config;
      this.currentScreen = 'invitation';
      this.init();
  }

  init() {
      this.renderScreen(this.currentScreen);
      this.startEventListeners();
  }

  renderScreen(screen) {
      const app = document.getElementById('app');
      app.innerHTML = '';

      switch(screen) {
          case 'invitation':
              app.innerHTML = this.getInvitationHTML();
              break;
          case 'terms':
              app.innerHTML = this.getTermsHTML();
              break;
          case 'countdown':
              app.innerHTML = this.getCountdownHTML();
              this.startCountdown();
              break;
      }
  }

  getInvitationHTML() {
      return `
          <div class="screen">
              <div class="card">
                  <div class="card-inner">
                      <div class="symbols-container">
                          <div class="symbol circle"></div>
                          <div class="symbol triangle"></div>
                          <div class="symbol square"></div>
                      </div>
                      <div class="text-content">
                          <h1 class="title">${this.config.gameInfo.name}</h1>
                          <p class="subtitle">You are invited to play</p>
                          <div class="details">
                              <p class="code">CODE: ${this.config.gameInfo.inviteCode}</p>
                              <p class="date">VÁLIDO HASTA: ${this.config.gameInfo.validUntil}</p>
                          </div>
                      </div>
                      <button class="button" onclick="game.showTerms()">Aceptar Invitación</button>
                  </div>
              </div>
          </div>
      `;
  }

  getTermsHTML() {
      return `
          <div class="screen">
              <div class="terms-container">
                  <h2 class="title">${this.config.terms.title}</h2>
                  ${this.config.terms.sections.map(section => `
                      <div class="terms-section">
                          <h3>${section.title}</h3>
                          <p>${section.content}</p>
                      </div>
                  `).join('')}
                  <button class="button" onclick="game.acceptTerms()">Acepto los Términos</button>
              </div>
          </div>
      `;
  }

  getCountdownHTML() {
      return `
          <div class="screen">
              <div class="countdown-container">
                  <h2 class="title">Preparándote para ${this.config.gameInfo.name}</h2>
                  <div class="countdown-digits" id="countdown"></div>
                  <div class="discord-info">
                      <p>Únete a nuestro Discord:</p>
                      <a href="${this.config.discord.inviteLink}" class="discord-link" target="_blank">
                          Discord Server
                      </a>
                      <p>Canal de anuncios: ${this.config.discord.announcementsChannel}</p>
                  </div>
              </div>
          </div>
      `;
  }

  showTerms() {
      this.currentScreen = 'terms';
      this.renderScreen('terms');
  }

  acceptTerms() {
      this.currentScreen = 'countdown';
      this.renderScreen('countdown');
  }

  startCountdown() {
      const countdownElement = document.getElementById('countdown');
      const eventDate = new Date(this.config.gameInfo.eventDate).getTime();

      const updateCountdown = () => {
          const now = new Date().getTime();
          const distance = eventDate - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

          if (distance < 0) {
              clearInterval(this.countdownInterval);
              countdownElement.innerHTML = "¡El evento ha comenzado!";

              // Mostrar el servidor privado
              const privateServer = document.createElement('div');
              privateServer.className = 'private-server';
              privateServer.innerHTML = `
                  <h3>¡Servidor Privado Desbloqueado!</h3>
                  <p>Usa el siguiente código para unirte al servidor privado de Roblox:</p>
                  <div class="server-code">
                      ${this.config.gameInfo.privateServerCode}
                  </div>
                  <button class="button" onclick="window.open('${this.config.gameInfo.privateServerLink}', '_blank')">
                      Unirse al Servidor
                  </button>
              `;
              document.querySelector('.countdown-container').appendChild(privateServer);

              // Animar la aparición
              setTimeout(() => {
                  privateServer.classList.add('show');
              }, 100);
          }

  startEventListeners() {
      // Aquí puedes añadir más event listeners si son necesarios
  }
}

// Inicializar el juego
const game = new AeosGame(CONFIG);