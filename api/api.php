<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

require __DIR__ . "/db.php";

$method = $_SERVER["REQUEST_METHOD"];

/* =================================
   R – READ
   ================================= */
if ($method === "GET") {
    try {
        $stmt = $pdo->query(
            "SELECT nev, ar FROM kategoria ORDER BY nev"
        );

        echo json_encode([
            "status" => "Read success!",
            "readData" => $stmt->fetchAll()
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Read error!",
            "error" => $e->getMessage()
        ]);
    }
    exit;
}

/* =================================
   C – CREATE
   ================================= */
if ($method === "POST") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "INSERT INTO kategoria (nev, ar) VALUES (?, ?)"
        );
        $stmt->execute([
            $data["nev"],
            $data["ar"]
        ]);

        echo json_encode([
            "status" => "Create success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Create error!",
            "error" => $e->getMessage()
        ]);
    }
    exit;
}

/* =================================
   U – UPDATE
   ================================= */
if ($method === "PUT") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "UPDATE kategoria
             SET nev = ?, ar = ?
             WHERE nev = ?"
        );
        $stmt->execute([
            $data["nev"],
            $data["ar"],
            $data["oldNev"]
        ]);

        echo json_encode([
            "status" => "Update success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Update error!",
            "error" => $e->getMessage()
        ]);
    }
    exit;
}

/* =================================
   D – DELETE
   ================================= */
if ($method === "DELETE") {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare(
            "DELETE FROM kategoria WHERE nev = ?"
        );
        $stmt->execute([
            $data["nev"]
        ]);

        echo json_encode([
            "status" => "Delete success!"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "Delete error!",
            "error" => $e->getMessage()
        ]);
    }
    exit;
}
