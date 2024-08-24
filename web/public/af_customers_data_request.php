<?php

#file af_customers_data_request.php

# The Shopify app's client secret, viewable from the Partner Dashboard. In a production environment, set the client secret as an environment variable to prevent exposing it in code.
define( 'CLIENT_SECRET', 'ade2370c8cde9f73ea89c9f91321dab5' );
function verify_webhook( $data, $hmac_header ) {
    $calculated_hmac = base64_encode( hash_hmac( 'sha256', $data, CLIENT_SECRET, true ) );

    return hash_equals( $hmac_header, $calculated_hmac );
}

$hmac_header = $_SERVER['HTTP_X_SHOPIFY_HMAC_SHA256'];
$data        = file_get_contents( 'php://input' );
$verified    = verify_webhook( $data, $hmac_header );
error_log( 'Webhook verified: ' . var_export( $verified, true ) ); // Check error.log to see the result
//$verified = true;
if ( $verified ) {
    # Process webhook payload
    # ...
    echo "Done";
} else {
    http_response_code( 401 );
}
