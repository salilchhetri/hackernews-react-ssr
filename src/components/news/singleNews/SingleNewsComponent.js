import React from 'react';
import "./SingleNewsComponent.scss";
import moment from 'moment'
import { IconContext } from "react-icons";
import { TiArrowSortedUp } from 'react-icons/ti';
import Button from 'react-bootstrap/Button'

export default function SingleNewsComponent(props) {
    let tmp = document.createElement('a');
    tmp.href = props.data.url;
    return (
        <tr>
            <td>{props.data.num_comments}</td>
            <td>{props.data.points}
                <IconContext.Provider value={{ className: "upvote" }}>
                    <TiArrowSortedUp onClick={props.handleUpvote} />
                </IconContext.Provider>
            </td>
            <td className="articleDetails">
                <span className="title">
                    <a href={props.data.url} target="_blank" rel="noopener noreferrer" >
                        {props.data.title}
                    </a>
                </span>
                <small>
                    <span>
                        ( <a href={props.data.url} target="_blank" rel="noopener noreferrer" className="articleAccent">{tmp.hostname}</a>)
                    </span>
                    <span>by</span>
                    <span className="articleAccent">
                        <a href="/">
                            {props.data.author}
                        </a>
                    </span>
                    <span className="articleAccent">{moment(props.data.created_at).fromNow()}</span>
                    <span className="articleAccent">
                        [
                            <Button variant="link" className="btn-link" onClick={props.handleHide}>hide</Button>
                        ]
                </span>
                </small>
            </td>
        </tr>
    )
}
