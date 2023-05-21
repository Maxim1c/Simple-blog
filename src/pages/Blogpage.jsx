
import { posts } from '../shared/ProjectData';
import { BlogCard } from '../components/BlogCard';
import { Component } from 'react';

class Blogpage extends Component {

    state = {
        showBlog: true,
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


    toggleBlog = () => {
        this.setState(({ showBlog }) => {
            return {
                showBlog: !showBlog
            }
        })
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
                <button onClick={this.toggleBlog}>
                    {
                        this.state.showBlog ? 'скрыть блог'
                            : 'Показать блог'
                    }
                </button>

                {
                    this.state.showBlog ?
                        <>
                            <h1>Simple blog</h1>
                            <div className='posts'>
                                {blokPosts}
                            </div>
                        </>
                        : null
                }
            </>
        )
    }
}

export { Blogpage }