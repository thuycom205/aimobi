import React, { useState, useCallback,useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppBar,ListItemIcon,ListItemText, Toolbar, Typography, Box, List, ListItem,TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import {TopBar, ActionList,Toast, Icon, Frame, Text,ChoiceList} from '@shopify/polaris';
import {ArrowLeftMinor, QuestionMarkMajor} from '@shopify/polaris-icons';
import './App.css'; // Make sure to include the CSS file for additional styling
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import a default icon
import  {HomeMinor, ProductsMinor} from '@shopify/polaris-icons';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import CategoryIcon from '@mui/icons-material/Category';
import CollectionsIcon from '@mui/icons-material/Collections';
import CloseIcon from '@mui/icons-material/Close';
import DefaultIcon from '@mui/icons-material/HelpOutline'; // An example default icon
import GridViewIcon from '@mui/icons-material/GridView';
import AppsIcon from '@mui/icons-material/Apps';
import VideocamIcon from '@mui/icons-material/Videocam';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ArticleIcon from '@mui/icons-material/Article';

import SearchIcon from '@mui/icons-material/Search';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import {Page} from '@shopify/polaris';


import Screen from './page_builder_sample.jsx';
import { ResourcePicker } from '@shopify/app-bridge-react';

const ITEM_TYPE = 'ITEM';
const carouselItems = [
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/459619/item/goods_28_459619.jpg', label: 'First Image' },
    { imgPath: 'https://store.magenest.com/media/catalog/product/cache/89102d6fa633619c7b22b3c3bf72a502/screenshot/0/8/08-choose_wrapper.png', label: 'Second Image' },
    { imgPath: 'https://store.magenest.com/media/catalog/product/cache/89102d6fa633619c7b22b3c3bf72a502/screenshot/0/9/09-message.png', label: 'Third Image' },
];

const itemTypes = {
    divider: 'divider',
    title: 'title',
    countdown: 'countdown',
    circle_collection: 'circle_collection',
    circle_products: 'circle_products',
    gallery_products: 'gallery_products',
    carousel_collection: 'carousel_collection',
    carousel_products: 'carousel_products',
    image: 'image',
    video: 'video',
    grid_product: 'grid_product',
    grid_collection: 'grid_collection',
    discount: 'discount',
    loyalty: 'loyalty',
    recent_viewed: 'recent_viewed',
    // ... other types
};



const itemIcons = {
    divider: HorizontalRuleIcon,
    title: TitleIcon,
    countdown: AccessTimeIcon,
    circle_collection: CollectionsIcon, // Example, you might want to use a different icon
    circle_products: CategoryIcon, // Example, you might want to use a different icon
    gallery_products: GridViewIcon,
    carousel_collection: ViewCarouselIcon,
    carousel_products: SlideshowIcon,
    image: ImageIcon,
    video: VideocamIcon,
    grid_product: GridViewIcon,
    grid_collection: AppsIcon,
    discount: LocalOfferIcon,
    loyalty: LoyaltyIcon,
    recent_viewed: HistoryIcon,
    default: HelpOutlineIcon, // Default key also in lowercase

    // ... other types
};

const DraggableListItem = ({ item, index, moveListItem, onSettingsClick }) => {
    // Destructure the needed properties from the item object
    const { type, settings } = item;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { type, index }, // Pass the type and index as part of the item
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [type, index]);

    const [, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (item.index !== index) {
                moveListItem(item.index, index);
                item.index = index;
            }
        },
    }), [index, moveListItem]);
    const Icon = itemIcons[type] || itemIcons['default'];

    return (
        <ListItem
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            button
        >
            <ListItemIcon>
                <Icon style={{ marginRight: '10px' }} />
            </ListItemIcon>
            <ListItemText primary={type} secondary={`Margin: ${settings.margin}`} />
            <IconButton edge="end" onClick={() => onSettingsClick(item)}>
                <SettingsIcon />
            </IconButton>
        </ListItem>
    );
};

const ItemSettingsPanel = ({ selectedItem,selectedIndex, closePanel, updateItem }) => {
    const [localSettings, setLocalSettings] = useState(selectedItem.settings);

    const [showResourcePicker, setShowResourcePicker] = useState(false);

    // Handlers for updating the settings of the selected item
    const handleMarginChange = (event) => {
        updateItem(selectedIndex, { ...selectedItem.settings, margin: event.target.value });
    };
    useEffect(() => {
        // Update local state when selectedItem changes
        setLocalSettings(selectedItem.settings);
    }, [selectedItem,localSettings]);

    // Update local state and then update the item
    const handleActionTypeChange = (value) => {
        const newActionType = value[0];
        const updatedSettings = { ...localSettings, action_type: newActionType };
        updateItem(selectedIndex, updatedSettings);
        setLocalSettings(updatedSettings);
    };

    const handleWebUrlChange = (event) => {
        updateItem(selectedIndex, { ...selectedItem.settings, web_url: event.target.value });
    };

    const handleResourceSelection = (resources) => {
        setShowResourcePicker(false);
        // Assuming resources return IDs, update the item with selected resource IDs
        const updatedSettings = resources.selection.map(r => r.id);
        updateItem(selectedIndex, { ...selectedItem.settings, resource_ids: updatedSettings });
    };

    const handleShowResourcePicker = () => {
        console.log(selectedIndex);
    }
    // ...

    return (
        <Box p={2} width="250px">
            <Typography variant="h6">Item Settings</Typography>
            <TextField
                label="Margin"
                fullWidth
                margin="normal"
                value={selectedItem.settings.margin}
                onChange={handleMarginChange}
                // You can add more settings fields as needed
            />
            <ChoiceList
                title="Action Type"
                choices={[
                    { label: 'None', value: 'none' },
                    { label: 'Collection', value: 'collection' },
                    { label: 'Product', value: 'product' },
                    { label: 'Web URL', value: 'web_url' },

                    // Add more action types as required
                ]}
                selected={localSettings.action_type}
                onChange={handleActionTypeChange}
            />
            {(selectedItem.settings.action_type === 'collection' || selectedItem.settings.action_type === 'product') && (
                <Button variant="contained" onClick={handleShowResourcePicker}>Browse</Button>
            )}
            {selectedItem.settings.action_type === 'web_url' && (
                <TextField
                    label="Web URL"
                    fullWidth
                    margin="normal"
                    value={selectedItem.settings.web_url}
                    onChange={handleWebUrlChange}
                />
            )}
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


function App() {
    // ...
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

    const toggleIsSecondaryMenuOpen = useCallback(
        () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
        [],
    );



    const handleNavigationToggle = useCallback(() => {
    }, []);
    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{content: 'Home'}],
                },
                {
                    items: [{content: 'Page Builder'}],
                },
                {
                    items: [{content: 'Menu Builder'}],
                },
                // ... Add more sections here
            ]}
            name="Mobile App builder"
            detail="Click here for main menu"
            initials="Menu"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    const secondaryMenuMarkup = (
        <TopBar.Menu
            activatorContent={
                <span>
        <Icon source={QuestionMarkMajor} />
        <Text as="span" visuallyHidden>
          Secondary menu
        </Text>
      </span>
            }
            open={isSecondaryMenuOpen}
            onOpen={toggleIsSecondaryMenuOpen}
            onClose={toggleIsSecondaryMenuOpen}
            actions={[
                {
                    items: [{content: 'Notification'}],
                },
                {
                    items: [{content: 'Branding'}],
                },
                {
                    items: [{content: 'Submission'}],
                },
                // ... Add more sections here
            ]}
        />
    );

// ...
    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}

            onNavigationToggle={handleNavigationToggle}
        />
    );
    const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ item: null, index: -1 });

// When an item's settings icon is clicked
    const handleSettingsClick = (item, index) => {
        setSelectedItem({ item, index });
        setSettingsPanelOpen(true);
    };

    const closeSettingsPanel = () => {
        setSettingsPanelOpen(false);
    };

    const updateItem = (index, updatedSettings) => {
        const updatedItems = [...items];
        const itemToUpdate = updatedItems[index];
        updatedItems[index] = { ...itemToUpdate, settings: updatedSettings };
        setItems(updatedItems);
        setSelectedItem({ item: updatedItems[index], index });

    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState('');
    const handleSubmit = () => {
        console.log(items);
    }

    const moveListItem = useCallback((dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        const updatedItems = [...items];
        updatedItems.splice(dragIndex, 1);
        updatedItems.splice(hoverIndex, 0, dragItem);
        setItems(updatedItems);
    }, [items]);

    const handleDialogToggle = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleAddNewItem = (type) => {
        const newItem = {
            type: type,
            settings: {
                margin: '1px',
                action_type: 'none', // default action type
                collection_id: null, // default collection_id
                product_ids: [],
                web_url: '' // default web URL
            }
        };
        setItems([...items, newItem]);
        handleDialogToggle();
    };

    const renderDialogItem = (type) => {
        // Declare Icon variable outside the if-else scope
        let Icon;

        // Assign the appropriate icon or default to the Icon variable
        if (itemIcons[type] === undefined) {
            Icon = DefaultIcon;
        } else {
            Icon = itemIcons[type];
        }

        return (
            <Grid item xs={6} key={type}>
                <Paper
                    style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => handleAddNewItem(type)}
                >
                    {/* Use the Icon variable here */}
                    <Icon style={{ fontSize: '40px' }} />
                    <Typography>{type}</Typography>
                </Paper>
            </Grid>
        );
    };



    return (
        <Frame   topBar={topBarMarkup}>
            <Page title="Page Builder"
                  primaryAction={{
                      content: 'Save',
                      onAction: () => {
                         handleSubmit() // Close the modal after adding the element
                      },
                  }}
                    secondaryActions={[
                        {   content: 'Back to Home',
                            onAction: () => {
                               // handleAddElement(optionTypeSelected);
                               // toggleModal(); // Close the modal after adding the element
                            },
                        },
                        ]}

                  separator>

        <DndProvider backend={HTML5Backend}>

            <Box display="flex">
                <Box width="256px" bgcolor="#f0f0f0" height="100vh">
                    <List>
                        {items.map((item, index) => (
                            <DraggableListItem
                                key={index}
                                item={item}
                                index={index}
                                moveListItem={moveListItem}
                                onSettingsClick={() => handleSettingsClick(item,index)}
                            />
                        ))}
                        <ListItem button onClick={handleDialogToggle}>
                            <AddIcon />
                            <Typography>Add Item</Typography>
                        </ListItem>
                    </List>
                </Box>
                {/* Use the Screen component */}
                <Screen items={items} />
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogToggle} maxWidth="md">
                <DialogTitle>Select an Item to Add</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {Object.values(itemTypes).map(renderDialogItem)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogToggle} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Drawer for item settings */}
            <Drawer
                anchor="right"
                open={settingsPanelOpen}
                onClose={closeSettingsPanel}
            >
                {selectedItem && (
                    <ItemSettingsPanel
                        selectedItem={selectedItem.item}
                        selectedIndex={selectedItem.index}
                        closePanel={closeSettingsPanel}
                        updateItem={updateItem}
                    />
                )}
            </Drawer>
        </DndProvider>
            </Page>
        </Frame>
    );
}

export default App;
