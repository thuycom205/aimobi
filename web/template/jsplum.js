   function jsplum() {
       var selectedOption = null;
       jsPlumb.ready(function () {
           var instance = jsPlumb.getInstance({
               // jsPlumb settings
               Container: "jsplumb-container"
           });

           // Make options draggable
           var quizOptions = document.querySelectorAll('.quiz-option');
           quizOptions.forEach(function(option) {
               instance.draggable(option.id);
           });

           // Handle circle click
           // document.querySelectorAll('.select-circle').forEach(function(circle) {
           //     circle.addEventListener('click', function() {
           //         selectedOption = this.getAttribute('data-option');
           //         document.getElementById('sidebar').style.display = 'block';
           //     });
           // });

           document.addEventListener('click', function(event) {
               if (event.target.classList.contains('select-circle')) {
                   // Reset all circles to blue
                   document.querySelectorAll('.select-circle').forEach(function(circle) {
                       circle.style.backgroundColor = 'blue';
                   });

                   // Change the clicked circle to red and set it as selected
                   event.target.style.backgroundColor = 'red';
                   document.getElementById('sidebar').style.display = 'block';
                   selectedOption = event.target.parentElement.id;
                   console.log(selectedOption);// Assuming the circle is a direct child of the option element
               }
           });

           // Handle adding new options
           document.getElementById('add-options').addEventListener('click', function() {
               var num = parseInt(document.getElementById('number-input').value || 0);
               addNewOptions(num, selectedOption);
           });
       });

       function addNewOptions(num) {
           if (!num ) return;

           var parentOption = document.getElementById(selectedOption);
           var parentPos = parentOption.getBoundingClientRect();
           var verticalSpacing = 100; // Vertical distance between parent and children
           var horizontalSpacing = 50; // Horizontal space between child nodes

           // Function to get the starting x-position of the first child
           function getFirstChildPosition(numChildren, parentX) {
               if (numChildren === 1) return parentX;
               return parentX - (horizontalSpacing * (numChildren - 1)) / 2;
           }

           var firstChildX = getFirstChildPosition(num, parentPos.left);
           var childY = parentPos.bottom + verticalSpacing;

           for (var i = 0; i < num; i++) {
               var childX = firstChildX + i * horizontalSpacing;

               var newOption = document.createElement('div');
               newOption.className = 'quiz-option';
               var nextOptionId = document.querySelectorAll('.quiz-option').length + 1;
               newOption.id = 'option-' + nextOptionId;
               newOption.innerHTML = 'Option ' + nextOptionId +
                   '<div class="select-circle" data-option="' + nextOptionId + '"></div>';
               newOption.style.left = childX + 'px';
               newOption.style.top = childY + 'px';
               newOption.dataset.type = 'select';
               newOption.dataset.name = 'unnamed';
               newOption.dataset.label = 'Option ' + nextOptionId ;

               document.getElementById('jsplumb-container').appendChild(newOption);

               jsPlumb.draggable(newOption.id, {
                   drag: function(event) {
                       jsPlumb.repaint(newOption.id);
                   }
               });

               jsPlumb.connect({
                   source: parentOption.id,
                   target: newOption.id,
                   anchors: ["AutoDefault", "AutoDefault"],
                   connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
                   paintStyle: { stroke: "#5c96bc", strokeWidth: 2 },
                   endpoint: "Blank",
                   overlays: [
                       ["Arrow", { width: 12, length: 12, location: 1 }]
                   ]
               });


               nextOptionId++;
           }
       }


       document.getElementById('change-title-btn').addEventListener('click', function() {
           var newTitle = document.getElementById('title').value;
           var parentOption = document.getElementById(selectedOption);

           if (parentOption && newTitle) {
               // Change the text of the parent element of the selected circle
               // parentOption.textContent = newTitle;
               parentOption.innerHTML = newTitle +
                   '<div class="select-circle" data-option="' + parentOption.id + '"></div>';

               parentOption.dataset.label = newTitle ;
               // If the parent has other child elements, you might need to specifically target where the title should go
           }
       });
       document.getElementById('sumbit').addEventListener('click', function() {
           submit();
       });

       function submit() {
           var nodes = document.querySelectorAll('.quiz-option'); // Adjust the selector to match your nodes
           var nodeData = [];

           nodes.forEach(function(node) {
               nodeData.push({
                   id: node.id,
                   type: node.getAttribute('data-type'), // Example: You might have a data attribute specifying the type
                   position: {
                       x: node.offsetLeft,
                       y: node.offsetTop
                   },
                   type: node.dataset.type, // Retrieve the custom property
                   name: node.dataset.name, // Retrieve the custom property
                   label: node.dataset.label // Retrieve the custom property
                   // Add other relevant node properties here
               });
           });
           var connections = jsPlumb.getAllConnections();
           var connectionData = connections.map(function(conn) {
               return {
                   sourceId: conn.sourceId,
                   targetId: conn.targetId
                   // Add other relevant connection properties here
               };
           });
           var mapData = {
               nodes: nodeData,
               connections: connectionData
           };
           var jsonMapData = JSON.stringify(mapData);
            console.log(jsonMapData);
       }
   }

   //Connected
   var connectMode = false;
  var selectedNode = null;
   document.addEventListener('click', function(event) {
       if (event.target.classList.contains('select-circle')) {
           // Logic for selecting a node (change to red as selected)
           if (!connectMode) {
               if (selectedNode) {
                   selectedNode.querySelector('.select-circle').style.backgroundColor = 'blue';
               }
               event.target.style.backgroundColor = 'red';
               selectedNode = event.target.parentElement;
           }

           // Logic for connecting nodes
           if (connectMode && selectedNode) {
               var targetNode = event.target.parentElement;
               jsPlumb.connect({
                   source: selectedNode.id,
                   target: targetNode.id,
                   anchors: ["AutoDefault", "AutoDefault"],
                   connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
                   paintStyle: { stroke: "#5c96bc", strokeWidth: 2 },
                   endpoint: "Blank",
                   overlays: [
                       ["Arrow", { width: 12, length: 12, location: 1 }]
                   ]
                   // Define your connector and painting styles here
               });
               connectMode = false; // Exit connect mode after making a connection
               document.getElementById('connect-btn').textContent = 'Connect';
           }
       }
   });
//end connected

   //match node to field
   document.getElementById('match-field-btn').addEventListener('click', function() {
       var selectedField = document.getElementById('field-selector').value;
       var selectedFieldLabel = document.getElementById('field-selector').selectedOptions[0].text;

       console.log(selectedField);
       //var selectedNode = document.querySelector('.node-selected'); // Assuming selected nodes have this class
       // selectedNode
       if (selectedNode) {
           // Set the text of the selected node to the label of the selected field
           // selectedNode.textContent = selectedFieldLabel;
           selectedNode.dataset.type = 'select';
           selectedNode.dataset.name = 'unnamed';
           selectedNode.dataset.label = selectedFieldLabel;
           selectedNode.innerHTML = selectedFieldLabel +
               '<div class="select-circle" data-option="' + selectedNode.id + '"></div>';
           // Remove existing children of the selected node
           var existingConnections = jsPlumb.getConnections({ source: selectedNode.id });
           existingConnections.forEach(function(connection) {
               jsPlumb.deleteConnection(connection);
               document.getElementById(connection.targetId).remove();
           });

           var fieldOptions = getFieldOptions(selectedField);
           // var parentOption = document.getElementById(selectedNode);
           var parentOption = selectedNode;

           fieldOptions.forEach(function(option, index) {
               // Create a new div element for each option
               var childNode = document.createElement('div');
               childNode.id = 'child-node-' + option.value; // Assign a unique ID
               childNode.className = 'quiz-option';
               // childNode.textContent = option.label; // Set the label text
               childNode.innerHTML = option.label +
                   '<div class="select-circle" data-option="' + 'child-node-' + option.value + '"></div>';               childNode.dataset.type = 'option';
               childNode.dataset.name = option.value;
               childNode.dataset.value = option.value;
               childNode.dataset.label = option.label;
               // Position the child node (example: below the parent node)
               childNode.style.position = 'absolute';
               childNode.style.top = (parentOption.offsetTop + 50 * (index + 1)) + 'px';
               childNode.style.left = (parentOption.offsetLeft + 100) + 'px';

               // Append the child node to the container
               document.getElementById('jsplumb-container').appendChild(childNode);
               jsPlumb.draggable(childNode.id, {
                   drag: function(event) {
                       jsPlumb.repaint(childNode.id);
                   }
               });
               // Connect the child node to the parent node using jsPlumb
               jsPlumb.connect({
                   source: parentOption.id,
                   target: childNode.id,
                   anchors: ["AutoDefault", "AutoDefault"],
                   connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
                   paintStyle: { stroke: "#5c96bc", strokeWidth: 2 },
                   endpoint: "Blank",
                   overlays: [
                       ["Arrow", { width: 12, length: 12, location: 1 }]
                   ]
                   // Define the connector and painting styles
               });
           });

       }
   });

   function getFieldOptions(field) {
       var fieldOptionsData = {
           field1: [
               { label: 'Option 1', value: 'opt1' },
               { label: 'Option 2', value: 'opt2' }
               // More options for field1...
           ],
           field2: [
               { label: 'Option A', value: 'optA' },
               { label: 'Option B', value: 'optB' }
               // More options for field2...
           ]
           // Define options for other fields...
       };
       return fieldOptionsData[field] || [];

       // Implement logic to retrieve options based on the field
       // This might involve fetching data from a server or using a predefined object
       // Return an array of options (e.g., [{ label: 'Option 1', value: 'opt1' }, ...])
   }

   document.querySelectorAll('.quiz-option').forEach(function(node) {
       node.addEventListener('click', function() {
           // Deselect any previously selected node
           var previouslySelected = document.querySelector('.node-selected');
           if (previouslySelected) {
               previouslySelected.classList.remove('node-selected');
           }

           // Select this node
           this.classList.add('node-selected');
       });
   });

   //end match node to field

   document.getElementById('connect-btn').addEventListener('click', function() {
       connectMode = !connectMode;

       if (connectMode) {
           // Maybe change the button appearance to indicate it's in connect mode
           this.textContent = 'Connecting...';
       } else {
           this.textContent = 'Connect';
       }
   });

   document.addEventListener('DOMContentLoaded', function() {
         jsplum();
    });
