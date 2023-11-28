import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// ... Your existing code ...

class _ProductDetailPageState extends State<ProductDetailPage> {
  // ... Your existing variables and methods ...

  Future<void> addToCart(String variantId) async {
    final mutation = '''
      mutation {
        checkoutCreate(input: {
          lineItems: [{ variantId: "$variantId", quantity: 1 }]
        }) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    ''';

    var url = Uri.parse('https://{shop}.myshopify.com/api/2021-04/graphql.json');
    var response = await http.post(
      url,
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": "{storefront_access_token}",
      },
      body: mutation,
    );

    if (response.statusCode == 200) {
      var decodedJson = jsonDecode(response.body);
      var checkout = decodedJson['data']['checkoutCreate']['checkout'];

      // Here you can open the checkout URL in a webview or a browser
      // For example, using the url_launcher package:
      // if (await canLaunch(checkout['webUrl'])) {
      //   await launch(checkout['webUrl']);
      // } else {
      //   throw 'Could not launch ${checkout['webUrl']}';
      // }
    } else {
      print('Failed to add to cart');
    }
  }

  @override
  Widget build(BuildContext context) {
    // ... Your existing build method ...

    // After displaying product details, add an ElevatedButton:
    ElevatedButton(
      onPressed: () {
        // Assuming the first variant is the one to add to cart
        String variantId = product['variants'][0]['id'];
        addToCart(variantId);
      },
      child: Text('Add to Cart'),
      // Style the button as you like
    ),

    // ... Rest of your code ...
  }
}
