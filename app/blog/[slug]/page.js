import React from 'react'
import { blogs } from '../data'
import BlogPostClient from '../../../components/BlogPostClient'
import Link from 'next/link'

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }))
}

const BlogPostPage = async ({ params }) => {
    // In Next.js 15+, params is a promise
    const { slug } = await params
    const blog = blogs.find(b => b.slug === slug)

    if (!blog) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h1>Blog post not found</h1>
                <Link href="/blog">Back to Blog</Link>
            </div>
        )
    }

    const otherBlogs = blogs.filter(b => b.slug !== slug).slice(0, 2)

    return <BlogPostClient blog={blog} otherBlogs={otherBlogs} />
}

export default BlogPostPage
