function dashboardApp() {
  return {
    darkMode: false,
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
    isMobile: window.innerWidth < 1024,
    currentPage: 'dashboard',
    pageTitle: 'Dashboard Utama',
    showAddProduct: false,
    settingsTab: 'profile',
    currentDate: '',
    currentTime: '',

    pageTitles: {
      dashboard: 'Dashboard Utama',
      products: 'Manajemen Produk',
      categories: 'Manajemen Kategori',
      artisans: 'Binaan / Perajin',
      orders: 'Pesanan & Orders',
      inventory: 'Inventaris Bahan',
      gallery: 'Galeri',
      articles: 'Artikel & Berita',
      settings: 'Pengaturan',
      login: 'Login'
    },

    navigate(page) {
      this.currentPage = page;
      this.pageTitle = this.pageTitles[page] || page;
      this.mobileSidebarOpen = false;
      if (page === 'dashboard') { this.$nextTick(() => this.initCharts()); }
    },


    getBasePath() {
      const path = window.location.pathname;
      const fileName = '/index';
      const index = path.lastIndexOf(fileName);
      if (index === -1) {
        return '';
      }

      return path.slice(0, index);
    },

    buildUrl(relativePath) {
      return `${this.getBasePath()}${relativePath}`;
    },

    async logout() {
      try {
        const response = await fetch(this.buildUrl('/auth/logout.php'), { method: 'POST' });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'No se pudo cerrar la sesión');
        }

        window.location.href = this.buildUrl(`/${result.redirect || 'login.php'}`);
      } catch (error) {
        alert(error.message || 'Error cerrando la sesión');
      }
    },

    toggleSidebar() {
      if (this.isMobile) { this.mobileSidebarOpen = !this.mobileSidebarOpen; }
      else { this.sidebarCollapsed = !this.sidebarCollapsed; }
    },

    updateDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString('id-ID', { weekday:'short', day:'2-digit', month:'short', year:'numeric' });
      this.currentTime = now.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    },

    // MOCK DATA
    products: [
      { id:1, name:'Kemeja Karawo Premium', sku:'KMJ-001', category:'Kemeja', price:450000, stock:24, status:'Aktif', color:'#fc1919' },
      { id:2, name:'Selendang Motif Padi', sku:'SLD-001', category:'Selendang', price:280000, stock:18, status:'Aktif', color:'#28A745' },
      { id:3, name:'Blouse Karawo Elegan', sku:'BLS-001', category:'Blouse', price:380000, stock:12, status:'Aktif', color:'#17A2B8' },
      { id:4, name:'Tas Tangan Karawo', sku:'TAS-001', category:'Tas', price:320000, stock:8, status:'Aktif', color:'#FFC107' },
      { id:5, name:'Sarung Karawo Tradisional', sku:'SRG-001', category:'Sarung', price:420000, stock:3, status:'Aktif', color:'#6C757D' },
      { id:6, name:'Kemeja Anak Karawo', sku:'KMJ-002', category:'Kemeja', price:250000, stock:0, status:'Non-aktif', color:'#495057' },
      { id:7, name:'Kerudung Sulam Karawo', sku:'KRD-001', category:'Aksesori', price:180000, stock:32, status:'Aktif', color:'#fc1919' },
      { id:8, name:'Sepatu Motif Karawo', sku:'SPT-001', category:'Aksesori', price:650000, stock:6, status:'Aktif', color:'#17A2B8' },
      { id:9, name:'Dompet Karawo Mini', sku:'DMP-001', category:'Tas', price:120000, stock:45, status:'Aktif', color:'#28A745' },
      { id:10, name:'Blouse Casual Karawo', sku:'BLS-002', category:'Blouse', price:310000, stock:2, status:'Non-aktif', color:'#FFC107' },
    ],

    artisans: [
      { id:1, name:'Ibu Fatimah', initials:'IF', color:'#fc1919', group:'Kelompok A', address:'Kota Gorontalo', phone:'081234567891', joined:'Jan 2020', products:34, status:'Aktif' },
      { id:2, name:'Ibu Siti Rahma', initials:'SR', color:'#28A745', group:'Kelompok B', address:'Bone Bolango', phone:'081234567892', joined:'Mar 2020', products:28, status:'Aktif' },
      { id:3, name:'Ibu Nur Hakim', initials:'NH', color:'#17A2B8', group:'Kelompok A', address:'Kota Gorontalo', phone:'081234567893', joined:'Jun 2020', products:22, status:'Aktif' },
      { id:4, name:'Ibu Hasna', initials:'HN', color:'#FFC107', group:'Kelompok C', address:'Gorontalo Utara', phone:'081234567894', joined:'Sep 2020', products:19, status:'Cuti' },
      { id:5, name:'Ibu Yanti', initials:'YT', color:'#6C757D', group:'Kelompok B', address:'Bone Bolango', phone:'081234567895', joined:'Dec 2020', products:15, status:'Aktif' },
      { id:6, name:'Ibu Mariati', initials:'MT', color:'#fc1919', group:'Kelompok C', address:'Gorontalo Utara', phone:'081234567896', joined:'Feb 2021', products:12, status:'Non-aktif' },
      { id:7, name:'Ibu Dian Sari', initials:'DS', color:'#28A745', group:'Kelompok A', address:'Kota Gorontalo', phone:'081234567897', joined:'Apr 2021', products:27, status:'Aktif' },
      { id:8, name:'Ibu Rini Harun', initials:'RH', color:'#17A2B8', group:'Kelompok D', address:'Pohuwato', phone:'081234567898', joined:'Jul 2021', products:9, status:'Cuti' },
    ],

    orders: [
      { id:1, invoice:'#INV-056', date:'15 Jan 2024', customer:'Ahmad Budi', city:'Jakarta', total:900000, payment:'Transfer Bank', status:'Baru' },
      { id:2, invoice:'#INV-055', date:'14 Jan 2024', customer:'Sari Dewi', city:'Surabaya', total:560000, payment:'QRIS', status:'Diproses' },
      { id:3, invoice:'#INV-054', date:'14 Jan 2024', customer:'Hendra Wijaya', city:'Bandung', total:1250000, payment:'Transfer Bank', status:'Dikirim' },
      { id:4, invoice:'#INV-053', date:'13 Jan 2024', customer:'Rina Mahendra', city:'Gorontalo', total:420000, payment:'COD', status:'Selesai' },
      { id:5, invoice:'#INV-052', date:'13 Jan 2024', customer:'Budi Santoso', city:'Medan', total:780000, payment:'QRIS', status:'Selesai' },
      { id:6, invoice:'#INV-051', date:'12 Jan 2024', customer:'Dewi Rahayu', city:'Makassar', total:340000, payment:'Transfer Bank', status:'Dibatalkan' },
      { id:7, invoice:'#INV-050', date:'12 Jan 2024', customer:'Rudi Hermawan', city:'Yogyakarta', total:650000, payment:'QRIS', status:'Baru' },
      { id:8, invoice:'#INV-049', date:'11 Jan 2024', customer:'Lina Susanti', city:'Semarang', total:1100000, payment:'Transfer Bank', status:'Diproses' },
    ],

    inventory: [
      { id:1, name:'Benang Sutra Merah', category:'Benang', stock:15, unit:'Gulungan', minStock:50, status:'Menipis' },
      { id:2, name:'Benang Emas No.8', category:'Benang', stock:30, unit:'Gulungan', minStock:100, status:'Menipis' },
      { id:3, name:'Kain Putih Halus', category:'Kain', stock:2, unit:'Meter', minStock:20, status:'Menipis' },
      { id:4, name:'Benang Sutra Biru', category:'Benang', stock:120, unit:'Gulungan', minStock:50, status:'Aman' },
      { id:5, name:'Kain Sutra Kuning', category:'Kain', stock:0, unit:'Meter', minStock:10, status:'Habis' },
      { id:6, name:'Jarum Sulam No.12', category:'Aksesoris', stock:200, unit:'Pcs', minStock:50, status:'Aman' },
      { id:7, name:'Benang Perak No.12', category:'Benang', stock:25, unit:'Gulungan', minStock:80, status:'Menipis' },
      { id:8, name:'Kain Satin Putih', category:'Kain', stock:45, unit:'Meter', minStock:20, status:'Aman' },
    ],

    articlesList: [
      { id:1, title:'Karawo: Warisan Budaya Gorontalo yang Mendunia', excerpt:'Sulaman karawo kini semakin dikenal...', category:'Karawo', date:'15 Jan 2024', views:1240, status:'Published' },
      { id:2, title:'Teknik Dasar Sulam Karawo untuk Pemula', excerpt:'Panduan lengkap memulai sulam karawo...', category:'Tutorial', date:'12 Jan 2024', views:892, status:'Published' },
      { id:3, title:'Koleksi Terbaru EVDesign 2024', excerpt:'Temukan inspirasi fashion terkini...', category:'Berita', date:'10 Jan 2024', views:654, status:'Published' },
      { id:4, title:'Perajin EVDesign Tampil di Jakarta Fashion Week', excerpt:'Kebanggaan Gorontalo tampil di panggung...', category:'Berita', date:'05 Jan 2024', views:2341, status:'Published' },
      { id:5, title:'Motif-motif Karawo dan Maknanya', excerpt:'Setiap motif memiliki filosofi mendalam...', category:'Karawo', date:'02 Jan 2024', views:445, status:'Draft' },
      { id:6, title:'Cara Merawat Kain Karawo agar Tetap Awet', excerpt:'Tips perawatan kain sulam...', category:'Tutorial', date:'30 Des 2023', views:321, status:'Draft' },
    ],

    categories: [
      { id:1, name:'Kemeja', count:32, icon:'solar:t-shirt-bold-duotone', color:'' },
      { id:2, name:'Blouse', count:24, icon:'solar:t-shirt-2-bold-duotone', color:'' },
      { id:3, name:'Selendang', count:18, icon:'solar:layers-bold-duotone', color:'' },
      { id:4, name:'Tas', count:22, icon:'solar:bag-2-bold-duotone', color:'' },
      { id:5, name:'Sarung', count:15, icon:'solar:layers-minimalistic-bold-duotone', color:'' },
      { id:6, name:'Aksesori', count:13, icon:'solar:star-bold-duotone', color:'' },
    ],

    charts: {},

    initCharts() {
      // Cleanup
      Object.values(this.charts).forEach(c => { if (c) c.destroy(); });
      this.charts = {};

      Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

      const isDark = this.darkMode;
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      const textColor = isDark ? '#94A3B8' : '#6C757D';

      // Sales Line Chart
      const salesCtx = document.getElementById('salesChart');
      if (salesCtx) {
        this.charts.sales = new Chart(salesCtx, {
          type: 'line',
          data: {
            labels: ['Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des','Jan'],
            datasets: [{
              label: 'Pendapatan (Juta Rp)',
              data: [18, 22, 19, 28, 25, 32, 29, 35, 31, 38, 42, 45.8],
              borderColor: '#fc1919',
              backgroundColor: 'rgba(252,25,25,0.08)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#fc1919',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#fff',
                titleColor: '#212529',
                bodyColor: '#fc1919',
                borderColor: '#fc1919',
                borderWidth: 1,
                callbacks: { label: ctx => 'Rp ' + ctx.raw + ' Juta' }
              }
            },
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => 'Rp '+v+'Jt' } }
            }
          }
        });
      }

      // Category Bar Chart
      const catCtx = document.getElementById('categoryChart');
      if (catCtx) {
        this.charts.category = new Chart(catCtx, {
          type: 'bar',
          data: {
            labels: ['Kemeja','Blouse','Selendang','Tas','Sarung','Aksesori'],
            datasets: [{
              label: 'Unit Terjual',
              data: [48, 35, 28, 22, 19, 15],
              backgroundColor: ['#fc1919','#28A745','#17A2B8','#FFC107','#6C757D','#DC3545'],
              borderRadius: 6,
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#fff',
                titleColor: '#212529',
                bodyColor: '#495057',
                borderColor: '#fc1919',
                borderWidth: 1,
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        });
      }

      // Artisan Pie
      const pieCtx = document.getElementById('artisanPieChart');
      if (pieCtx) {
        this.charts.pie = new Chart(pieCtx, {
          type: 'doughnut',
          data: {
            labels: ['Kota Gorontalo','Bone Bolango','Gorontalo Utara','Pohuwato','Boalemo'],
            datasets: [{
              data: [16, 12, 7, 3, 2],
              backgroundColor: ['#fc1919','#28A745','#17A2B8','#FFC107','#6C757D'],
              borderWidth: 0,
              hoverOffset: 6,
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: textColor, padding: 12, font: { size: 12 } }
              },
              tooltip: {
                backgroundColor: '#fff',
                titleColor: '#212529',
                bodyColor: '#495057',
                borderColor: '#fc1919',
                borderWidth: 1,
              }
            },
            cutout: '65%',
          }
        });
      }

      // Traffic
      const trafficCtx = document.getElementById('trafficChart');
      if (trafficCtx) {
        this.charts.traffic = new Chart(trafficCtx, {
          type: 'bar',
          data: {
            labels: ['Agt','Sep','Okt','Nov','Des','Jan'],
            datasets: [
              {
                label: 'Pengunjung',
                data: [850, 920, 1040, 1100, 1180, 1240],
                backgroundColor: '#fc1919',
                borderRadius: 6,
              },
              {
                label: 'Sesi',
                data: [640, 720, 800, 880, 940, 1010],
                backgroundColor: 'rgba(108,117,125,0.4)',
                borderRadius: 6,
              }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: { color: textColor, font: { size: 12 } }
              },
              tooltip: {
                backgroundColor: '#fff',
                titleColor: '#212529',
                bodyColor: '#495057',
                borderColor: '#fc1919',
                borderWidth: 1,
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        });
      }
    },

    init() {
      this.updateDateTime();
      setInterval(() => this.updateDateTime(), 1000);
      this.$nextTick(() => this.initCharts());

      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth < 1024;
        if (!this.isMobile) this.mobileSidebarOpen = false;
      });

      // Re-init charts on dark mode toggle
      this.$watch('darkMode', () => {
        if (this.currentPage === 'dashboard') {
          setTimeout(() => this.initCharts(), 100);
        }
      });
    }
  }
}
