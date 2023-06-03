
import { BlogCard } from '../components/BlogCard';
import { Component } from 'react';
import { AddPostForm } from '../components/AddPostForm';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Opacity } from '@mui/icons-material';
import { EditPostForm } from '../components/EditPostForm';
import { postsUrl } from '../shared/ProjectData';

let sourse;

class Blogpage extends Component {

    state = {
        showAddForm: false,
        showEditForm: false,
        blogArr: [],
        isPanding: false,
        selectedPost: {}
    };

    fetchPosts = () => {
        sourse = axios.CancelToken.source();
        let config = { CancelToken: sourse.token }
        axios.get(postsUrl, config)
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

    componentDidMount() {
        this.fetchPosts()
    };

    componentWillUnmount() {
        if (sourse) {
            sourse.cancel('Axios get canceled')
        }
    }

    likePost = (blogPost) => {
        const temp = { ...blogPost };
        temp.Liked = !temp.Liked

        axios.put(`${postsUrl}${blogPost.id}`, temp)
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

            axios.delete(`${postsUrl}${blogPost.id}`)
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
            isPanding: true,
        })
        axios.post(postsUrl, blogPosts)
            .then((response) => {
                console.log('Пост создан =>', response.data)
                this.fetchPosts()
            })

            .catch((err) => {
                console.log(err)
            })
    };

    editBlogPost = (updateBlogPost) => {
        this.setState({
            isPanding: true,
        })
        axios.put(`${postsUrl}${updateBlogPost.id}, updateBlogPost`)
            .then((response) => {
                console.log('Пост отредактирован =>', response.data)
                this.fetchPosts()
            })

            .catch((err) => {
                console.log(err)
            })

    }

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true,
        })
    };

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false,
        })
    };

    handleEditFormShow = () => {
        this.setState({
            showEditForm: true,
        })
    };

    handleEditFormHide = () => {
        this.setState({
            showEditForm: false,
        })
    };

    handleSelectedPost = (blogPost) => {
        this.setState({
            selectedPost: blogPost
        })
    }

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
                    handleEditFormShow={this.handleEditFormShow}
                    handleSelectedPost={() => this.handleSelectedPost(item)}
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

                {
                    this.state.showEditForm && (
                        <EditPostForm
                            handleEditFormHide={this.handleEditFormHide}
                            selectedPost={this.state.selectedPost}
                            editBlogPost={this.editBlogPost}
                        />
                    )
                }

                <>
                    <h1>Блог</h1>
                    <div className='addNewPosts'>
                        <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>
                    </div>

                    <div className='posts' style={{ opacity: postOpacity }}>
                        {blokPosts}
                    </div>
                    {this.state.isPanding && <CircularProgress className='preloader' />}
                </>

            </div>
        )
    }
}

export { Blogpage }