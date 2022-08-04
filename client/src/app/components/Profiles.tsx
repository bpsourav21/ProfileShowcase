import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfiles } from "../actions/profileActions";
import { ProfileDto } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";

const Profiles = () => {
  const profiles = useAppSelector((state) => state.profile.profiles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const rowData = profiles.map((profile: ProfileDto, i: number) => {
    return (
      <tr key={"item_" + (i + 1)}>
        <td>{profile.id}</td>
        <td>{profile.name}</td>
        <td>{profile.age}</td>
        <td>{profile.profilePicture}</td>
        <td className="text-center">
          <Link to={"/edit-profile/" + profile.id}>
            <i className="fas fa-edit"></i>
          </Link></td>
      </tr>
    );
  });

  const table = (
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Profile Picture</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>{rowData}</tbody>
    </table>
  );

  return (
    <div className="page">
      <h1>Profile Information</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/add-profile")}>Add Profile</button>
      </div>
      {table}
    </div>
  );
};

export default Profiles;
