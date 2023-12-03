stage.on('mousedown', function(e) {
    if (!selectionModeEnabled) {
        return;
    }
    // Start a timer when the mouse is held down
    mouseDownTimer = setTimeout(function() {
        isDrawing = true;

        // Start point of the rectangle
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    }, 300); // 300 milliseconds = 0.3 seconds
});

stage.on('mousemove', function(e) {
    if (!isDrawing || !selectionModeEnabled) {
        return;
    }
    // Existing mousemove logic
});

stage.on('mouseup', function() {
    if (!selectionModeEnabled) {
        return;
    }
    // Existing mouseup logic
    // Optionally, disable selection mode after selection is made
    // selectionModeEnabled = false;
});
