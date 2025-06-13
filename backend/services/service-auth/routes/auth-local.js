const express = require("express");
const router = express.Router();
const { db } = require("../../config");
const validator = require("validator");
const passport = require("../configs/strategy-local");

// Cek koneksi MySQL
db.getConnection((err) => {
  if (err) throw err;
  console.log("[SUKSES] Terkoneksi ke MySQL!");
})

// Endpoints
//
// POST Register User
router.post("/register", (req, res) => {
    // TODO: Enkripsi password
    const { username, email, password } = req.body;
    if (!validator.isEmail(email)) return res.status(400).send("[GAGAL] E-mail tidak valid!");
    if (validator.isEmpty(username)) return res.status(400).send("[GAGAL] Username tidak boleh kosong!");
    if (validator.isEmpty(password)) return res.status(400).send("[GAGAL] Password tidak boleh kosong!");
    const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("[SUKSES] Berhasil mendaftar!");
    });
})

// POST Login User
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).send("[GAGAL] Username atau password salah!");
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).send("[SUKSES] Berhasil login!");
      });
    }) (req, res, next);
  });

// POST Logout User
router.post("/logout", (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("[GAGAL] Tidak ada user yang login.");
    }
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).send("[SUKSES] Berhasil logout!");
    })
})

// GET Profile User
router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("[GAGAL] Uh-oh... User belum login!");
    }
    // TODO: Mempercantik Output
    res.send(`Halo, ${req.user.username}!`);
});

module.exports = router;