import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useUrlMapper } from '@/hooks/useUrlMapper';
import s from './style.css';

export const getPost = gql`
    query Post($postId: Int) {
        post(id: $postId) {
            id
            title
            body
        }
    }
`;

const Post = () => {
    const { params } = useUrlMapper();
    const { loading, ...rest } = useQuery(getPost, {
        ssr: true,
        variables: {
            postId: Number(params.id),
        },
    });

    if (!rest.data || loading) return <h2>Loading</h2>;
    const { post } = rest.data;
    return (
        <div className={s.post}>
            <p className={s.title}>Post Widget</p>
            {post && (
                <div className={s.body}>
                    <p className={s.bodyTitle}>{post.title}</p>
                    <p className={s.description}>{post.body}</p>
                </div>
            )}
        </div>
    );
};

export default Post;
