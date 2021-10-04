import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function GalleryPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    let projectData = useSelector(store => store.projectReducer);

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_PROJECT' };
        dispatch(action);
    }, []);

    return (
        <>
            <div className="container">

            </div>
            <div>
                <ul>
                    {projectData.map((projectItem, i) => {
                        return <li onClick={() => history.push(`/description/${projectItem?.project_id}`)} key={i} data={projectItem?.id}>Title:{projectItem?.title},
                            Image:<img src={projectItem?.images[0]?.image_name} />,
                            Type: {projectItem?.type_name}, Tags: <ul>{(projectItem.tags.map((tags, i) => {
                                return <li key={i} data={tags?.id}>{tags?.tag_name}</li>
                            }))}</ul>
                        </li>;
                    })}
                </ul>
            </div>
        </>
    );
}

// this allows us to use <App /> in index.js
export default GalleryPage;
