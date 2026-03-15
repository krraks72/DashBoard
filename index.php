<?php

declare(strict_types=1);

require_once __DIR__ . '/auth/bootstrap.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

include __DIR__ . '/index.html';
