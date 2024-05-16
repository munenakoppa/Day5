import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Styles/Registration.module.css";


function Registration() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const [errors, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });



    // define useEffect for the email to validate check email can be considered or not 

    function handleNameChange(e) {
        setUser({
            ...user,
            name: e.target.value
        });
        // email
    }

    function handleEmailChange(e) {
        setUser({
            ...user,
            email: e.target.value
        });
        // verify this email is valida or not
    }

    function handlePhoneChange(e) {

        setUser({
            ...user,
            phone: e.target.value
        });
    }

    function handlePasswordChange(e) {
        setUser({
            ...user,
            password: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(user);

        setError({
            name: '',
            email: '',
            phone: '',
            password: ''
        });

        if (user.name === '') {
            setError((prevState) => ({
                ...prevState,
                name: 'Name is Required'
            }))
        }

        if (user.name.length <= 3) {
            setError((prevState) => ({
                ...prevState,
                name: 'Name has to be more than 3 charaters'
            }))
        }

        if (user.email === '') {
            setError((prevState) => ({
                ...prevState,
                email: 'Email is Required'
            }))
        }
        else {
            let emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!emailFilter.test(user.email)) {
                setError((prevState) => ({
                    ...prevState,
                    email: 'Not a Valid email id'
                }))
            }
        }



        if (user.phone === '') {
            setError((prevState) => ({
                ...prevState,
                phone: 'Phone is Required'
            }))
        }
        else {
            //validation will check +XX-XXXXX-XXXXX kind of expression
            let phoneFilter = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;;
            if (!phoneFilter.test(user.phone)) {
                setError((prevState) => ({
                    ...prevState,
                    phone: 'Not a Valid Phone No.'
                }))
            }
        }

        if (user.password === '') {
            setError((prevState) => ({
                ...prevState,
                password: 'Password is Required'
            }))
        }
        else {
            let passwordFilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordFilter.test(user.password)) {
                setError((prevState) => ({
                    ...prevState,
                    password: 'Password is not Strong - Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
                }))
            }
        }



    }

    useEffect(() => {
        if (errors.name === '' && errors.email === '' && errors.phone === '' && errors.password === '' && user.name != '') {
            var config = {
                method: 'post',
                url: 'http://localhost:5000/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            };

            axios.get("http://localhost:5000/api/users/" + user.name)
                .then((response) => {
                    console.log(response);
                    alert('User ' + user.name + ' already exist in the system');
                }).catch((error) => {
                    console.log(error.response);
                    if (error?.response?.data?.message != undefined && error?.response?.data?.message == 'User ' + user.name + ' not found') {
                        axios(config)
                            .then(function (response) {
                                console.log(JSON.stringify(response.data));
                                alert('User ' + response.data.name + ' has created successfully');
                                setUser({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    password: ''
                                });

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
        }

    }, [errors]);


    function deleteUser(name) {

        console.log(name);

        var config = {
            method: 'delete',
            url: 'http://localhost:5000/api/users/' + name,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert('User' + name + ' has deleted successfully');
                axios.get("http://localhost:5000/api/users")
                    .then((response) => {
                        //console.log(response.data);
                        setUser(response.data);

                    }).catch((error) => {
                        console.log(error);

                    })
            })
            .catch(function (error) {
                console.log(error);
                alert('User Not present in system');
            });

    }


    function updateUser() {

    }



    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    value={user.name}
                    onChange={handleNameChange}

                />
                {errors.name && <span className={styles.error} >{errors.name}</span>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={user.email}
                    onChange={handleEmailChange}

                />
                {errors.email && <span className={styles.error} >{errors.email}</span>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>Phone (+XX-XXXXX-XXXXX):</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    value={user.phone}

                    onChange={handlePhoneChange}

                />
                {errors.phone && <span className={styles.error} >{errors.phone}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={user.password}

                    onChange={handlePasswordChange}

                />
                {errors.password && <span className={styles.error} >{errors.password}</span>}
            </div>
            <button type="submit" className={styles.submitButton}
            >Register</button>
            <br />
            <button type="button" className={styles.submitButton} onClick={() => deleteUser(user.name)}
            >Delete User</button>

            <br />
            <button type="button" className={styles.submitButton} onClick={updateUser}
            >Update User</button>
        </form>
    );

}

export default Registration;