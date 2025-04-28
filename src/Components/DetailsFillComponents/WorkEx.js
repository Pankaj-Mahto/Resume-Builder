import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BottomNavigation from './BottomNavigation';
import TextField from '../InputComponents/TextField';
import TextArea from '../InputComponents/TextArea';
import { updateWorkEx, addArrayElement, removeArrayElement, updateErrorMessages } from '../../ReduxManager/dataStoreSlice';
import { generateWorkDescription } from '../../api/generateDescription';

function WorkEx(props) {
  const workHeads = useSelector((state) => state.dataStore.workEx);
  const dispatch = useDispatch();
  const [loadingIndex, setLoadingIndex] = useState(null);

  const onChangeHandler = (key, value, index, errorMessage = undefined) => {
    dispatch(updateWorkEx({ key, value, index }));
    if (errorMessage !== undefined) {
      dispatch(updateErrorMessages({ key, value: errorMessage, index }));
    }
  };

  const AddExperience = () => {
    dispatch(addArrayElement({
      key: 'workEx',
      element: { title: '', orgName: '', startYear: '', endYear: '', jobDescription: '' },
    }));
  };

  const RemoveExperience = () => {
    dispatch(removeArrayElement({ key: 'workEx' }));
    dispatch(updateErrorMessages({ key: 'title', value: '', index: workHeads.length - 1 }));
    dispatch(updateErrorMessages({ key: 'orgName', value: '', index: workHeads.length - 1 }));
  };

  const yearRange = (start, end) => {
    const ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  };
  const years = yearRange(2000, 2030);

  const handleGenerateDescription = async (index) => {
    const jobTitle = workHeads[index]?.title;

    if (!jobTitle) {
      alert("Please enter a Job Title first.");
      return;
    }

    try {
      setLoadingIndex(index);
      const generatedDesc = await generateWorkDescription(jobTitle);
      console.log("Generated Description:", generatedDesc);

      if (generatedDesc && generatedDesc.trim() !== "") {
        dispatch(updateWorkEx({ key: "jobDescription", value: generatedDesc.trim(), index }));
      } else {
        alert("Failed to generate description. Please try again.");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Error generating description. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="p-5" style={{ textAlign: 'left' }}>
      <h2>Work Experience</h2>
      {workHeads.map((workHeading, index) => (
        <div key={index}>
          <div className="container p-2 font" style={{ textAlign: 'left' }}>
            <h5>Experience {index + 1}</h5>
            <hr />
            <div className="row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <label htmlFor={`title-${index}`} className="col-sm-12 col-12">
                  Job Title*
                  <TextField
                    type="text"
                    elementId={`title-${index}`}
                    placeholder="Enter Job Title"
                    value={workHeading.title}
                    onChange={(value, errorMessage) => onChangeHandler('title', value, index, errorMessage)}
                    validation={{ required: true }}
                  />
                </label>
              </div>

              <div className="col-lg-6 col-12 pt-5 px-4">
                <label htmlFor={`orgName-${index}`} className="col-sm-12 col-12">
                  Organization Name*
                  <TextField
                    type="text"
                    elementId={`orgName-${index}`}
                    placeholder="Enter Organization Name"
                    value={workHeading.orgName}
                    onChange={(value, errorMessage) => onChangeHandler('orgName', value, index, errorMessage)}
                    validation={{ required: true }}
                  />
                </label>
              </div>
            </div>

            <div className="row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <label htmlFor={`startYear-${index}`} className="col-sm-12 col-12 col-form-label">
                  Start year
                  <select
                    id={`startYear-${index}`}
                    className="form-control"
                    value={workHeading.startYear}
                    onChange={(e) => dispatch(updateWorkEx({ key: 'startYear', value: e.target.value, index }))}>
                    <option>Select year</option>
                    {years.map((yr, i) => (
                      <option key={i} value={yr}>{yr}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="col-lg-6 col-12 pt-5 px-4">
                <label htmlFor={`endYear-${index}`} className="col-sm-12 col-12 col-form-label">
                  End year
                  <select
                    id={`endYear-${index}`}
                    className="form-control"
                    value={workHeading.endYear}
                    onChange={(e) => dispatch(updateWorkEx({ key: 'endYear', value: e.target.value, index }))}>
                    <option>Select year</option>
                    {years.map((yr, i) => (
                      <option key={i} value={yr}>{yr}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="form-group row font">
              <div className="col-lg-12 col-12 pt-5 px-4">
                <label htmlFor={`jobDescription-${index}`} className="col-sm-12 col-12 col-form-label">
                  Job Description
                  <TextArea
                    elementId={`jobDescription-${index}`}
                    rows="3"
                    value={workHeading.jobDescription || ""}
                    onChange={(value) => onChangeHandler('jobDescription', value, index)}
                  />
                </label>
              </div>
            </div>

            <div className="text-center my-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleGenerateDescription(index)}
                disabled={loadingIndex === index}
              >
                {loadingIndex === index ? 'Generating...' : 'Generate Description'}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex">
        <button className="btn btn-primary mt-3 me-5 mb-3 ml-1 p-2" onClick={AddExperience}>
          Add new
        </button>
        <button className="btn btn-primary mt-3 ms-5 mb-3 ml-1 p-2" onClick={RemoveExperience}>
          Remove
        </button>
      </div>

      <BottomNavigation prevPagePath="/detailsfillingpage/personalinfo" nextPagePath="/detailsfillingpage/education" isFormValid={props.isFormValid} />
    </div>
  );
}

export default WorkEx;
