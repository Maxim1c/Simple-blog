import { Component } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const BlogCard = ({

    title,
    description,
    Liked,
    likePost,
    deletePost

}) => {

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

            <button className="deleteBtn" onClick={deletePost}>
                <DeleteForeverIcon />
            </button>

        </div>
    )
}

export { BlogCard }
