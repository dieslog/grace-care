<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$comment = $_POST['comment'];


$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language/directory/');

    $mail->setFrom('info@grace-care.com', 'Mailer');
    $mail->addAddress('joe@example.net', 'Joe User');
    $mail->Subject = '(Care Homes) New message from ' . $name;

    $body = "Name: {$name} \n\r" .
        "Email: {$email} \n\r" .
        "Tel: {$tel} \n\r" .
        "Message: {$comment} \n\r";

    $mail->Body = $body;

    if($mail->send()) {
        http_response_code(200);
    } else {
        http_response_code(501);
    }
} catch (Exception $e) {
    http_response_code(502);
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}