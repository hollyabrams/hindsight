import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody} from 'reactstrap';

/** User register form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls register function prop
 * - redirects to /home route
 *
 * Routes -> RegisterForm
 * Routed as /register
 */

const RegisterForm = ({ register }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    'RegisterForm',
    'register=',
    typeof register,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /dashboard.
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      let result = await register(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        // imperatively redirect to correct page and refresh to see new data
        navigate.push('/');
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="Register mx-auto mt-5 flex flex-col items-center justify-center w-full md:w-6/12 lg:w-6/12 p-8 min-w-full md:min-w-3/4 lg:min-w-3/4">
    <Card className="rounded overflow-hidden shadow-lg">
      <CardBody className="px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          {['username', 'password', 'firstName', 'lastName', 'email'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          {formErrors && <p className="text-red-500 text-xs italic">{formErrors}</p>}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Register
          </button>
        </form>
      </CardBody>
    </Card>
  </div>
  );
};

export default RegisterForm;