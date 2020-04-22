import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './NewsComponent.scss';

import SingleNewsComponent from './singleNews/SingleNewsComponent';


export default class NewsComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            news: [],
            hidden: []
        }
    }

    componentDidMount() {
        let hiddenByUser = JSON.parse(localStorage.getItem('hiddenArticles'))
        if (hiddenByUser !== null) {
            this.setState({ hidden: hiddenByUser })
        }

        //********** Swith the endpoint here
        // fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
        fetch('/stub/data.json')
            .then(response => response.json())
            .then(news => {
                if (this.state.hidden.length > 0) {
                    news = news.hits.filter(article => {
                        return !this.state.hidden.includes(article.objectID)
                    })
                } else {
                    news = news.hits
                }
                this.setState({ news: news })
            });
    }

    handleUpvote = (id) => {
        let udpatedNews = [...this.state.news];
        const current = udpatedNews.find((element) => {
            return element.objectID === id
        })
        current.points = current.points + 1;
        this.setState({ news: udpatedNews })
    }

    /*
    hide
        hidden = [objectID]
           save to localStorage
           updateState
           
    onLoad
        get hidden from local storage
            splice it from response and update state
           

    */

    hideArticles = (id) => {
        let hiddenNews = [...this.state.hidden]
        let udpatedNews = [...this.state.news];
        udpatedNews = udpatedNews.filter((element) => {
            return element.objectID !== id
        });

        hiddenNews.push(id);
        this.setState({ news: udpatedNews, hidden: hiddenNews }, () => {
            console.log(this.state.hidden)
            localStorage.setItem("hiddenArticles", JSON.stringify(this.state.hidden))
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        {JSON.stringify(this.state.hidden)}
                        <Table striped hover size="sm">
                            <tbody>
                                {
                                    this.state.news.length > 0 ?
                                        this.state.news.map((article, index) => {
                                            return <SingleNewsComponent key={index} data={article}
                                                handleUpvote={() => this.handleUpvote(article.objectID)}
                                                handleHide={() => this.hideArticles(article.objectID)}
                                            />
                                        })
                                        : null
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container >
        )
    }

}
