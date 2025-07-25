import React, { useState, useEffect } from 'react';
import './ProjectStatusDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useActions } from "../../Hooks/useAction";
import CustomConfirmModal from './Modals/CustomConfirmModal';
import { useNavigate } from 'react-router-dom';

const ProjectStatusDashboard = ({ isDashboard }) => {
    const [projects, setProjects] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [modal, setModal] = useState(false)
    const biddingData = useSelector((state: any) => state?.biddingReducer?.biddingdata?.biddingdata);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [totalHours, setTotalHours]: any = useState(0)
    const { attendance, fetchData } = useActions()
    const attendanceMessage = useSelector((state: any) => state?.AttendanceReducer?.attendanceData?.attendance?.message)
    const stopTimerData = useSelector((state: any) => state?.StopTimerReducer?.stopTimerData?.data)
    const [isConfirm, setIsConfirm] = useState(false)
    const [projectloader, setprojectloader] = useState(true)
    const navigate = useNavigate()
    const [alertModal, setAlertModal] = useState(false)
    const [submitData, setSubmitData] = useState(null)
    useEffect(() => {
        if (biddingData?.myprojects) {
            const projectsWithTotalTime = biddingData.myprojects.filter(
                (project) => project?.total_time
            );

            const projectsArray = projectsWithTotalTime.map((project) => ({
                ...project,
                time: project.total_time,
            }));
            setProjects(projectsArray);
        }
    }, [biddingData]);

    useEffect(() => {
        console.log(biddingData, "helo")
        setProjectOptions(biddingData?.myprojects)
    }, [])

    useEffect(() => {
        updateTotalHours(projects);
    }, [projects]);

    const addNewProject = () => {
        setProjects([...projects, { project_name: 'asdnjkasn', description: '', time: '' }]);
    };

    const handleDelete = (index: any) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        // updateTotalHours(updatedProjects);
    };

    const formatMinutesToTime = (minutes) => {
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const mins = (minutes % 60).toString().padStart(2, '0');
        return `${hours} : ${mins}`;
    };


    const handleChange = (index, field, value) => {
        const updatedProjects = projects.map((project, i) =>
            i === index ? { ...project, [field]: value } : project
        );
        setProjects(updatedProjects);
    };

    const parseTimeToMinutes = (time) => {
        const timeParts = time.split(' ');
        let minutes = 0;

        timeParts.forEach((part) => {
            if (part.includes('h')) {
                const hours = parseInt(part);
                if (!isNaN(hours)) {
                    minutes += hours * 60;
                }
            } else if (part.includes('m')) {
                const mins = parseInt(part);
                if (!isNaN(mins)) {
                    minutes += mins;
                }
            }
        });

        return minutes;
    };

    const updateTotalHours = (projects) => {
        const totalMinutes = projects.reduce((acc, project) => {
            return acc + parseTimeToMinutes(project.time || '0h 0m');
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        setTotalHours(`${hours}h ${minutes}m`);
    };

    const handleSubmit = () => {
        setError('');
        const hasEmptyDescriptions = projects.some(project => !project.description);
        if (hasEmptyDescriptions) {
            setError('Description cannot be empty for any project.');
            return;
        }

        const project_ids = projects.map((project => project.id.toString()));
        const project_description = projects.map(project => project.description);
        const project_time = projects.map(project => formatMinutesToTime(parseTimeToMinutes(project.time)) || null);
        const connects_used = projects.map(project => project.connects || null);

        const submissionData = {
            data: {
                project_ids,
                project_description,
                project_time,
                connects_used
            }
        };

        setSubmitData(submissionData)
        attendance(submissionData)
        setModal(true)
    };

    const handleCancel = () => {
        isDashboard(false)
        dispatch(fetchData(navigate, setprojectloader));
    }

    return (
        <main className="mt-8 flex flex-col items-center">
            {/* Modal */}
            {modal && <CustomConfirmModal message={attendanceMessage} setModal={setModal} setIsConfirm={setIsConfirm} setAlertModal={setAlertModal} submitData={submitData} isDashboard={isDashboard} />}
            {/* {alertModal && <CustomAlertModal message={stopTimerData?.totaltime} setAlertModal={setAlertModal} setIsConfirm={setIsConfirm} />} */}

            {/* Project List Container  */}
            <section className="container">
                <table className="project-table">

                    {/* Table headings */}
                    <tr className="project-header rounded-t-md">
                        <th>Project Name</th>
                        <th>Description</th>
                        {!stopTimerData?.businee_department ?
                            <th>Connects</th> :
                            <th>Total Time</th>}
                        <th>Remove Project</th>
                    </tr>

                    {/* table rows  */}
                    {projects.map((project, index) => (
                        <tr key={index} className="project-row">
                            {/* Project Name  */}
                            <td>
                                <select
                                    defaultValue={project.project_name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                >
                                    <option value="">-- Choose project --</option>
                                    {project?.project_name}
                                    {projectOptions?.map(option => (
                                        <option key={option.id} value={option.name}>
                                            {option.project_name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/* Description  */}
                            <td>
                                <textarea
                                    placeholder="Enter description"
                                    value={project.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                />
                            </td>

                            {stopTimerData?.businee_department ?
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Total time"
                                        className="outline-none border px-3 py-1 rounded-full text-center"
                                        defaultValue={project.total_time}
                                        onChange={(e) => handleChange(index, 'time', e.target.value)}
                                    />
                                </td>
                                :
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Connects"
                                        className="outline-none border px-3 py-1 rounded-full text-center"
                                    />
                                </td>}

                            {/* Remove Project  */}
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                                {/* <button>Cancel</button>
                                <button onClick={handleSubmit}>Confirm</button> */}
                            </td>
                        </tr>
                    ))}
                </table>
                <div className="flex justify-end mt-5">
                    <button onClick={addNewProject}>Add New Project</button>
                </div>
            </section>

            {/* Total Hour */}
            {error && <div className="text-red-500 mt-5">{error}</div>}
            <div className="flex justify-between items-center mt-5">
                <div className="font-lg">Total Hours: {totalHours}</div>
                <div className='buttons flex gap-5'>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit" onClick={() => handleSubmit()}>Confirm</button>
                </div>
            </div>
        </main>
    );
};

export default ProjectStatusDashboard;
