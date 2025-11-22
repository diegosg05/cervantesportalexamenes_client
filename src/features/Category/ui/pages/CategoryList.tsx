import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import { ModalSaveCategoryForm } from "../components/modal/ModalSaveCategoryForm";
import { ModalEditCategoryForm } from "../components/modal/ModalEditCategoryForm";
import { useFetchCategories } from "../hooks";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
}));

export const CategoryList = () => {
    const { fetchCategories, data, isLoading } = useFetchCategories();

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Todas las categorías</h1>
                </div>
                <div>
                    <ModalSaveCategoryForm fetch={fetchCategories} />
                </div>
            </div>
            <div>
                <Box>
                    <Demo>
                        {
                            isLoading || !data ?
                                (
                                    <h2>Extrayendo datos...</h2>
                                ) :
                                (
                                    < List >
                                        {
                                            data.map(category =>
                                                <div key={category.id}>
                                                    <Divider />
                                                    <ListItem
                                                        secondaryAction={
                                                            <ModalEditCategoryForm fetch={fetchCategories} category={category} />
                                                        }>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <CategoryIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={category.title}
                                                            secondary={category.description}
                                                        />
                                                    </ListItem>
                                                </div>
                                            )
                                        }
                                    </List>
                                )
                        }
                    </Demo>
                </Box>
            </div>
        </div >
    );
}