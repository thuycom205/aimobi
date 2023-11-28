import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProductDetailPage extends StatefulWidget {
  final String productHandle;

  ProductDetailPage({Key key, this.productHandle}) : super(key: key);

  @override
  _ProductDetailPageState createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  Map<String, dynamic> product;
  Map<String, dynamic> selectedOptions = {};

  @override
  void initState() {
    super.initState();
    fetchProductDetails();
  }

  fetchProductDetails() async {
    final query = '''
    {
      productByHandle(handle: "${widget.productHandle}") {
        title
        options {
          id
          name
          values
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
            }
          }
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
      body: query,
    );

    if (response.statusCode == 200) {
      var decodedJson = jsonDecode(response.body);
      setState(() {
        product = decodedJson['data']['productByHandle'];
        // Initialize selectedOptions with the first value of each option
        product['options'].forEach((option) {
          if (option['values'] != null && option['values'].isNotEmpty) {
            selectedOptions[option['name']] = option['values'][0];
          }
        });
      });
    } else {
      print('Failed to load product');
    }
  }

  void updateSelectedVariant() {
    // Logic to determine the variant ID based on the selected options
    // ...
  }

  @override
  Widget build(BuildContext context) {
    // ...

    return Scaffold(
      // ...
      body: product == null
          ? CircularProgressIndicator()
          : ListView(
              // Render product options and add to cart button
              // ...
            ),
    );
  }
}
