import CancelIcon from '@mui/icons-material/Cancel';


const AddPostForm = ({handleAddFormHide}) => {
    return (
        <>
            <form action='' className="addPostForm">
                <button className='nideBtn' onClick={handleAddFormHide}><CancelIcon /></button>
                <h2>Создание поста</h2>
                <div>
                    <input className="addFormInput" type='text' name='postTitle' placeholder="Заголовок поста"/>
                </div>

                <div>
                    <textarea className="addFormInput" name='postDescription' placeholder="Текст" />
                </div>

                <div><button onClick={handleAddFormHide} className="blackBtn" type='button'>Добавить пост</button></div>
            </form>

            <div onClick={handleAddFormHide} className="overlay"></div>
        </>
    )
}

export { AddPostForm }