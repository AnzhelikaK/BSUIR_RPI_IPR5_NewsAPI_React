import React, {useEffect, useState, useRef} from "react";
import './style.css';
import {Article} from "../Article";

const apiKey = 'f43f70cf39ef42929b58013df7a02a4c';
const articlesLimit = 40;
const pageSize = 5;

const getArticles = async ({ itemsPerPage, page }) => {
    const url = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKey}&pageSize=${itemsPerPage}&page=${page}`;
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error ' + response.status)
    }
    let data = await response.json();

    if (data.status === 'error') {
        throw new Error(data.message)
    }

    return {
        items: data.articles,
        total: data.totalResults,
    }
}

export const Application = () => {

    const [articles, setArticles] = useState([]);

    const showLoadMoreButton = useRef(false);
    const currentPage = useRef(1);
    const itemsPerPage = useRef(pageSize);

    useEffect(() => {
        currentPage.current = 1;
        getArticles({
            itemsPerPage: itemsPerPage.current,
            page: currentPage.current,
        })
            .then(({items, total}) => {
                showLoadMoreButton.current = items.length < total && items.length < articlesLimit;
                setArticles(items);
            })
            .catch((e) => alert(e.message));
    }, []);

    return (
        <div className={'news'}>
            <h1>News application</h1>
            {articles.length > 0 ? <div className={'list'}>
                {articles.map((article, i) => {
                    return (
                        <div key={i} className={'item'}>
                            <Article data={article}/>
                        </div>
                    )
                })}
            </div> : " "}
            <Article/>
        </div>
    );
}