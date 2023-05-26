
import { BlogCard } from '../components/BlogCard';
import { Component } from 'react';
import { AddPostForm } from '../components/AddPostForm';
import axios from 'axios';

class Blogpage extends Component {

    state = {
        showAddForm: false,
        blogArr: [],
    }

    likePost = pos => {
        const temp = [...this.state.blogArr];
        temp[pos].Liked = !temp[pos].Liked

        this.setState({
            blogArr: temp
        })

        localStorage.setItem('blogPosts', JSON.stringify(temp))
    }


    deletePost = pos => {
        if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {
            const temp = [...this.state.blogArr];
            temp.splice(pos, 1);

            this.setState({
                blogArr: temp
            })

            localStorage.setItem('blogPosts', JSON.stringify(temp))
        }
    }

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true
        })
    }

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false
        })
    }

    handleEscape = (e) => {
        if (e.key === 'Escape' && this.state.showAddForm) {
            this.handleAddFormHide()
        }
    }

    addNewBlogPost = (blogPosts) => {

        this.setState((state) => {
            const posts = [...state.blogArr];
            posts.push(blogPosts);
            localStorage.setItem('blogPosts', JSON.stringify(posts))
            return {
                blogArr: posts
            }
        })
    }

    componentDidMount() {
        axios.get('https://6470e53b3de51400f7251409.mockapi.io/Posts')
            .then((response) => {
                this.setState({
                    blogArr: response.data
                })
            })

            .catch((err) => {
                console.log(err)
            })

        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    render() {

        const blokPosts = this.state.blogArr.map((item, pos) => {
            return (

                <BlogCard

                    key={item.id}
                    title={item.title}
                    description={item.description}
                    Liked={item.Liked}
                    likePost={() => this.likePost(pos)}
                    deletePost={() => this.deletePost(pos)}
                />
            )
        })

        if (this.state.blogArr.length === 0)
            return <h1>Загружаю данные ...</h1>

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
                    <div className='posts'>{blokPosts}</div>

                </>

            </div>
        )
    }
}

export { Blogpage }