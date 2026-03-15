<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Método no permitido'], 405);
}

$body = getJsonBody();
$email = filter_var(trim((string)($body['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$password = (string)($body['password'] ?? '');

if (!$email || $password === '') {
    jsonResponse(['success' => false, 'message' => 'Email o contraseña inválidos'], 422);
}

try {
    $pdo = getDatabaseConnection();
    ensureSuperAdmin($pdo);
    $stmt = $pdo->prepare('SELECT id, name, email, password FROM `user` WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, (string)$user['password'])) {
        jsonResponse(['success' => false, 'message' => 'Credenciales incorrectas'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id' => (int)$user['id'],
        'name' => (string)$user['name'],
        'email' => (string)$user['email'],
    ];

    jsonResponse([
        'success' => true,
        'message' => 'Inicio de sesión exitoso',
        'redirect' => 'index.php',
    ]);
} catch (Throwable $exception) {
    jsonResponse([
        'success' => false,
        'message' => 'No se pudo iniciar sesión. Verifica la conexión a base de datos.',
    ], 500);
}
