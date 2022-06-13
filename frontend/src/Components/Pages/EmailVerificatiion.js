import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import success from "../../images/success.png";

function EmailVerificatiion() {

      const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

      useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
				const data = await axios.get(url);
				// console.log(data);
				setValidUrl(true);
			} catch (error) {
				// console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

  return (
        <div className='container'>
      {validUrl ? (
            <div className="container">
                  <img src={success} alt="success_img"  />
                  <h1 className='text-success'>Email verified successfully</h1>
                  <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                  </Link>
            </div>
      ) : (
            <h1 className='text-danger'>404 Not Found</h1>
      )}
      </div>
  )
}

export default EmailVerificatiion