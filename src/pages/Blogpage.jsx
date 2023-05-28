
import { BlogCard } from '../components/BlogCard';
import { Component } from 'react';
import { AddPostForm } from '../components/AddPostForm';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Opacity } from '@mui/icons-material';

class Blogpage extends Component {

    state = {
        showAddForm: false,
        blogArr: [],
        isPanding: false,
    };

    fetchPosts = () => {
        axios.get('https://6470e53b3de51400f7251409.mockapi.io/Posts')
            .then((response) => {
                this.setState({
                    blogArr: response.data,
                    isPanding: false
                })
            })

            .catch((err) => {
                console.log(err)
            })
    };

    likePost = (blogPost) => {
        const temp = { ...blogPost };
        temp.Liked = !temp.Liked

        axios.put(`https://6470e53b3de51400f7251409.mockapi.io/Posts/${blogPost.id}`, temp)
            .then((response) => {
                console.log('Пост изменён =>', response.data)
                this.fetchPosts();
            })

            .catch((err) => {
                console.log(err)
            })

    };


    deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            this.setState({
                isPanding: true
            })

            axios.delete(`https://6470e53b3de51400f7251409.mockapi.io/Posts/${blogPost.id}`)
                .then((response) => {
                    this.fetchPosts()
                })

                .catch((err) => {
                    console.log(err)
                })
        }
    };

    addNewBlogPost = (blogPosts) => {
        this.setState({
            isPanding: true
        })
        axios.post('https://6470e53b3de51400f7251409.mockapi.io/Posts/', blogPosts)
            .then((response) => {
                console.log('Пост создан =>', response.data)
                this.fetchPosts()
            })

            .catch((err) => {
                console.log(err)
            })
    };

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true
        })
    };

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false
        })
    };

    handleEscape = (e) => {
        if (e.key === 'Escape' && this.state.showAddForm) {
            this.handleAddFormHide()
        }
    };

    componentDidMount() {
        this.fetchPosts()
        window.addEventListener('keyup', this.handleEscape)
    };

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    };

    render() {

        const blokPosts = this.state.blogArr.map((item) => {
            return (

                <BlogCard

                    key={item.id}
                    title={item.title}
                    description={item.description}
                    Liked={item.Liked}
                    likePost={() => this.likePost(item)}
                    deletePost={() => this.deletePost(item)}
                />
            )
        })

        if (this.state.blogArr.length === 0) return <h1>Загружаю данные ...</h1>;

        const postOpacity = this.state.isPanding ? 0.5 : 1;

        return (
            <div className='blogPage'>

                {this.state.showAddForm && (
                    <AddPostForm blogArr={this.state.blogArr}
                        addNewBlogPost={this.addNewBlogPost}
                        handleAddFormHide={this.handleAddFormHide}
                    />
                )}

                <>
                    <h1>Блог</h1>
                    <div className='addNewPosts'>
                        <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>
                    </div>

                    <div className='posts' style={{ opacity: postOpacity }}>
                        {blokPosts}
                    </div>
                    {!this.state.isPanding && <CircularProgress className='preloader' />}
                </>

            </div>
        )
    }
}

export { Blogpage }