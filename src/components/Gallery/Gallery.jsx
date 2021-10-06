import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
            <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }),projectData.map((projectItem, i) => (
    <Col>
      <Card onClick={() => history.push(`/description/${projectItem?.project_id}`)} key={i} data={projectItem?.id}>
        <Card.Img variant="top" src={projectItem?.images[0]?.image_name} />
        <Card.Body>
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


{/* <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).projectData.map((projectItem, i) => (
    <Col>
      <Card onClick={() => history.push(`/description/${projectItem?.project_id}`)} key={i} data={projectItem?.id}>
        <Card.Img variant="top" src={projectItem?.images[0]?.image_name} />
        <Card.Body>
          <Card.Title >{projectItem?.title}</Card.Title>
          <Card.Text>Type:{projectItem?.type_name}</Card.Text>
          <Card.Text>Tags:<ul>{(projectItem.tags.map((tags, i) => {
                                return <li key={i} data={tags?.id}>{tags?.tag_name}</li>
                            }))}</ul></Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row> */}

{/* <div>
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
            </div> */}