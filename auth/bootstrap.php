<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/database.php';

function jsonResponse(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function getJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function isAuthenticated(): bool
{
    return isset($_SESSION['user']) && is_array($_SESSION['user']);
}

function ensureSuperAdmin(PDO $pdo): void
{
    $adminName = getenv('ADMIN_NAME') ?: 'Super Admin';
    $adminEmail = strtolower(trim((string)(getenv('ADMIN_EMAIL') ?: 'admin@dashboard.local')));
    $adminPassword = (string)(getenv('ADMIN_PASSWORD') ?: 'Admin12345!');

    if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL) || strlen($adminPassword) < 8) {
        return;
    }

    $existsStmt = $pdo->prepare('SELECT id FROM `user` WHERE email = :email LIMIT 1');
    $existsStmt->execute(['email' => $adminEmail]);

    if ($existsStmt->fetch()) {
        return;
    }

    $insertStmt = $pdo->prepare('INSERT INTO `user` (name, email, password) VALUES (:name, :email, :password)');
    $insertStmt->execute([
        'name' => $adminName,
        'email' => $adminEmail,
        'password' => password_hash($adminPassword, PASSWORD_DEFAULT),
    ]);
}
