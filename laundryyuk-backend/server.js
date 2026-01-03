const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'customer')";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Email atau Username mungkin sudah terdaftar" });
            }
            res.status(201).json({ message: "User berhasil didaftarkan!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// API Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(401).json({ message: "Email tidak ditemukan" });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Password salah" });

        res.json({
            message: "Login Berhasil",
            user: { 
                id_user: user.id_user || user.id, 
                username: user.username, 
                role: user.role 
            }
        });
    });
});

app.post('/api/laundry', (req, res) => {
    const { user_id, total_harga, alamat_order, tgl_laundry, id_layanan, berat } = req.body;

    const sqlLaundry = `
        INSERT INTO laundry 
        (user_id, id_harga, id_slot, total_berat, total_harga, alamat_order, status, tanggal_order) 
        VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
    `;
    
    // Pastikan urutan values sesuai dengan urutan kolom di atas
    // id_slot kita isi 1 sebagai default agar tidak error NULL
    const valuesLaundry = [user_id, id_layanan, 1, berat, total_harga, alamat_order, tgl_laundry];

    db.query(sqlLaundry, valuesLaundry, (err, result) => {
        if (err) {
            console.error("DETAIL ERROR MYSQL:", err.message); 
            return res.status(500).json({ message: "Gagal menyimpan data induk laundry: " + err.message });
        }

        const newLaundryId = result.insertId;

        // Tabel detail_laundry (id_laundry, id_harga, jumlah, subtotal)
        // Sesuai gambar image_76240a.png
        const sqlDetail = "INSERT INTO detail_laundry (id_laundry, id_harga, jumlah, subtotal) VALUES (?, ?, ?, ?)";
        
        db.query(sqlDetail, [newLaundryId, id_layanan, berat, total_harga], (errDetail) => {
            if (errDetail) {
                console.error("ERROR DETAIL:", errDetail.message);
                return res.status(500).json({ message: "Gagal menyimpan detail laundry" });
            }
            res.status(200).json({ message: "Pesanan Berhasil Disimpan!" });
        });
    });
});

// API Ambil Pesanan Dalam Proses untuk User tertentu
app.get('/api/laundry/proses/:user_id', (req, res) => {
    const userId = req.params.user_id;
    
    // Ubah h.nama_layanan atau h.layanan menjadi h.jenis_layanan
    const sql = `
        SELECT l.*, h.jenis_layanan AS nama_layanan 
        FROM laundry l 
        LEFT JOIN harga h ON l.id_harga = h.id_harga 
        WHERE l.user_id = ? AND l.status != 'selesai'
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});