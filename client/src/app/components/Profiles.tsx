import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProfile, getProfiles } from "../actions/profileActions";
import { PictureDto, ProfileDto } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";
import ImageViewComponent from "./ImageViewComponent";

const Profiles = () => {
  const allProfiles = useAppSelector((state) => state.profile.allProfiles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const onClickDelete = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteProfile(id))
    }
  }

  const renderImage = (picture: PictureDto | null) => {
    return (
      <ImageViewComponent
        picture={picture}
        height={65}
      />
    )
  }

  const renderTable = () => {
    const rowData = allProfiles.map((profile: ProfileDto, i: number) => {
      return (
        <tr key={"item_" + (i + 1)}>
          <td width={100}>{renderImage(profile.profilePicture)}</td>
          <td>{profile.name}</td>
          <td width={50}>{profile.age}</td>
          <td width={100} className="text-center">
            <button className="btn btn-sm" onClick={() => navigate("/edit-profile/" + profile.id)}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="btn btn-sm" onClick={() => onClickDelete(profile.id)}>
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
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Age</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </table>
    );
  }

  return (
    <div className="page">
      <h1>Profile Information</h1>
      <div className="d-grid gap-2 d-md-flex d-sm-flex justify-content-md-end justify-content-sm-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/add-profile")}>Add Profile</button>
      </div>
      {renderTable()}
    </div>
  );
};

export default Profiles;
