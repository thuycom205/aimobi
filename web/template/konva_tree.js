document.addEventListener('DOMContentLoaded', function() {
    var stage = new Konva.Stage({
        container: 'container',
        width: 2000,
        height:2000,
    });
    var arrows = [];
    var activeParent;

    function deselectAllArrows() {
        arrows.forEach(function(arrow) {
            arrow.stroke('black');
        });
        layer.draw();
    }
    var layer = new Konva.Layer();
    stage.add(layer);

    // Create a parent node (circle)
    // var parentNode = new Konva.Circle({
    //     x: stage.width() / 2,
    //     y: 100,
    //     radius: 30,
    //     fill: 'red'
    // });
    // layer.add(parentNode);
    //
    // // Create an 'ear' (rectangle)
    // var ear = new Konva.Rect({
    //     x: parentNode.x() + parentNode.radius(),
    //     y: parentNode.y() - parentNode.radius() / 2,
    //     width: 20,
    //     height: 20,
    //     fill: 'blue'
    // });
    // layer.add(ear);
    //
    // var secondEar = new Konva.Rect({
    //     x: parentNode.x() - parentNode.radius() - 20, // Positioned to the left of the circle
    //     y: parentNode.y() - parentNode.radius() / 2,
    //     width: 20,
    //     height: 20,
    //     fill: 'purple'
    // });
    // layer.add(secondEar);
// Create a parent node (circle) at the left middle of the stage
    var uniqueIdx = 'rect' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    var uniqueIdx2 = 'ear' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    var first_group = new Konva.Group({
        x: 0,
        y: 0,
        parentUniqueId: uniqueIdx,
        first_parent:'1'
    });
    var parentNode = new Konva.Circle({
        x: 80, // Slightly away from the absolute left edge for visibility
        y: stage.height() / 2,
        radius: 30,
        fill: 'red',
        shapeKlass: 'rectangle',
        uniqueId: uniqueIdx
    });
    first_group.add(parentNode);
    window.parentNode = parentNode;

// Create an 'ear' (rectangle) to the right of the circle
    var ear = new Konva.Rect({
        x: parentNode.x() + parentNode.radius() + 5, // Positioned to the right of the circle
        y: parentNode.y() - 10, // Adjust the y-coordinate to align it with the middle of the circle
        width: 20,
        height: 20,
        fill: 'blue',
        uniqueId: uniqueIdx2,
        parentUniqueId: uniqueIdx
    });
    first_group.add(ear);

// Create a second 'ear' (rectangle) to the left of the circle
    var secondEar = new Konva.Rect({
        x: parentNode.x() - parentNode.radius() - 25, // Positioned to the left of the circle
        y: parentNode.y() - 10, // Adjust the y-coordinate to align it with the middle of the circle
        width: 20,
        height: 20,
        fill: 'purple',
        parentUniqueId: uniqueIdx

    });
    first_group.add(secondEar);

    layer.add(first_group);



    var selectedArrow = null;
    var isDrawing = false;

    ear.on('click', function() {
        deselectAllArrows(); // Deselect any previously selected arrow
        isDrawing = true;

        if (selectedArrow) {
            selectedArrow.stroke('black');
            layer.draw();
        }
        parentNode.draggable(false);  // Disable dragging of the circle
        isDrawing = true;
        var mousePos = stage.getPointerPosition();
        arrow = new Konva.Arrow({
            points: [parentNode.x(), parentNode.y(), mousePos.x, mousePos.y],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'black',
            stroke: 'green', // Mark the new arrow as selected
            strokeWidth: 2
        });
        selectedArrow = arrow;
        layer.add(arrow);
        arrows.push(arrow);
        arrow.on('click', function() {
            deselectAllArrows();
            selectedArrow = this;
            selectedArrow.stroke('green'); // Highlight the new selected arrow
            layer.draw();
            isDrawing = true;

        });

    });
    first_group.on('dragmove', function() {
        redrawArrows();
    });
    stage.on('mousemove', function() {
        var mousePos = stage.getPointerPosition();
        if (isDrawing) {
            // Drawing a new arrow
            if (selectedArrow) {
                selectedArrow.points([parentNode.x(), parentNode.y(), mousePos.x, mousePos.y]);
                layer.batchDraw();
            }
            else if (selectedArrow) {
                // Updating position of a selected arrow
                var newPoints = [...selectedArrow.points().slice(0, 2), mousePos.x, mousePos.y];
                selectedArrow.points(newPoints);
                layer.batchDraw();
            }
        }
    });
    stage.on('dblclick', function() {
        isDrawing = false;
        if (selectedArrow) {
            selectedArrow.stroke('black');
            selectedArrow = null;
            layer.draw();
        }
    });

    layer.draw();
    stage.on('dblclick', function() {
        setTimeout(function() {
            if (!selectedArrow) {
                isDrawing = false;
            }
        }, 50); // Delay to differentiate between drawing end and arrow click
    });
    var rightClickCount = 0;
    var rightClickTimer;

    stage.on('contextmenu', function(e) {
        e.evt.preventDefault();
        rightClickCount++;

        if (rightClickCount === 1) {
            rightClickTimer = setTimeout(function() {
                rightClickCount = 0;
            }, 300); // Reset after a short delay
        } else if (rightClickCount === 2) {
            clearTimeout(rightClickTimer);
            rightClickCount = 0;
            isDrawing = false;
            if (selectedArrow) {
                selectedArrow.stroke('black');
                selectedArrow = null;
                layer.draw();
            }
        }
    });


    secondEar.on('click', function() {
        document.getElementById('sidebar').style.display = 'block';
    });

    document.getElementById('closeSidebar').addEventListener('click', function() {
        document.getElementById('sidebar').style.display = 'none';
    });


    // Assuming you have an input field with ID 'numChildren' and a button with ID 'drawArrows'

    document.getElementById('drawArrows').addEventListener('click', function() {
        var num = parseInt(document.getElementById('numChildren').value);
        if (isNaN(num) || num <= 0) {
            alert("Please enter a valid number");
            return;
        }

        var xOffset = 100; // Horizontal distance from the circle to the first rectangle
        var yOffset = 50;  // Vertical spacing between rectangles

        for (var i = 0; i < num; i++) {
            var parentUniqueId = window.parentNode.getAttr('uniqueId');
            var uniqueId = 'rect' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
            var uniqueId2 = 'ear' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
            var x = parentNode.x() + xOffset;
            var y = parentNode.y() + yOffset * i;

            // Draw arrow
            var arrow = new Konva.Arrow({
                points: [parentNode.x(), parentNode.y(), x, y],
                pointerLength: 10,
                pointerWidth: 10,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 2,
                uniqueIdPointRect: uniqueId,
                parentUniqueId: parentUniqueId
            });

            console.log('parentUniqueId',parentUniqueId);
            arrows.push(arrow);
            // Draw rectangle
            var rect = createRectangleWithEar(x + 20, y - 10,uniqueId,uniqueId2,parentUniqueId );

            layer.add(arrow);
            layer.add(rect);
        }
        layer.draw();
    });
    document.getElementById('drawArrows2').addEventListener('click', function() {
        var num = parseInt(document.getElementById('numChildren').value);
        if (isNaN(num) || num <= 0) {
            alert("Please enter a valid number");
            return;
        }

        var xOffset = 100; // Horizontal distance from the active parent to the first rectangle
        var yOffset = 50;  // Vertical spacing between rectangles

        var activeParentPos = activeParent.getAbsolutePosition();
        var parentUniqueId = activeParent.getAttr('parentUniqueId');
        console.log(parentUniqueId);


       // console.log(activeParentPos);
       // console.log(parentNodePos);
        var parentNodePos = parentNode.getAbsolutePosition();

        for (var i = 0; i < num; i++) {
            var x = activeParentPos.x + xOffset ;
            var y = activeParentPos.y + yOffset * i ;

            // Draw arrow
            var uniqueId = 'rect' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
            var uniqueId2 = 'ear' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
            var arrow = new Konva.Arrow({
                // points: [activeParentPos.x + parentNodePos.x, activeParentPos.y - parentNodePos.y, x, y],
                points: [activeParentPos.x , activeParentPos.y ,
                           x  , y],
                pointerLength: 10,
                pointerWidth: 10,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 2,
                shapeKlass: 'arrow',
                uniqueIdPointRect: uniqueId,
                parentUniqueId: parentUniqueId

            });

            arrows.push(arrow);
            // Draw rectangle
            var rect = createRectangleWithEar(x +20 , y - 10 , uniqueId,uniqueId2,parentUniqueId );

            layer.add(arrow);
            layer.add(rect);
        }
        layer.draw();
    });


    //
    // Assuming sidebar HTML is already set up with an input, select, and save button

    var currentSelectedRect;

    layer.on('click', function(evt) {
        var shape = evt.target;
        if (shape.getClassName() === 'Rect') {
            currentSelectedRect = shape;
            // Open sidebar for label input
            document.getElementById('sidebar').style.display = 'block';
        }
    });

    document.getElementById('saveLabel').addEventListener('click', function() {
        var labelText = document.getElementById('labelInput').value || document.getElementById('labelSelect').value;
        if (currentSelectedRect && labelText) {
            // Add a text label to the rectangle
            var label = new Konva.Text({
                x: currentSelectedRect.x(),
                y: currentSelectedRect.y(),
                text: labelText,
                fontSize: 12,
                fontFamily: 'Arial',
                fill: 'black'
            });

            currentSelectedRect.stroke('black');
            currentSelectedRect.fill('white');

            layer.add(label);
            layer.draw();

            // Hide the sidebar
            document.getElementById('sidebar').style.display = 'none';
        }
    });

    var rectIdCounter = 0;
    function createRectangleWithEar(x, y, uniqueId,uniqueId2) {


        // Create a group to hold both the rectangle and the ear
        var group = new Konva.Group({
            x: x,
            y: y,
            klassName:'elementear',
            parentUniqueId: uniqueId,
            draggable: true

        });

        var rect = new Konva.Rect({
            x: 0, // Position inside the group
            y: 0,
            width: 20,
            height: 20,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
            shapeKlass: 'rectangle',
            uniqueId: uniqueId
        });

        var ear = new Konva.Rect({
            x: rect.width() + 5, // Position right next to the rectangle
            y: 0,
            width: 20,
            height: 20,
            shapeKlass: 'ear',
            fill: 'purple',
            uniqueId: uniqueId2,
            parentUniqueId: uniqueId
        });

        group.add(rect);
        group.add(ear);
        layer.add(group);

        ear.on('click', function() {
            document.getElementById('sidebar').style.display = 'block';
            currentSelectedRect = rect; // Set the currently selected rectangle
            activeParent = group; // Set the group as the active parent
        });
        group.on('dragmove', function() {
            redrawArrows();
        });
        return group; // Return the group instead of just the rectangle
    }


    document.getElementById('zoomInButton').addEventListener('click', function() {
        var oldScale = stage.scaleX(); // Assuming scaleX and scaleY are the same

        var newScale = oldScale * 0.5; // Increase scale by 20%
        stage.scale({ x: newScale, y: newScale });

        // Update layer and stage to apply the new scale
        layer.batchDraw();
        stage.batchDraw();
    });
// 1. Implement Rectangle Selection
    var selectionModeEnabled = false;

    document.getElementById('startGroupButton').addEventListener('click', function() {
        selectionModeEnabled = true;
        // Reset the selection rectangle if needed
        selectionRectangle.visible(false);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    });

    var mouseDownTimer;
    var isDrawing = false;
    var selectionRectangle = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
        visible: false
    });
    layer.add(selectionRectangle);

    var x1, y1, x2, y2;
    stage.on('mousedown', function(e) {
        if (selectionModeEnabled) {

            selectionRectangle.setAttrs({
                x: 0,
                y: 0,
                width: 1,
                height: 1,
            });        // Start a timer when the mouse is held down
        mouseDownTimer = setTimeout(function() {
            isDrawing = true;

            // Start point of the rectangle
            x1 = stage.getPointerPosition().x;
            y1 = stage.getPointerPosition().y;
            selectionRectangle.visible(true);
            selectionRectangle.width(0);
            selectionRectangle.height(0);
        }, 100); // 3000 milliseconds = 3 seconds
        }
    });

    stage.on('mousemove', function(e) {
        if (!isDrawing) {
            return;
        }

        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
        layer.batchDraw();
    });

    stage.on('mouseup', function() {
        clearTimeout(mouseDownTimer); // Clear the timer

        if (isDrawing) {
            isDrawing = false;

            // Wait a brief period before detecting shapes within the selection rectangle
            setTimeout(function() {
                selectRectanglesWithin(selectionRectangle);
                // Optionally, you can also hide the selection rectangle here
                // selectionRectangle.visible(false);
                // layer.batchDraw();
            }, 100); // Timeout of 100 milliseconds
        }
    });

//2. & 3. Detect Rectangles Within Selection and Group Them
    function intersects(shape, selectionRect) {
        var shapeRect = shape.getClientRect();
        var selectionClientRect = selectionRect.getClientRect();

        return !(shapeRect.x > selectionClientRect.x + selectionClientRect.width ||
            shapeRect.x + shapeRect.width < selectionClientRect.x ||
            shapeRect.y > selectionClientRect.y + selectionClientRect.height ||
            shapeRect.y + shapeRect.height < selectionClientRect.y);
    }


    function selectRectanglesWithin(selectionRect) {
        var selectedGroup = new Konva.Group({
            x: 0,
            y: 0,
            draggable: true
        });

        var shapesAdded = false;
        for (var i = 0; i < layer.children.length; i++) {
            try {
                var shape = layer.children[i];
                var isArrow = shape.getAttr('shapeKlass') == 'arrow';

                if (isArrow) {
                    console.log(shape.getAttr('shapeKlass'));
                }
                // console.log(shape.getAttr('shapeKlass'));
                // console.log(shape);
                if (!isArrow && intersects(shape, selectionRect)) {
                    var shapePos = shape.getAbsolutePosition();
                    shape.setAbsolutePosition(shapePos);
                    selectedGroup.add(shape);
                    // console.log('Added shape to group');
                    shape.draggable(false);
                    shapesAdded = true;
                }
            } catch (error) {
                console.error('Error processing shape:', error);
                continue;
            }
        }

        if (shapesAdded) {
            layer.add(selectedGroup);
            selectedGroup.on('dragmove', function() {
                console.log('Group dragged');
                redrawArrows();
            });
            layer.draw();
        } else {
            console.log('No shapes added to the group');
        }
    }
    function redrawArrows() {
        arrows.forEach(function(arrow) {
            var arrowPoints = arrow.points();

            // Find the parent rectangle using the stored parentUniqueId
            var parentRectId = arrow.getAttr('parentUniqueId');
            var parentRect = layer.find(node => node.getAttr('uniqueId') === parentRectId)[0];

            // Find the target (child) rectangle using the stored uniqueIdPointRect
            var targetRectId = arrow.getAttr('uniqueIdPointRect');
            var targetRect = layer.find(node => node.getAttr('uniqueId') === targetRectId)[0];

            if (parentRect && targetRect) {
                var parentRectPos = parentRect.getAbsolutePosition();
                var targetRectPos = targetRect.getAbsolutePosition();

                // Adjust the start and endpoint to the center or specific points of the rectangles
                var newStartPoint = { x: parentRectPos.x + parentRect.width() / 2, y: parentRectPos.y + parentRect.height() / 2 };
                var newEndPoint = { x: targetRectPos.x + targetRect.width() / 2, y: targetRectPos.y + targetRect.height() / 2 };

                arrow.points([newStartPoint.x, newStartPoint.y, newEndPoint.x, newEndPoint.y]);
            } else {
                console.log('Parent or target rectangle not found for arrow');
            }
        });
        layer.draw();
    }


// // 4. Implement Arrow Redrawing
//     function redrawArrows() {
//         arrows.forEach(function(arrow) {
//             var arrowPoints = arrow.points();
//             var startPoint = { x: arrowPoints[0], y: arrowPoints[1] };
//
//             // Find the target rectangle using the stored uniqueId
//             var targetRectId = arrow.getAttr('uniqueIdPointRect');
//             var targetRect = layer.find(node => node.getAttr('uniqueId') === targetRectId)[0];
//
//             if (targetRect) {
//                 var targetRectPos = targetRect.getAbsolutePosition();
//                 // Adjust the endpoint to the center or specific point of the rectangle
//                 var newEndPoint = { x: targetRectPos.x + targetRect.width() / 2, y: targetRectPos.y + targetRect.height() / 2 };
//
//                 arrow.points([startPoint.x, startPoint.y, newEndPoint.x, newEndPoint.y]);
//             } else {
//                 console.log('Target rectangle not found');
//             }
//         });
//         layer.draw();
//     }

//reset
    document.getElementById('stopGroupButton').addEventListener('click', function() {
        ungroupElements();
        resetSelectionRectangle();
    });

    function ungroupElements() {
        var groups = layer.find('Group');

        // Iterate over each group using a traditional for loop
        for (var i = groups.length - 1; i >= 0; i--) {
            var group = groups[i];
            var klassName = group.getAttr('klassName');
            if (klassName != 'elemenearltear') {
                // Temporarily store children in an array to avoid modification issues during iteration
                var children = group.children;

                // Iterate over each child of the group
                for (var j = children.length - 1; j >= 0; j--) {
                    var child = children[j];
                    var childAbsolutePosition = child.getAbsolutePosition();

                    // Add child back to the layer
                    layer.add(child);
                    child.setAbsolutePosition(childAbsolutePosition);
                    child.draggable(true); // Make individual elements draggable again
                }

                // Destroy the empty group
                group.destroy();
            }
        }

        layer.draw();
    }

    function resetSelectionRectangle() {
        selectionRectangle.visible(false);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
        layer.batchDraw();
    }

    function findShapeByUniqueId(uniqueIdToFind) {

        var foundShape = stage.findOne(function(shape) {
            return shape.getAttr('uniqueId') === uniqueIdToFind;
        });

        return foundShape;
    }

});
