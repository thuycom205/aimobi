class _ProductDetailPageState extends State<ProductDetailPage> {
  Map<String, dynamic> product;
  String selectedVariantId;
  Map<String, String> selectedOptions = {};

  // Initialize with null or some default values based on your data
  String selectedSize = 'M';
  String selectedColor = 'Red';

  // ...

  void updateSelectedVariant() {
    for (var variant in product['variants']) {
      bool match = true;
      for (var option in variant['options']) {
        if (selectedOptions[option['name']] != option['value']) {
          match = false;
          break;
        }
      }
      if (match) {
        setState(() {
          selectedVariantId = variant['id'];
        });
        return;
      }
    }
  }

  // ...

  @override
  Widget build(BuildContext context) {
    // ...

    return Scaffold(
      // ...
      body: Column(
        children: [
          // ...
          // Dropdown or any other widget for option selection
          DropdownButton<String>(
            value: selectedSize,
            onChanged: (String newValue) {
              setState(() {
                selectedSize = newValue;
                selectedOptions['Size'] = newValue;
                updateSelectedVariant();
              });
            },
            items: <String>['S', 'M', 'L', 'XL']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
          DropdownButton<String>(
            value: selectedColor,
            onChanged: (String newValue) {
              setState(() {
                selectedColor = newValue;
                selectedOptions['Color'] = newValue;
                updateSelectedVariant();
              });
            },
            items: <String>['Red', 'Green', 'Blue', 'Black']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
          // Add to Cart button
          ElevatedButton(
            onPressed: selectedVariantId != null ? () {
              // Add to cart functionality
            } : null,
            child: Text('Add to Cart'),
          ),
        ],
      ),
    );
  }
}
