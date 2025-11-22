import { Drawer, Box, CssBaseline, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link, Outlet } from 'react-router';

const drawerWidth = 300;

const pages = [
    {
        name: "Inicio",
        icon: <HomeIcon />,
        url: "/"
    },
    {
        name: "Perfil",
        icon: <AccountCircleIcon />,
        url: "/profile"
    },
    {
        name: "Categorías",
        icon: <CategoryIcon />,
        url: "/categories"
    },
    {
        name: "Cuestionarios",
        icon: <QuizIcon />,
        url: "/quizzes"
    }
];

export const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    zIndex: 2
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {pages.map((page, index) => (
                            <ListItem key={index} disablePadding>
                                <Link to={page.url} className='w-full'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {page.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={page.name} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <div>
                    <div className='m-5 py-8 px-30 border border-gray-300 shadow-xl rounded-2xl'>
                        <Outlet />
                    </div>
                </div>
            </Box>
        </Box>
    );
}
