import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaCaretDown, FaCheckCircle, FaPlus } from 'react-icons/fa';
import TopButtons from "./TopButtons";
import AssignmentEntry from "./AssignmentEntry";
import { useDispatch, useSelector } from "react-redux";
import { setAssignment, setAssignments } from "./AssignmentReducer";
import * as client from "./client";


function Assignments() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignmentReducer.assignments)

  useEffect(() => {
    client.findAssignmentsForCourse(courseId)
    .then((assignments) => {
      dispatch(setAssignments(assignments)
    )}
    );
  }, [courseId]);

  return (
      <div className="col-8">

        <TopButtons courseId={courseId}/>

        <ul className="list-group mt-5">

          {/*Assignment Title*/}
          <li
              className="list-group-item list-group-item-action"
              style={{backgroundColor: "#e7e6e6", fontSize: "16px", fontWeight: "bold"}}
          >
            <FaEllipsisV />
            <FaCaretDown />
            Assignments
            <div className="float-end">
              <button className="btn btn-secondary btn-light dropdown-toggle btn-sm">
                <FaCheckCircle className="text-success" />
              </button>
              <FaPlus />
              <FaEllipsisV />
            </div>
          </li>

          <div className="list-group">
            {assignments.map((assignment) => (
                <Link
                    key={assignment._id}
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    className="list-group-item"
                    onClick={() => dispatch(setAssignment(assignment))}>

                  <AssignmentEntry
                      id={assignment._id}
                      course={assignment.course}
                      title={assignment.title}
                  />


                </Link>
            ))}
          </div>
        </ul>
      </div>
  );
}
export default Assignments;