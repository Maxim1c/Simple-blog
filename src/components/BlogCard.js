import { Component } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const BlogCard = ({

    title,
    description,
    Liked,
    likePost,
    deletePost,
    handleEditFormShow,
    handleSelectedPost

}) => {

    const shouEditForm = () => {
        handleSelectedPost();
        handleEditFormShow();

    }

    const heartFill = Liked ? 'crimson' : 'black'

    return (
        <div className='post'>
            <div className="postContent">
                <h2>{title}</h2>
                <p>
                    {description}
                </p>
                <div>
                    <button onClick={likePost}>
                        <FavoriteIcon style={{ fill: heartFill }} />
                    </button>
                </div>
            </div>

            <div className="postControl">
                <button className="editBtn" onClick={shouEditForm}>
                    <EditIcon />
                </button>

                <button className="deleteBtn" onClick={deletePost}>
                    <DeleteForeverIcon />
                </button>
            </div>

        </div>
    )
}

export { BlogCard }
