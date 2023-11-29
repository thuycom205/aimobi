const updateItem = (index, updatedSettings) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems[index];
    updatedItems[index] = { ...itemToUpdate, settings: updatedSettings };
    setItems(updatedItems);
};

// Modify handleSettingsClick to pass the index of the item instead of the item itself
const handleSettingsClick = (index) => {
    const item = items[index];
    setSelectedItem({ item, index });
    setSettingsPanelOpen(true);
};

// Modify ItemSettingsPanel to receive index and pass it to updateItem
const ItemSettingsPanel = ({ selectedItem, selectedIndex, closePanel, updateItem }) => {
    // ... existing code ...

    // Use selectedIndex to update the specific item
    const handleMarginChange = (event) => {
        updateItem(selectedIndex, { ...selectedItem.settings, margin: event.target.value });
    };

    // ... remaining code ...
};

// In DraggableListItem, pass the index to onSettingsClick
<DraggableListItem
    // ... other props ...
    onSettingsClick={() => handleSettingsClick(index)}
/>

// In App component, pass both item and index to selectedItem state
setSelectedItem({ item, index });
