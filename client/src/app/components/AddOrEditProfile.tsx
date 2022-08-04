import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProfile } from "../actions/profileActions";
import { ProfileDto, WorkExperience } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";
import ModalComponent from './ModalComponent'

const AddOrEditProfile = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  let [showModal, handleModal] = useState(false);
  let [workExperience, addWorkExperience] = useState({} as { [key: string]: string; });
  let [tempProfile, addTempProfile] = useState(profile || {} as ProfileDto);


  useEffect(() => {
    const profileId = id ? parseInt(id) : null;
    if (profileId) {
      dispatch(getOneProfile(profileId));
    }
  }, []);

  const handleInput =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let wexp = workExperience;
      wexp[e.target.name] = e.target.value;
      addWorkExperience(wexp);
    }

  const handleSaveWorkExperience = () => {
    let wexp: WorkExperience = {
      jobTitle: workExperience['jobTitle'],
      jobDescription: workExperience['jobDescription'],
      company: workExperience['company'],
      companyLogo: workExperience['companyLogo'],
      endDate: new Date(workExperience['endDate']),
      startDate: new Date(workExperience['startDate']),
      isContinuing: false,
    };
    tempProfile.workExperiences.concat(wexp);
    handleModal(false);
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
              name="companyName"
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
              onChange={(e) => handleInput(e)} />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Start Date"
              name="startDate"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              name="endDate"
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
        {modalContent}
      </ModalComponent>
    );
  }

  const onClickDelete = (id: string) => {

  }

  const renderTable = () => {
    const rowData =
      profile?.workExperiences?.map(
        (wexp: WorkExperience, i: number) => {
          return (
            <tr key={"item_" + (i + 1)}>
              <td>{wexp.jobTitle}</td>
              <td>{wexp.company}</td>
              <td>{wexp.jobDescription}</td>
              <td>{wexp.startDate}</td>
              <td>{wexp.endDate}</td>
              <td className="text-center">
                <button className="btn btn-sm" onClick={() => onClickDelete(wexp.id!)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
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
            <th className="text-center">Action</th>
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
          <form>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="inputName">Name</label>
              <div className="col-sm-10">
                <input
                  type="name"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter name"
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
                  id="inputAge"
                  placeholder="Enter name"
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
                  id="controlFile" />
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
