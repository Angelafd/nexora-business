<?php

header(
    'Content-Type: application/json; charset=utf-8'
);

function clean(string $value): string
{
    return trim(
        strip_tags($value)
    );
}


if (
    $_SERVER['REQUEST_METHOD']
    !== 'POST'
) {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido.'
    ]);

    exit;
}

$nombre = clean(
    $_POST['nombre'] ?? ''
);

$empresa = clean(
    $_POST['empresa'] ?? ''
);

$correo = filter_var(
    trim(
        $_POST['correo'] ?? ''
    ),
    FILTER_SANITIZE_EMAIL
);

$telefono = clean(
    $_POST['telefono'] ?? ''
);

$mensaje = clean(
    $_POST['mensaje'] ?? ''
);


$errors = [];


if ($nombre === '') {

    $errors[] =
        'El nombre es obligatorio.';
}


if (
    !filter_var(
        $correo,
        FILTER_VALIDATE_EMAIL
    )
) {

    $errors[] =
        'El correo electrónico no es válido.';
}


if ($mensaje === '') {

    $errors[] =
        'El mensaje es obligatorio.';
}


if (!empty($errors)) {

    http_response_code(422);

    echo json_encode([
        'success' => false,
        'errors' => $errors
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


echo json_encode([
    'success' => true,
    'message' =>
        'Lead validado correctamente.',
    'data' => [
        'nombre' => $nombre,
        'empresa' => $empresa,
        'correo' => $correo,
        'telefono' => $telefono
    ]
], JSON_UNESCAPED_UNICODE);