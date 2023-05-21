
import { posts } from '../shared/ProjectData';
import { BlogCard } from '../components/BlogCard';
import { Component } from 'react';
import { AddPostForm } from '../components/AddPostForm';

class Blogpage extends Component {

    state = {
        showAddForm: false,
        blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
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

        return (
            <>

                {this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null}

                <>
                    <h1>Simple blog</h1>
                    <button className='blackBtn' onClick={this.handleAddFormShow}>Создать новый пост</button>
                    <div className='posts'>{blokPosts}</div>
                </>

            </>
        )
    }
}

export { Blogpage }