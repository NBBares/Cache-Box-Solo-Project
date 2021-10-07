import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Gallery/Gallery.css';

function GalleryPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    let projectData = useSelector(store => store.projectReducer);//grabs projects
    let searchTerm = useSelector(store => store.galleryReducer);//grabs search term

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_PROJECT' };
        dispatch(action);
    }, []);

   
    if (searchTerm != '') {
        projectData = projectData.filter(project => project?.type_name?.toLowerCase()?.includes(searchTerm.toLowerCase())||
        project?.tag_name?.toLowerCase()?.includes(searchTerm.toLowerCase())||
        project?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
        );
    }

    return (
        <>
            <div className="container">
            <Row xs={1} md={3} className="g-4">
  {Array.from({ length: 4 }),projectData.map((projectItem, i) => (
    <Col>
      <Card className="cards" style={{ maxWidth: '25rem', maxHeight: '30rem' }} onClick={() => history.push(`/description/${projectItem?.project_id}`)} key={i} data={projectItem?.id}>
        <Card.Img style={{ height: '25rem' }} variant="top" src={projectItem?.images[0]?.image_name} />
        <Card.Body >
          <Card.Title >{projectItem?.title}</Card.Title>
          <Card.Text>Type:{projectItem?.type_name}</Card.Text>
          <Card.Text>Tags:<ul>{(projectItem.tags.map((tags, i) => {
                                return <li key={i} data={tags?.id}>{tags?.tag_name}</li>
                            }))}</ul></Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
            </div>
        </>
    );
}

// this allows us to use <App /> in index.js
export default GalleryPage;
