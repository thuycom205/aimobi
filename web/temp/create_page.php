<?php
curl -X POST "https://{shop}.myshopify.com/admin/api/2021-04/pages.json" \
     -H "Content-Type: application/json" \
     -H "X-Shopify-Access-Token: {access_token}" \
     -d '{
           "page": {
             "title": "New Products Page",
             "template_suffix": "custom-products",
             "body_html": "<p>Content above the product block.</p>"
           }
         }'
