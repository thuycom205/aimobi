import React, { useState, useCallback } from 'react';
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

    const handleSave = () => {
        onSave(selectedItem.id, { title, type: menuType });
        onClose();
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
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </div>
    );
};

function App() {
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
        };
        setMenuItems([...menuItems, newItem]);
    };

    return (
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
    );
}

export default App;
