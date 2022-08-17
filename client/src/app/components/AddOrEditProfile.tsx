import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProfile, addProfileExperience, getOneProfile, resetProfile, updateProfile } from "../actions/profileActions";
import { PictureDto, ProfileDto, WorkExperience } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";
import ImageUploaderComponent from "./ImageUploaderComponent";
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
  let [proPic, updateProfilePicture] = useState<PictureDto | null>(null);
  let [companyLogo, updateCompanyLogo] = useState<PictureDto | null>(null);

  useEffect(() => {
    if (profileId) {
      dispatch(getOneProfile(profileId));
    }

    return () => {
      dispatch(resetProfile())
    }
  }, []);

  const handleSaveWorkExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var target = e.currentTarget as HTMLFormElement;
    let wexp: WorkExperience = {
      jobTitle: target.jobTitle.value,
      jobDescription: target.jobDescription.value,
      company: target.company.value,
      companyLogo: null,
      endDate: target.endDate.value,
      startDate: target.startDate.value,
      isContinuing: false,
    };

    dispatch(addProfileExperience(wexp))
    handleModal(false);
  }

  const onProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var target = e.currentTarget as HTMLFormElement;

    const currProfile: ProfileDto = {
      id: 0,
      name: target.fullName.value,
      age: target.age.value,
      picId: proPic ? proPic.id : "",
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
      <form onSubmit={(e) => handleSaveWorkExperience(e)}>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Job Title"
              name="jobTitle"
              required={true}
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
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              name="endDate"
              required={true}
            />
          </div>
        </div>
        <div className="form row mb-3 mt-3">
          <div className="col">
            <ImageUploaderComponent
              label={"Upload Company Logo"}
              onUploadImage={(picture) => updateCompanyLogo(picture)}
            />
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" onClick={() => handleModal(false)} className="btn btn-secondary me-md-2">Close</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    )

    return (
      <ModalComponent
        showModal={showModal}
        onCloseModal={() => handleModal(false)}
        title={"Add experience"}
      >
        {showModal && modalContent}
      </ModalComponent>
    );
  }

  const getFormattedDate = (date: Date | null) => {
    return date == null
      ? ""
      : new Date(date).toLocaleDateString();
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
              <td>{getFormattedDate(wexp.startDate)}</td>
              <td>{getFormattedDate(wexp.endDate)}</td>
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
          <form onSubmit={(e) => onProfileSubmit(e)}
            method="POST"
            encType="multipart/form-data">
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="inputName">Name</label>
              <div className="col-sm-10">
                <input
                  type="name"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter name"
                  required={true}
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
                  required={true}
                  defaultValue={profile?.age}
                />
              </div>
            </div>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="controlFile">Profile Picture</label>
              <div className="col-sm-10">
                <ImageUploaderComponent
                  label={"Upload Profile Photo"}
                  onUploadImage={(picture) => updateProfilePicture(picture)}
                />
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

