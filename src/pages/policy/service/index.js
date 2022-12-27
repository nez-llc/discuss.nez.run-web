import React from 'react'
import { getBlocks } from 'utils/notion-api';


const ServiceIndexPage = (props) => {
    //console.log(props);
    return (
        <div className=''>
            {props.posts.map((post) => (
                <div key={post.id}>
                    <div>
                        {post[post.type].rich_text.map(item => (
                            <div>
                                <p>{item.text.content}</p>
                            </div>
                        ))}
                        {post.has_children === true
                            && post.children_items.map(child => (
                                <div>
                                    {child[child.type].rich_text.map(item => (
                                        <p>{item.text.content}</p>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export const getStaticProps = async () => {
    const posts = await getBlocks('960af32f83984d419bfb0bc3c92e5528');

    const result = await Promise.all(
        posts.map(async post => {
            if(post.has_children) {
                post.children_items = await getBlocks(post.id);
            }
            return post;
        })
    );

    return {
        props: {
            posts: JSON.parse(JSON.stringify(result)),
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1, // In seconds
    };
};

export default ServiceIndexPage
