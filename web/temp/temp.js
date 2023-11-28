// Import additional icons for different menu types
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WebIcon from '@mui/icons-material/Web';
import CollectionIcon from '@mui/icons-material/Collections';

// ...

// Update your menu item types to include icons for easy identification
const menuTypeIcons = {
    home: HomeIcon,
    cart: ShoppingCartIcon,
    notification: NotificationsIcon,
    account: AccountCircleIcon,
    setting: SettingsIcon,
    web_url: WebIcon,
    collection: CollectionIcon,
};

// ...

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

// ...

const addMenuItem = () => {
    const newItem = {
        id: Math.random(), // or any other unique id
        title: 'New Item',
        type: 'home', // default menu type
    };
    setMenuItems([...menuItems, newItem]);
};

// ...

// In your DraggableMenuItem, use the correct icon for the menu type
const DraggableMenuItem = ({ id, text, type, index, moveMenuItem, onSettingsClick }) => {
    // ...
    const MenuIcon = menuTypeIcons[type] || DefaultIcon; // Use the icon from menuTypeIcons

    return (
        <ListItem
            // ...
        >
            <ListItemIcon>
                <MenuIcon /> {/* Use the specific icon for the menu type */}
            </ListItemIcon>
            {/* ... */}
        </ListItem>
    );
};

// ...
