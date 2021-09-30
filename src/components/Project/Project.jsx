import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function ProjectPage() {
    const history = useHistory();
    //grabs the information from the store
    let allprojects = useSelector(store => store.projectReducer);
    console.log('THIS IS ALL PROJECTS:', allprojects)

    let params = useParams();
    console.log(params);

    let { projectId } = params;

    let project = allprojects.find(project => {
        console.log("trying to find a project", project, projectId)
        return project.project_id === Number(projectId);
    });
    console.log('Found this project:', project);

    if (!project) {
        return <h2>Invalid Project ID</h2>
    }

    //calls in history to change pages
    const pageChange = () => {
        history.push('/gallery');
    }

    return (
        <>
            <div className="project">
                <h2>{project?.title}</h2>
                <p>Images:
                <ul>{(project.images.map((images, i) => {
                    return <li key={i} data={images.id}><img className="descimg" src={images.image_name}/>{images.image_description}</li>
                }))}</ul>
                </p>
                <p>Tags:
                <ul>{(project.tags.map((tags, i) => {
                    return <li key={i} data={tags.id}>{tags.tag_name}</li>
                }))}</ul>
                </p>
                <button onClick={pageChange}>Return</button>
            </div>
        </>
    )
}

export default ProjectPage;