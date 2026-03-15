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

        validateEmail(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        validatePassword(password) {
          return password.length >= 8;
        },

        validateConfirmPassword() {
          return this.password === this.confirmPassword;
        },

        handleSubmit() {
          this.loading = true;
          // Simulate API call
          setTimeout(() => {
            this.loading = false;
            alert(this.isLogin ? 'Logged in successfully!' : 'Registered successfully!');
          }, 1500);
        }
      }));
    });
  
