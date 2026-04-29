<?php
header("Content-Type: application/json");
require "db.php";

$method = $_SERVER["REQUEST_METHOD"];

/* ===============================
   R – READ
   Alap lista (első 20 rekord)
   + dátum alapú keresés
   =============================== */
if ($method === "GET") {

    $felvetelTol   = $_GET["felvetel_tol"]   ?? null;
    $kiszallitasIg = $_GET["kiszallitas_ig"] ?? null;

    try {
        if ($felvetelTol && $kiszallitasIg) {
            // 🔍 Keresés dátum alapján
            $stmt = $pdo->prepare(
                "SELECT *
                 FROM rendeles
                 WHERE felvetel >= ?
                   AND kiszallitas <= ?
                 ORDER BY felvetel ASC
                 LIMIT 20"
            );
            $stmt->execute([$felvetelTol, $kiszallitasIg]);
        } else {
            // 📄 Alap lista (első 20)
            $stmt = $pdo->query(
                "SELECT *
                 FROM rendeles
                 ORDER BY felvetel ASC
                 LIMIT 20"
            );
        }

        echo json_encode([
            "status" => "Read success!",
            "readData" => $stmt->fetchAll()
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Read error!"
        ]);
    }

    exit;
}

/* ===============================
   C – CREATE
   Új rendelés felvétele
   =============================== */
if ($method === "POST") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "INSERT INTO rendeles (pizzanev, darab, felvetel, kiszallitas)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([
            $data["pizzanev"],
            $data["darab"],
            $data["felvetel"],
            $data["kiszallitas"]
        ]);

        echo json_encode([
            "status" => "Create success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Create error!"
        ]);
    }

    exit;
}

/* ===============================
   U – UPDATE
   Rendelés módosítása
   =============================== */
if ($method === "PUT") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "UPDATE rendeles
             SET pizzanev = ?, darab = ?, felvetel = ?, kiszallitas = ?
             WHERE az = ?"
        );
        $stmt->execute([
            $data["pizzanev"],
            $data["darab"],
            $data["felvetel"],
            $data["kiszallitas"],
            $data["az"]
        ]);

        echo json_encode([
            "status" => "Update success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Update error!"
        ]);
    }

    exit;
}

/* ===============================
   D – DELETE
   Rendelés törlése
   =============================== */
if ($method === "DELETE") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "DELETE FROM rendeles WHERE az = ?"
        );
        $stmt->execute([$data["az"]]);

        echo json_encode([
            "status" => "Delete success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Delete error!"
        ]);
    }

    exit;
}