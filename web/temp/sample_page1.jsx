// ... other imports ...

export default function Screen() {
    // ... useState and useEffect setup ...

    // This function will chunk the product array into groups of three
    const chunkedProducts = chunk(sampleProducts, 3);

    function chunk(arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    }

    // ... other functions ...

    return (
        <div className="iphone-wrapper">
            <Box className="iphone-container">
                {/* AppBar with Logo and Search Icon */}
                <AppBar position="static" color="default" elevation={0} className="appbar">
                    {/* AppBar contents */}
                </AppBar>
                {/* Top Notch */}
                <Box className="iphone-notch" />

                {/* Screen Content */}
                <Box className="iphone-screen">
                    {/* Countdown Timer */}
                    <Typography variant="h5" align="center" className="countdown-timer">
                        Countdown: {formatTime()}
                    </Typography>

                    {/* Product Collection Title */}
                    <Typography variant="h6" align="center" className="product-collection-title">
                        Featured Collection
                    </Typography>

                    {/* Swipeable Views for Product Collection */}
                    <Box className="product-collection-container">
                        <Typography variant="h4" align="center" className="collection-title">
                            Fall Favorites
                        </Typography>
                        <Box className="products-swipe-container">
                            <SwipeableViews enableMouseEvents>
                                {chunkedProducts.map((chunk, index) => (
                                    <Box key={index} className="product-swipe-slide">
                                        {chunk.map((product, index) => (
                                            <Box key={index} className="product-item">
                                                <img src={product.imgPath} alt={product.label} className="product-image" />
                                                <Typography variant="body2" align="center">{product.label}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                ))}
                            </SwipeableViews>
                        </Box>
                    </Box>

                    {/* Circular Images Grid, Video Player, Grid of Images */}
                    {/* ... */}
                </Box>

                {/* Bottom Home Indicator */}
                <Box className="iphone-home-indicator" />
            </Box>

            {/* Drawer */}
            {/* ... */}
        </div>
    );
}
