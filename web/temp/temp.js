const ItemSettingsPanel = ({ selectedItem, selectedIndex, closePanel, updateItem }) => {
    const [localSettings, setLocalSettings] = useState(selectedItem.settings);

    useEffect(() => {
        setLocalSettings(selectedItem.settings);
    }, [selectedItem]);

    const handleMarginChange = (event) => {
        const updatedSettings = { ...localSettings, margin: event.target.value };
        setLocalSettings(updatedSettings);
        updateItem(selectedIndex, updatedSettings);
    };

    const handleActionTypeChange = (value) => {
        const newActionType = value[0];
        const updatedSettings = { ...localSettings, action_type: newActionType };
        setLocalSettings(updatedSettings);
        updateItem(selectedIndex, updatedSettings);
    };

    const handleWebUrlChange = (event) => {
        const updatedSettings = { ...localSettings, web_url: event.target.value };
        setLocalSettings(updatedSettings);
        updateItem(selectedIndex, updatedSettings);
    };

    const handleResourceSelection = (resources) => {
        setShowResourcePicker(false);
        const selectedResources = resources.selection.map(({ id, title, handle }) => ({ id, title, handle }));

        let updatedSettings;
        if (localSettings.action_type === 'collection') {
            updatedSettings = { ...localSettings, collection_action: selectedResources };
        } else if (localSettings.action_type === 'product') {
            updatedSettings = { ...localSettings, product_action: selectedResources };
        }

        setLocalSettings(updatedSettings);
        updateItem(selectedIndex, updatedSettings);
    };

    const handleDeleteResource = (resourceId) => {
        const actionKey = localSettings.action_type === 'collection' ? 'collection_action' : 'product_action';
        const updatedResources = localSettings[actionKey].filter(resource => resource.id !== resourceId);
        const updatedSettings = { ...localSettings, [actionKey]: updatedResources };
        setLocalSettings(updatedSettings);
        updateItem(selectedIndex, updatedSettings);
    };

    const renderResourceTable = (resources) => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Handle</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources.map((resource) => (
                            <TableRow key={resource.id}>
                                <TableCell>{resource.id}</TableCell>
                                <TableCell>{resource.title}</TableCell>
                                <TableCell>{resource.handle}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteResource(resource.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box p={2} width="250px">
            {/* ... existing fields */}
            {/* Render tables for collection_action and product_action if they exist */}
            {localSettings.collection_action && renderResourceTable(localSettings.collection_action)}
            {localSettings.product_action && renderResourceTable(localSettings.product_action)}
        </Box>
    );
};
