import CancelIcon from '@mui/icons-material/Cancel';
import { Component } from 'react';


class AddPostForm extends Component {

    state = {
        postTitle: '',
        postDesc: ''
    }

    handlePostTitleChange = e => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescChange = e => {
        this.setState({
            postDesc: e.target.value
        })
    }

    createPost = (e) => {
        e.preventDefault()
        const post = {            
            title: this.state.postTitle,
            description: this.state.postDesc,
            Liked: false,
        }

        this.props.addNewBlogPost(post);
        this.props.handleAddFormHide()      
    }

    handleEscape = (e) => {
        if (e.key === 'Escape') {
            this.props.handleAddFormHide();
        }
    };

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    };


    render() {

        const handleAddFormHide = this.props.handleAddFormHide
        return (
            <>
                <form action='' className="addPostForm" onSubmit={this.createPost}>
                    <button className='nideBtn' onClick={handleAddFormHide}><CancelIcon /></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input className="addFormInput"
                            type='text' name='postTitle'
                            placeholder="Заголовок поста"
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>

                    <div>
                        <textarea className="addFormInput"
                            name='postDescription'
                            placeholder="Текст"
                            value={this.state.postDesc}
                            onChange={this.handlePostDescChange}
                            rows={8}
                            required
                        />
                    </div>

                    <div><button className="blackBtn" type='submit'>Добавить пост</button></div>
                </form>

                <div onClick={handleAddFormHide} className="overlay"></div>
            </>
        )
    }
}

export { AddPostForm }