import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProfile, addProfileExperience, getOneProfile, updateProfile } from "../actions/profileActions";
import { ProfileDto, WorkExperience } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";
import ModalComponent from './ModalComponent'

const AddOrEditProfile = () => {
  const profile =
    useAppSelector((state) => state.profile.profile);
  const workExperiences =
    useAppSelector((state) => state.profile.workExperiences);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const profileId = id ? parseInt(id) : null;

  let [showModal, handleModal] = useState(false);
  let [fieldValues, updateInput] = useState({} as { [key: string]: string; });

  useEffect(() => {
    if (profileId) {
      dispatch(getOneProfile(profileId));
    }
  }, []);

  const handleInput =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let updatedFields = fieldValues;
      updatedFields[e.target.name] = e.target.value;
      updateInput(updatedFields);
    }

  const handleSaveWorkExperience = () => {
    let wexp: WorkExperience = {
      jobTitle: fieldValues['jobTitle'],
      jobDescription: fieldValues['jobDescription'],
      company: fieldValues['company'],
      companyLogo: fieldValues['companyLogo'],
      endDate: null,  //new Date(fieldValues['endDate']),
      startDate: null,  //new Date(fieldValues['startDate']),
      isContinuing: false,
    };

    dispatch(addProfileExperience(wexp))
    handleModal(false);
  }

  const onProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currProfile: ProfileDto = {
      id: 0,
      name: fieldValues['name'],
      age: parseInt(fieldValues['age']),
      profilePicture: null,
      workExperiences: workExperiences,
    }

    if (profileId) {
      dispatch(updateProfile(profileId, currProfile, () => navigate('/')));
    }
    else {
      dispatch(addProfile(currProfile, () => navigate('/')));
    }
  }

  const renderModalView = () => {
    let modalContent = (
      <form>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Job Title"
              name="jobTitle"
              required={true}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Company name"
              name="company"
              required={true}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <textarea
              className="form-control"
              placeholder="Job Description"
              rows={3}
              name="jobDescription"
              required={true}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Start Date"
              name="startDate"
              required={true}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              name="endDate"
              required={true}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <label className="col-sm-2 col-form-label" htmlFor="controlFile">Company Logo</label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control-file"
              id="controlFile"
              name="company"
              onChange={(e) => handleInput(e)} />
          </div>
        </div>
      </form>
    )

    return (
      <ModalComponent
        showModal={showModal}
        onCloseModal={() => handleModal(false)}
        title={"Add experience"}
        showFooter={true}
        primaryBtnText={"Save"}
        onHandlePrimaryBtn={() => handleSaveWorkExperience()}
      >
        {showModal && modalContent}
      </ModalComponent>
    );
  }

  const renderTable = () => {
    const rowData =
      workExperiences.map(
        (wexp: WorkExperience, i: number) => {
          return (
            <tr key={"item_" + (i + 1)}>
              <td>{wexp.jobTitle}</td>
              <td>{wexp.company}</td>
              <td>{wexp.jobDescription}</td>
              <td>{wexp.startDate}</td>
              <td>{wexp.endDate}</td>
            </tr>
          );
        });

    return (
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Job title</th>
            <th>Company name</th>
            <th>Job description</th>
            <th>Start date</th>
            <th>End date</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <section className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Profile Information</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={(e) => onProfileSubmit(e)}>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="inputName">Name</label>
              <div className="col-sm-10">
                <input
                  type="name"
                  className="form-control"
                  name="name"
                  placeholder="Enter name"
                  onChange={(e) => handleInput(e)}
                  defaultValue={profile?.name}
                />
              </div>
            </div>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="inputAge">Age</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  placeholder="Enter age"
                  onChange={(e) => handleInput(e)}
                  defaultValue={profile?.age}
                />
              </div>
            </div>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="controlFile">Profile Picture</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control-file"
                  name="profilePicture" />
              </div>
            </div>
            <div className="work-experience">
              <h5>Work experience</h5>
              <div className="d-grid gap-2 d-md-flex d-sm-flex justify-content-md-end justify-content-sm-end mb-3">
                <button className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                  handleModal(true)
                }}>
                  Add Work experience
                </button>
              </div>
              {renderTable()}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </section>
      {renderModalView()}
    </div>
  )
}

export default AddOrEditProfile;
