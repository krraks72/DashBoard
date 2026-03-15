document.addEventListener('alpine:init', () => {
  Alpine.data('authPage', () => ({
    isLogin: true,
    showPassword: false,
    showConfirmPassword: false,
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    loading: false,
    formMessage: '',
    formError: false,

    getBasePath() {
      const path = window.location.pathname;
      const marker = '/login';
      const index = path.lastIndexOf(marker);
      if (index === -1) {
        return '';
      }

      return path.slice(0, index);
    },

    buildUrl(relativePath) {
      const basePath = this.getBasePath();
      return `${basePath}${relativePath}`;
    },

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    validatePassword(password) {
      return password.length >= 8;
    },

    validateConfirmPassword() {
      return this.password === this.confirmPassword;
    },

    async handleSubmit() {
      this.formMessage = '';
      this.formError = false;

      if (!this.validateEmail(this.email) || !this.validatePassword(this.password)) {
        this.formError = true;
        this.formMessage = 'Completa correctamente el formulario.';
        return;
      }

      if (!this.isLogin && !this.validateConfirmPassword()) {
        this.formError = true;
        this.formMessage = 'Las contraseñas no coinciden.';
        return;
      }

      this.loading = true;

      try {
        const endpoint = this.isLogin ? '/auth/login.php' : '/auth/register.php';
        const response = await fetch(this.buildUrl(endpoint), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            name: this.name,
            confirmPassword: this.confirmPassword
          })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'No se pudo procesar la solicitud');
        }

        this.formMessage = result.message || 'Operación exitosa';
        this.formError = false;
        window.location.href = this.buildUrl(`/${result.redirect || 'index.php'}`);
      } catch (error) {
        this.formMessage = error.message;
        this.formError = true;
      } finally {
        this.loading = false;
      }
    }
  }));
});
