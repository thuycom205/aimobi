// ... (existing imports and definitions)

const MenuSettingsPanel = ({ selectedItem, onSave, onClose }) => {
    const [title, setTitle] = useState(selectedItem.title);
    const [menuType, setMenuType] = useState(selectedItem.type);
    const [collectionInfo, setCollectionInfo] = useState(selectedItem.collection_info || []);

    const handleSave = () => {
        onSave(selectedItem.id, { title, type: menuType, collection_info: collectionInfo });
        onClose();
    };

    const handleOpenResourcePicker = () => {
        // Logic to open Resource Picker
    };

    const handleResourceSelection = (resources) => {
        const selectedCollection = resources.selection[0]; // Assuming single selection
        setCollectionInfo([{ id: selectedCollection.id, title: selectedCollection.title, handle: selectedCollection.handle }]);
    };

    const handleDeleteCollection = (collectionId) => {
        setCollectionInfo(collectionInfo.filter(info => info.id !== collectionId));
    };

    return (
        <div>
            <Typography variant="h6">Menu Item Settings</Typography>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* Dropdown to select menu item type */}
            <TextField
                select
                label="Menu Type"
                fullWidth
                margin="normal"
                value={menuType}
                onChange={(e) => setMenuType(e.target.value)}
                SelectProps={{
                    native: true,
                }}
            >
                {Object.keys(menuTypeIcons).map((type) => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </TextField>
            {menuType === 'collection' && (
                <>
                    <Button variant="contained" onClick={handleOpenResourcePicker}>Browse</Button>
                    {collectionInfo.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>View</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {collectionInfo.map((info) => (
                                        <TableRow key={info.id}>
                                            <TableCell>{info.title}</TableCell>
                                            <TableCell>
                                                <a href={`/collections/${info.handle}`} target="_blank">View</a>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteCollection(info.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </div>
    );
};

const addMenuItem = () => {
    const newItem = {
        id: Math.random(),
        title: 'New Item',
        type: 'home',
        collection_info: []
    };
    setMenuItems([...menuItems, newItem]);
};

// ... (rest of the App component including ResourcePicker logic)

