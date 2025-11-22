import { useState, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'
import type { RootState } from '../../app/store';
import { Button, Box, AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Link } from 'react-router';
import { useLogout } from '../../features/User/ui/hooks';
import { removeExam } from '../../features/Exam/slices/examSlice';

export const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { logout, isLoading } = useLogout();

    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();


    const handleLogout = () => {
        handleCloseUserMenu();
        Swal.fire({
            title: "Cerrar Sesión",
            text: "¿Está seguro de que quiere cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, cerrar sesión",
            topLayer: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await logout();
                    toast.success("Logout exitoso!");
                    dispatch(removeExam());
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    toast.error(errorMessage);
                }
            }
        });
    }

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#9c27b0' }}>
            <ToastContainer autoClose={1500} />
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }} className="flex items-center">
                        <LocalLibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CERVANTES
                        </Typography>
                    </Box>
                    <LocalLibraryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CERVANTES
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            authState.value !== null ?
                                (
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={authState && authState.value ? authState.value.username : "default-profile"} src={authState && authState.value ? authState.value.image?.toString() : "/src/assets/profile-users/user-default-profile.png"} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem key="user">
                                                <Typography sx={{ textAlign: 'center' }}>{authState && authState.value ? authState.value.username : "no auth"}</Typography>
                                            </MenuItem>

                                            <MenuItem onClick={handleLogout} disabled={isLoading}>
                                                <Typography sx={{ textAlign: 'center' }}>Cerrar sesión</Typography>
                                            </MenuItem>

                                        </Menu>
                                    </>
                                ) :
                                (
                                    <Link to={'/'}><Button variant='contained' color='primary' size='large'>Iniciar sesión</Button></Link>
                                )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
