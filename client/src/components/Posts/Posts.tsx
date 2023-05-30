import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useUrlMapper, useGenerateUrl } from '@/hooks/useUrlMapper';

import { Pagination } from '@/components/Pagination';
import s from './style.css';

const getPosts = gql`
    query Posts($page: Int, $limit: Int) {
        posts(page: $page, limit: $limit) {
            id
            title
            body
        }
    }
`;
const Posts = () => {
    const { query } = useUrlMapper();
    const generateUrl = useGenerateUrl();
    const currentPage = Number(query.page) || 1;
    const { data, loading } = useQuery(getPosts, {
        ssr: true,
        variables: {
            page: currentPage,
            limit: 5,
        },
    });

    const nextPageUrl = (page: string) => generateUrl({ page });

    return (
        <div className={s.posts}>
            <p className={s.title}>Posts Widget</p>
            {data?.posts?.map((post, i) => {
                return (
                    <Link key={i} to={`/posts/${post.id}`}>
                        <div className={`${s.body} ${s.mb}`}>
                            <p className={s.bodyTitle}>
                                <b>{post.id}</b> {post.title}
                            </p>
                        </div>
                    </Link>
                );
            })}
            <Pagination
                currentPage={currentPage}
                perPage={5}
                nextPageUrl={nextPageUrl}
                total={100}
            />
        </div>
    );
};

export default Posts;
