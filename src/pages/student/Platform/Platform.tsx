import { Drawer, Box, CssBaseline, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';

import { Link, Outlet } from 'react-router';
import { useFetchCategories } from '../../../features/Category/ui/hooks';

const drawerWidth = 300;

export const Platform = () => {

    const { data } = useFetchCategories();

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
                        <ListItem disablePadding>
                            <Link to={"/"} className='w-full'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Exámenes" />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        {
                            data ?
                                data.map((category, index) => (
                                    <ListItem key={index} disablePadding>
                                        <Link to={`/platform-exam/${category.id}/${category.title}`} className='w-full'>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <QuizIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={category.title} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                )) :
                                undefined
                        }
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <div>
                    <Outlet />
                </div>
            </Box>
        </Box>
    );
}
