# Sistem Manajemen Booking Kendaraan

Aplikasi berbasis web untuk manajemen pemesanan (booking) kendaraan operasional tambang

**Dikembangkan oleh:** Jonathan Wijaya

## 🛠️ Tech Stack & Requirements

Pastikan environment lokal Anda memenuhi persyaratan berikut sebelum menjalankan aplikasi:

* **PHP:** ^8.2
* **Framework:** Laravel (12.0)
* **Frontend:** React.js
* **Database:** PostgreSQL (18.3)

## 🔑 Akun Testing (Database Seeder)

Sistem ini menggunakan seeder untuk mengenerate data *dummy* beserta akun login. Berikut adalah kredensial yang dapat digunakan untuk masuk ke dalam sistem:

| Role / Nama | Email | Password |
| :--- | :--- | :--- |
| **Approver 1 (Natan)** | natan@gmail.com | 12345678 |
| **Approver 2 (Jaya)** | jaya@gmail.com | 12345678 |
| **Admin** | jo@mail.com | 12345678 |


## 🚀 Panduan Instalasi & Penggunaan

**1. Clone Repository**
```bash
git clone [https://github.com/username-github-anda/booking-kendaraan.git](https://github.com/username-github-anda/booking-kendaraan.git)
cd booking-kendaraan
```

**2. Install Dependencies**

Install seluruh library PHP dan dependensi JavaScript yang dibutuhkan:
```bash
composer install
npm install
```

**3. Setup Environment Variables**
```bash
cp .env.example .env
```

**4. Generate Application Key**
```bash
php artisan key:generate
```

**5. Jalankan Migration & Seeder (Penting)**
```bash
php artisan migrate:fresh --seed
```

**6. Build Assets & Jalankan Server Lokal**
```bash
composer run dev
```
