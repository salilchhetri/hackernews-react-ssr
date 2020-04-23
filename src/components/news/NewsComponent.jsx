import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './NewsComponent.scss';

import SingleNewsComponent from './singleNews/SingleNewsComponent';


export default class NewsComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            news: [],
            hidden: [],
            upVotes: []
        }
    }

    componentDidMount() {
        let hiddenByUser = JSON.parse(localStorage.getItem('hiddenArticles'))
        if (hiddenByUser !== null) {
            this.setState({ hidden: hiddenByUser })
        }

        let userUpVotes = JSON.parse(localStorage.getItem('userUpVotes'))
        console.log('User Votes===>', userUpVotes)
        if (userUpVotes !== null) {
            this.setState({ upVotes: userUpVotes })
        }

        //********** Swith the endpoint here
        //fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
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

                // if (this.state.upVotes.length > 0) {
                //     news = news.map((n) => {
                //         this.state.upVotes.find(vote => {
                //             if (vote.id === n.objectID) {
                //                 n.points = n.points + vote.count
                //             }
                //             return vote
                //         })
                //         return n
                //     })
                // }

                console.log('news', news)
                this.setState({ news: news })
            });
    }

    handleUpvote = (id) => {
        let votes = [...this.state.upVotes];

        let count = 1

        votes.forEach(vote => {
            if (vote === id) {
                count++
            }
        })

        let udpatedNews = [...this.state.news];
        const current = udpatedNews.find((element) => {
            return element.objectID === id
        })
        if (count <= 10) {
            current.points = current.points + 1;
            votes.push(id);
            localStorage.setItem("userUpVotes", JSON.stringify(votes))
        } else {
            alert('Limit exceeded!')
        }
        this.setState({ news: udpatedNews, upVotes: votes })
    }

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
