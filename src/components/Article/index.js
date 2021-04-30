import React from "react";
import './style.css';

export const Article = ({data}) => {
    return data ? (
        <article className={'article'}>
            <h2 className={'title'}>{data.title}</h2>
            <p className={'description'}>{data.description}</p>
            <a href={data.url}>Read more...</a>
        </article>
    ) : null;
}