import { useEffect } from "react";
import { getProfiles } from "../actions/profileActions";
import { ProfileDto } from "../dtos/profile";
import { useAppSelector, useAppDispatch } from "../hooks";

const Profiles = () => {
  const profiles = useAppSelector((state) => state.profile.profiles);
  const dispatch = useAppDispatch();
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
        </tr>
      </thead>
      <tbody>{rowData}</tbody>
    </table>
  );

  return (
    <div className="page">
      <h1>Profile Information</h1>
      {table}
    </div>
  );
};

export default Profiles;
