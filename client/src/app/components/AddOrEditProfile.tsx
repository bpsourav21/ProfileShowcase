const AddOrEditProfile = () => {
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
                <input type="name" className="form-control" id="inputName" placeholder="Enter name" />
              </div>
            </div>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="inputAge">Age</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="inputAge" placeholder="Enter name" />
              </div>
            </div>
            <div className="form-group row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="controlFile">Profile Picture</label>
              <div className="col-sm-10">
                <input type="file" className="form-control-file" id="controlFile" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          <form>
            <div className="form row mb-3 mt-3">
              <div className="col">
                <input type="text" className="form-control" placeholder="Job Title" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Company name" />
              </div>
            </div>
            <div className="form row mb-3 mt-3">
              <div className="col">
                <input type="text" className="form-control" placeholder="Job Description" />
              </div>
            </div>
            <div className="form row mb-3 mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="controlFile">Company Logo</label>
              <div className="col-sm-10">
                <input type="file" className="form-control-file" id="controlFile" />
              </div>
            </div>
            <div className="form row mb-3 mt-3">
              <div className="col">
                <input type="date" className="form-control" placeholder="Start Date" />
              </div>
              <div className="col">
                <input type="date" className="form-control" placeholder="End Date" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}


export default AddOrEditProfile;
