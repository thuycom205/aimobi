import {
    Box,
    Typography,
    TextField,
    Button,
    ChoiceList,
    ResourcePicker,
} from '@shopify/polaris';
import React, { useState } from 'react';

// ...

const handleAddNewItem = (type) => {
    const newItem = {
        type: type,
        settings: {
            margin: '1px',
            action_type: 'none', // default action type
            collection_id: null, // default collection_id
            product_ids: [], // default product IDs
        }
    };
    setItems([...items, newItem]);
    handleDialogToggle();
};

const ItemSettingsPanel = ({ selectedItem, closePanel, updateItem }) => {
    const [showResourcePicker, setShowResourcePicker] = useState(false);

    const handleMarginChange = (event) => {
        updateItem(selectedItem.type, { ...selectedItem.settings, margin: event.target.value });
    };

    const handleActionTypeChange = (value) => {
        updateItem(selectedItem.type, { ...selectedItem.settings, action_type: value });
        if (value === 'collection' || value === 'product') {
            setShowResourcePicker(true);
        }
    };

    const handleResourceSelection = (resources) => {
        setShowResourcePicker(false);
        // Update the selectedItem with selected resources
        // This logic depends on how you want to handle the selected resources
        // For example, you might want to store collection IDs or product IDs
    };

    return (
        <Box p={2} width="250px">
            <Typography variant="h6">Item Settings</Typography>
            <TextField
                label="Margin"
                fullWidth
                margin="normal"
                value={selectedItem.settings.margin}
                onChange={handleMarginChange}
            />
            <ChoiceList
                title="Action Type"
                choices={[
                    { label: 'None', value: 'none' },
                    { label: 'Collection', value: 'collection' },
                    { label: 'Product', value: 'product' },
                    // Add more action types as required
                ]}
                selected={selectedItem.settings.action_type}
                onChange={handleActionTypeChange}
            />
            {showResourcePicker && (
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={showResourcePicker}
                    onSelection={handleResourceSelection}
                    onCancel={() => setShowResourcePicker(false)}
                />
            )}
            <Button variant="contained" onClick={closePanel}>Close</Button>
        </Box>
    );
};
