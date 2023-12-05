import React, { useState, useCallback ,useEffect} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
// Import additional icons for different menu types
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WebIcon from '@mui/icons-material/Web';
import CollectionIcon from '@mui/icons-material/Collections';

import ScreenMenu from './screen_for_menu_builder';
import MenuIcon from "@mui/icons-material/Menu";
import {Page,Frame,Toast,Tooltip} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Link,Paper } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ITEM_TYPE = 'MENU_ITEM';
const menuTypeIcons = {
    home: HomeIcon,
    cart: ShoppingCartIcon,
    notification: NotificationsIcon,
    account: AccountCircleIcon,
    setting: SettingsIcon,
    web_url: WebIcon,
    collection: CollectionIcon,
};
const DraggableMenuItem = ({ id, text,type, index, moveMenuItem, onSettingsClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, index]);
    let Icon;
    if (type && menuTypeIcons[type]) {
        Icon = menuTypeIcons[type];
        console.log(menuTypeIcons);
        console.log(menuTypeIcons[type]);
    } else {
        Icon = MenuIcon;
    }
    const [, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (item.index !== index) {
                moveMenuItem(item.index, index);
                item.index = index;
            }
        },
    }), [index, moveMenuItem]);

    return (
        <ListItem
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            secondaryAction={
                <IconButton edge="end" onClick={() => onSettingsClick(id)}>
                    <SettingsIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};

const MenuSettingsPanel = ({ selectedItem, onSave, onClose }) => {
    const [title, setTitle] = useState(selectedItem.title);
    const [menuType, setMenuType] = useState(selectedItem.type);
    const [webUrl, setWebUrl] = useState(selectedItem.web_url || '');
    const [collectionInfo, setCollectionInfo] = useState(selectedItem.collection_info || []);
    const [showResourcePicker, setShowResourcePicker] = useState(false);

    const handleSave = () => {
        onSave(selectedItem.id, { title, type: menuType, web_url : webUrl, collection_info: collectionInfo });
        onClose();
    };
    const handleWebUrlChange = (event) => {
        setWebUrl(event.target.value);
        onSave(selectedItem.id, { title, type: menuType, web_url : webUrl, collection_info: collectionInfo });

    };
    const handleResourceSelection = (resources) => {
        setShowResourcePicker(false);
        const selectedCollection = resources.selection[0]; // Assuming single selection
        setCollectionInfo([{ id: selectedCollection.id, title: selectedCollection.title, handle: selectedCollection.handle }]);
        onSave(selectedItem.id, { title, type: menuType, web_url : webUrl, collection_info: collectionInfo });

    };
    // Function to render the table
    const renderTable = () => {
        if (collectionInfo.length === 0) return null; // Return null if collectionInfo is empty

        return (
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
                                    <a href={'https://' + window.shop_name+ `/collections/${info.handle}`} target="_blank" rel="noopener noreferrer">View</a>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteCollection(info.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    // Function to handle collection deletion
    const handleDeleteCollection = (collectionId) => {
        const updatedCollectionInfo = collectionInfo.filter(info => info.id !== collectionId);
        setCollectionInfo(updatedCollectionInfo);
        onSave(selectedItem.id, { title, type: menuType, web_url : webUrl, collection_info: updatedCollectionInfo });

    };

    const handleOpenResourcePicker = () => {
        setShowResourcePicker(true);
    }

    return (
        <Box p={2}>

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
            {menuType === 'web_url' && (
                <TextField
                    label="Web URL"
                    fullWidth
                    margin="normal"
                    value={webUrl}
                    onChange={handleWebUrlChange}
                />
            )}
            {menuType === 'collection' && (
                <>
                   <Box mt={2}>
                    <Button variant="contained" onClick={handleOpenResourcePicker}>Browse</Button>
                    </Box>
                    {renderTable()}
                </>
            )}
            {showResourcePicker && (
                <ResourcePicker
                    resourceType="Collection"
                    open={showResourcePicker}
                    onSelection={handleResourceSelection}
                    onCancel={() => setShowResourcePicker(false)}
                />
            )}
            <Box mt={2}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            </Box>
        </Box>
    );
};

function App() {
    const [menuId, setMenuId] = useState(0);
    const [menuTitle, setMenuTitle] = useState('Untitled');
    const [menuType, setMenuType] = useState('drawer');

    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
    const [isScreenDrawerOpen, setScreenDrawerOpen] = useState(false);
    // Function to toggle the Screen's drawer
    const toggleScreenDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setScreenDrawerOpen(open);
    };
    const moveMenuItem = useCallback((dragIndex, hoverIndex) => {
        const dragItem = menuItems[dragIndex];
        const updatedMenuItems = [...menuItems];
        updatedMenuItems.splice(dragIndex, 1);
        updatedMenuItems.splice(hoverIndex, 0, dragItem);
        setMenuItems(updatedMenuItems);
    }, [menuItems]);

    const handleSettingsClick = (itemId) => {
        const item = menuItems.find((item) => item.id === itemId);
        setSelectedItem(item);
        setSettingsPanelOpen(true);
    };

    const handleSaveSettings = (itemId, updatedFields) => {
        const updatedMenuItems = menuItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, ...updatedFields };
            }
            return item;
        });
        setMenuItems(updatedMenuItems);
    };

    const addMenuItem = () => {
        const newItem = {
            id: Math.random(), // or any other unique id
            title: 'New Item',
            type: 'home', // default menu type
            web_url: '',
            collection_info: []
        };
        setMenuItems([...menuItems, newItem]);
    };
    const handleSubmit = async () => {
        const menuItemsJson = JSON.stringify(menuItems);

        const payload = {
            id: menuId,
            shop_name: window.shop_name, // Replace with actual shop name
            title: menuTitle,
            menu_type: menuType,
            menu_items: menuItemsJson
        };

        try {
            const url = window.dev_server + '/api/mobile_menu/save';
            const response = await fetch(url, {
                method: 'POST', // Use 'PUT' if updating an existing menu
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Menu saved successfully:', data);
            // Optionally, show a success message to the user
        } catch (error) {
            console.error('Failed to save menu:', error);
            // Optionally, show an error message to the user
        }
    };

    useEffect(() => {
        const fetchMenuData = async (id) => {
            try {
                let url = window.dev_server + `/api/mobile_menu/fetch?shop=` + window.shop_name;
                if (id >  0) {
                    url = window.dev_server + `/api/mobile_menu/fetch?id=${id}&shop=` + window.shop_name;
                }
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers like authorization if needed
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMenuTitle(data.title);
                setMenuType(data.menu_type);
                if (data.menu_items) {
                    const itemsArray = JSON.parse(data.menu_items);
                    setMenuItems(itemsArray);
                }
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');
        if (idFromUrl) {
            setMenuId(idFromUrl);
            fetchMenuData(idFromUrl);
        } else {
            fetchMenuData(0);
        }
    }, []);
    const navigate = useNavigate();

    return (
        <Frame>
            <Page fullWidth title="Page Builder"
                  primaryAction={{
                      content: 'Save',
                      onAction: () => {
                          handleSubmit() // Close the modal after adding the element
                      },
                  }}
                  secondaryActions={[
                      {   content: 'Back to Home',
                          onAction: () => {
                          navigate('/') // Close the modal after adding the element
                              // handleAddElement(optionTypeSelected);
                              // toggleModal(); // Close the modal after adding the element
                          },
                      },
                  ]}

                  separator>
        <DndProvider backend={HTML5Backend}>
            <Box display="flex">
                <Box width="256px" bgcolor="#f0f0f0" height="100vh" overflow="auto">
                    <Button onClick={addMenuItem}>Add Menu Item</Button>
                    <List>
                        {menuItems.map((item, index) => (
                            <DraggableMenuItem
                                key={item.id}
                                id={item.id}
                                text={item.title}
                                type={item.type}
                                index={index}
                                moveMenuItem={moveMenuItem}
                                onSettingsClick={handleSettingsClick}
                            />
                        ))}
                    </List>
                    <Drawer
                        anchor="right"
                        open={settingsPanelOpen}
                        onClose={() => setSettingsPanelOpen(false)}
                    >
                        {selectedItem && (
                            <MenuSettingsPanel
                                selectedItem={selectedItem}
                                onSave={handleSaveSettings}
                                onClose={() => setSettingsPanelOpen(false)}
                            />
                        )}
                    </Drawer>
                </Box>
                <ScreenMenu menuItems={menuItems} toggleDrawerz={toggleScreenDrawer} drawerOpenz={isScreenDrawerOpen} />
            </Box>
        </DndProvider>
            </Page>
        </Frame>
    );
}

export default App;
