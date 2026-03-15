<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Método no permitido'], 405);
}

$body = getJsonBody();
$name = trim((string)($body['name'] ?? ''));
$email = filter_var(trim((string)($body['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$password = (string)($body['password'] ?? '');
$confirmPassword = (string)($body['confirmPassword'] ?? '');

if ($name === '' || !$email || strlen($password) < 8 || $password !== $confirmPassword) {
    jsonResponse(['success' => false, 'message' => 'Datos de registro inválidos'], 422);
}

try {
    $pdo = getDatabaseConnection();

    ensureSuperAdmin($pdo);

    $existsStmt = $pdo->prepare('SELECT id FROM `user` WHERE email = :email LIMIT 1');
    $existsStmt->execute(['email' => $email]);
    if ($existsStmt->fetch()) {
        jsonResponse(['success' => false, 'message' => 'El correo ya está registrado'], 409);
    }

    $insertStmt = $pdo->prepare('INSERT INTO `user` (name, email, password) VALUES (:name, :email, :password)');
    $insertStmt->execute([
        'name' => $name,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
    ]);

    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id' => (int)$pdo->lastInsertId(),
        'name' => $name,
        'email' => (string)$email,
    ];

    jsonResponse([
        'success' => true,
        'message' => 'Cuenta creada correctamente',
        'redirect' => 'index.php',
    ], 201);
} catch (Throwable $exception) {
    jsonResponse([
        'success' => false,
        'message' => 'No se pudo registrar el usuario. Verifica la conexión a base de datos.',
    ], 500);
}
