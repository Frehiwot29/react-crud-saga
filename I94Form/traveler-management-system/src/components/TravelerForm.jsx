import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitTravelerRequest } from "../redux/actions";
import { useNavigate } from "react-router-dom";



const TravelerForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, traveler } = useSelector((state) => state.travelerState);
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        dob: "",
        citizenship: "",
        sex: "",
        residency: "",
        documentType: "passport",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitTravelerRequest(form));
        console.log("Submitted Data:", form);
    }
    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Traveler Form</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="form-group">
                    <label>First Name</label>
                    <input name="fname" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input name="lname" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Citizenship</label>
                    <input name="citizenship" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Sex</label>
                    <select name="sex" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Residency</label>
                    <input name="residency" onChange={handleChange} />
                </div>

                {/* Footer Section */}
                <div className="document-section border-t pt-4">
                    <label className="font-semibold">Document Information</label>
                    <div className="radio-group flex gap-4 mt-2">
                        <label>
                            <input
                                type="radio"
                                name="documentType"
                                value="passport"
                                checked={form.documentType === "passport"}
                                onChange={handleChange}
                            /> Passport
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="documentType"
                                value="bcc"
                                checked={form.documentType === "bcc"}
                                onChange={handleChange}
                            /> Border Crossing Card
                        </label>
                    </div>
                </div>
                <div className="button-container">
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>
                    <button type="submit" className="button">
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

            </form>
            {traveler && (
                <div className="mt-4 p-3 bg-green-100">
                    <p>Submitted Successfully!</p>
                </div>
            )}
        </div>
    );
}
export default TravelerForm;