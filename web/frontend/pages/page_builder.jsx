import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppBar,ListItemIcon,ListItemText, Toolbar, Typography, Box, List, ListItem,TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import {TopBar, ActionList, Icon, Frame, Text} from '@shopify/polaris';
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


import Screen from './page_builder_sample.jsx';
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

const ItemSettingsPanel = ({ selectedItem, closePanel, updateItem }) => {
    // Handlers for updating the settings of the selected item
    const handleMarginChange = (event) => {
        updateItem(selectedItem.type, { ...selectedItem.settings, margin: event.target.value });
    };

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
            {/* Add other settings fields as required */}
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
        console.log('toggle navigation visibility');
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
    const [selectedItem, setSelectedItem] = useState(null);

    // ... (other handlers remain unchanged)

    const handleSettingsClick = (item) => {
        setSelectedItem(item);
        setSettingsPanelOpen(true);
    };

    const closeSettingsPanel = () => {
        setSettingsPanelOpen(false);
    };

    const updateItem = (itemType, updatedSettings) => {
        setItems(items.map(item => {
            if (item.type === itemType) {
                return { ...item, settings: updatedSettings };
            }
            return item;
        }));
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState('');

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
                // default settings for new item, can be customized
                margin: '1px',
                action_type: type === 'divider' ? 'none' : 'collection', // as an example
                collection_id: type === 'divider' ? null : 1, // as an example
            }
        };
        setItems([...items, newItem]);
        handleDialogToggle();
    };

    const renderDialogItem = (type) => {
        // Declare Icon variable outside the if-else scope
        let Icon;
        console.log(type);

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

// Example component for Countdown
    const CountdownComponent = () => {
        // Countdown logic goes here
        return <Typography>Countdown Timer</Typography>;
    };

// Example component for Circle of Collections
    const CircleCollectionComponent = () => {
        // Circle collection logic goes here
        return <Typography>Circle of Collections</Typography>;
    };

// ... you will need to create or define components for each of the new item types

// Then in the renderPreview function, add cases for the new item types
    const renderPreview = useCallback(() => {
        return items.map((type, index) => {
            switch (type) {
                case itemTypes.DIVIDER:
                    return <Divider key={index} />;
                case itemTypes.TITLE:
                    return <Typography key={index} variant="h5">Title</Typography>;
                case itemTypes.COUNTDOWN:
                    return <CountdownComponent key={index} />;
                // ... cases for other new types
                default:
                    return <div key={index}>Unsupported item type</div>;
            }
        });
    }, [items]);

    return (
        <Frame   topBar={topBarMarkup}>

        <DndProvider backend={HTML5Backend}>
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <Typography variant="h6" color="inherit">*/}
            {/*            Mobile App Builder*/}
            {/*        </Typography>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}

            <Box display="flex">
                <Box width="256px" bgcolor="#f0f0f0" height="100vh">
                    <List>
                        {items.map((item, index) => (
                            <DraggableListItem
                                key={index}
                                item={item}
                                index={index}
                                moveListItem={moveListItem}
                                onSettingsClick={() => handleSettingsClick(item)}
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
                        selectedItem={selectedItem}
                        closePanel={closeSettingsPanel}
                        updateItem={updateItem}
                    />
                )}
            </Drawer>
        </DndProvider>
        </Frame>
    );
}

export default App;
