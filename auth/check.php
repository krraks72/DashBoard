<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

jsonResponse([
    'authenticated' => isAuthenticated(),
    'user' => $_SESSION['user'] ?? null,
]);
