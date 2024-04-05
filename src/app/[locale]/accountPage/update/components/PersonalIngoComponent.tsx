import React, { MouseEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import styles from '@/app/[locale]/accountPage/update/update.module.css'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCountries } from '@/app/services/getCountriesService';
import { User, updateUser } from '@/app/services/updateUserService';
import { Session } from 'inspector';
import { getSession, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

type PersonalInfoComponentProps = {
    userToken: string | "";
    isEditing: string | null;
    validateForm: () => void;
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    phone: string;
    setPhone: (value: string) => void;
    address: string;
    setAddress: (value: string) => void;
    setCountryCode: (value: string) => void;
    countryCode: string;
    setCountryName: (value: string) => void;
    phoneNumber: string;
    setError1: (value: string) => void;
    errors: { [key: string]: string | null };
    error1: string | null;
    setPhoneNumber: (value: string) => void;
    setIsEditing: (value: string | null) => void;
};

interface Country {
    name: string;
    phoneCode: string;
}

const PersonalInfoComponent: React.FC<PersonalInfoComponentProps> = ({ userToken, setIsEditing, setPhoneNumber, phoneNumber, countryCode, errors, setCountryCode, setCountryName, setError1, error1, isEditing, validateForm, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, address, setAddress }) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [countries, setCountries] = useState<Country[]>([]);
    const [inputValue, setInputValue] = useState(phoneNumber);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [tempFirstName, setTempFirstName] = useState(firstName);
    const [tempLastName, setTempLastName] = useState(lastName);
    const [tempAddress, setTempAddress] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [tempCountryCode, setTempCountryCode] = useState('');
    let { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
    const [user, setUser] = useState<User>({
        Id: 0,
        Name: '',
        Password: '',
        Email: '',
        Address: '',
        PhoneNumber: '',
        DateOfBirth: new Date(),
        AirbnbRegistrationYear: new Date(),
        ProfilePicture: '',
        CurrentStatus: false,
        UserStatus: false,
        RefreshToken: '',
        Language: '',
        Country: '',
    });
    const EditName = () => {
        setIsEditing('name');
        setTempFirstName(firstName);
        setTempLastName(lastName);
    };
    const resetFormName = () => {
        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setFirstNameError(false);
        setLastNameError(false);
        setIsEditing(null);
    };
    const resetFormPhone = () => {
        setError1('');
        setIsEditing(null);
        setInputValue(tempPhone);
        setCountryCode(tempCountryCode);
    };

    const EditPhone = () => {
        setTempPhone(inputValue);
        setTempCountryCode(countryCode);
        setIsEditing('phone');
    };

    const resetFormAdress = () => {
        setError1('');
        setIsEditing(null);
        setAddress(tempAddress);
    };

    const EditAdress = () => {
        setTempAddress(address);
        setIsEditing('address');
    };
    const handleEdit = () => {
        setIsEditing(null);
    };
    const saveNameUser = async () => {
        if (firstName.trim() === '' || lastName.trim() === '') {
            if (firstName.trim() === '') {
                setFirstNameError(true);
            }
            if (lastName.trim() === '') {
                setLastNameError(true);
            }
            return;
        }

        const updatedUser = {
            ...user,
            Name: firstName + ' ' + lastName,
            Email: email,
            Address: address,
            PhoneNumber: inputValue,
        };

        setUser(updatedUser);

        try {
            const response = await updateUser(updatedUser, userToken);
            console.log(response);
            if (response?.token && response.refreshToken) {
                const { token, refreshToken } = response;
                await signIn(
                    'credentials',
                    {
                        token: token,
                        refreshToken: refreshToken,
                        redirect: false,
                    }
                )
            }
            setIsEditing(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const savePhoneUser = async () => {

        const phoneNumber = inputValue.substring(countryCode.length);
        if (!phoneNumber) {
            setError1(t('emptyField'));
            return;
        }
        const updatedUser = {
            ...user,
            Name: firstName + ' ' + lastName,
            Email: email,
            Address: address,
            PhoneNumber: inputValue,
        };

        setUser(updatedUser);
        try {
            const response = await updateUser(updatedUser, userToken);
            if (response?.token && response.refreshToken) {
                const { token, refreshToken } = response;
                await signIn(
                    'credentials',
                    {
                        token: token,
                        refreshToken: refreshToken,
                        redirect: false,
                    }
                )
            }
            setIsEditing(null);

        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const saveAdressUser = async () => {
        const updatedUser = {
            ...user,
            Name: firstName + ' ' + lastName,
            Email: email,
            Address: address,
            PhoneNumber: inputValue,
        };

        setUser(updatedUser);

        try {
            const response = await updateUser(updatedUser, userToken);
            if (response?.token && response.refreshToken) {
                const { token, refreshToken } = response;
                await signIn(
                    'credentials',
                    {
                        token: token,
                        refreshToken: refreshToken,
                        redirect: false,
                    }
                )
            }
            setIsEditing(null);

        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    useEffect(() => {
        const initialCountryCode = phoneNumber.substring(0, 3);
        setInputValue(phoneNumber);
        setCountryCode(initialCountryCode);
    }, []);
    useEffect(() => {
        setInputValue(phoneNumber);
    }, [phoneNumber]);
    useEffect(() => {
        getCountries().then(setCountries);
    }, []);
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        if (countries) {
            const matchingCountry = countries.find(country => phoneNumber.startsWith(country.phoneCode));
            if (matchingCountry) {
                setCountryCode(matchingCountry.phoneCode);
            }
        }
    }, [phoneNumber, countries]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleWindowResize);

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }
    }, []);
    const { t } = useTranslation();
    return (<div className={`${styles.contentContainer} ${styles.itemFont}`}>
        <div className={styles.innerContainer} style={{ position: 'relative', minWidth: '530px' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', justifyContent: 'flex-start' }}>
                <a href="/accountPage" style={{ color: 'black' }}>{t('Account')}</a> <ChevronRight style={{ margin: '0 1em' }} /> {t('personalInfo')}
            </div>
            <h2 style={{ marginTop: '15px', marginBottom: '50px' }}> {t('personalInfo')} </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <div>
                    <div className={`${styles.infoSection} ${styles.infoSectionCustom} `} style={{ color: isEditing && isEditing !== 'name' ? 'lightgray' : 'black' }}>
                        <div style={{ fontSize: '20px' }}>{t('documentName')} </div>
                        {isEditing === 'name' ? (
                            <div style={{ fontSize: '13px' }}>
                                <p>{t('documentNameDescription')} </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Form.Floating className="mb-3" style={{ width: '50%', marginRight: '2%' }}>
                                        <Form.Control
                                            id="floatingInput"
                                            type="text"
                                            placeholder={t('firstName')}
                                            value={firstName}
                                            onChange={e => {
                                                setFirstName(e.target.value);
                                                setFirstNameError(false);
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === ' ') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onPaste={e => {
                                                e.preventDefault();
                                            }}
                                        />
                                        <label htmlFor="floatingInput">{t('firstName')}</label>
                                        {firstNameError && <p style={{ color: 'red' }}>{t('emptyField')}</p>}
                                    </Form.Floating>

                                    <Form.Floating className="mb-3" style={{ width: '50%' }}>
                                        <Form.Control
                                            id="floatingPassword"
                                            type="text"
                                            placeholder={t('lastName')}
                                            value={lastName}
                                            onChange={e => {
                                                setLastName(e.target.value);
                                                setLastNameError(false);
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === ' ') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onPaste={e => {
                                                e.preventDefault();
                                            }}
                                        />
                                        <label htmlFor="floatingPassword">{t('lastName')}</label>
                                        {lastNameError && <p style={{ color: 'red' }}>{t('emptyField')}</p>}
                                    </Form.Floating>
                                </div>
                                <Button variant="dark" style={{ borderRadius: '5px' }} onClick={saveNameUser}>{t('save')}</Button>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={resetFormName}>{t('cancel')}</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                <p>{firstName} {lastName}</p>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: isEditing && isEditing !== 'name' ? 'lightgray' : 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={EditName} disabled={Boolean(isEditing && isEditing !== 'name')}>{t('edit')}</button>
                            </div>
                        )}
                    </div>


                    <hr />

                    <div className={`${styles.infoSection} ${styles.infoSectionCustom}`} style={{ color: isEditing && isEditing !== 'email' ? 'lightgray' : 'black' }}>
                        <div style={{ fontSize: '20px' }}>{t('emailAddress')}</div>
                        {isEditing === 'email' ? (
                            <div style={{ fontSize: '13px' }}>
                                <strong><p>{t('contactAdminToChangeEmail')}</p></strong>
                                <Form.Floating className="mb-3" style={{ width: '100%' }}>
                                    <Form.Control
                                        id="floatingEmail"
                                        type="email"
                                        placeholder={t('emailAddress')}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled
                                    />
                                    <label htmlFor="floatingEmail">{t('emailAddress')}</label>
                                </Form.Floating>
                                <Button variant="dark" style={{ borderRadius: '5px' }} disabled >{t('save')}</Button>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleEdit}>{t('cancel')}</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                <p>{email}</p>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: isEditing && isEditing !== 'email' ? 'lightgray' : 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setIsEditing('email')} disabled={Boolean(isEditing && isEditing !== 'email')}>{t('edit')}</button>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className={`${styles.infoSection} ${styles.infoSectionCustom}`} style={{ color: isEditing && isEditing !== 'phone' ? 'lightgray' : 'black' }}>
                        <div style={{ fontSize: '20px' }}>{t('phoneNumber')}</div>
                        {isEditing === 'phone' ? (
                            <div style={{ fontSize: '13px' }}>

                                <Form.Select
                                    id="floatingSelect"
                                    className="my-2"
                                    aria-label="Default select example"
                                    value={countryCode}
                                    onChange={(e) => {
                                        const newCountryCode = e.target.value;
                                        const newInputValue = inputValue.startsWith(countryCode)
                                            ? newCountryCode + inputValue.substring(countryCode.length)
                                            : newCountryCode + inputValue;
                                        setCountryCode(newCountryCode);
                                        setInputValue(newInputValue);
                                        setError1("");
                                    }}
                                >
                                    <option disabled value="">{t('selectCountry')}</option>
                                    {countries && countries.map((country) => (
                                        <option
                                            key={country.phoneCode}
                                            value={country.phoneCode}
                                            data-name={country.name}
                                        >
                                            {country.name} ({country.phoneCode})
                                        </option>
                                    ))}
                                </Form.Select>
                                <label htmlFor="floatingSelect">{t('selectCountryCode')}</label>
                                {errors.country && <p className="text-danger">{errors.country}</p>}
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="floatingPhone"
                                        type="text"
                                        placeholder={countryCode}
                                        value={inputValue}
                                        autoComplete="off"
                                        maxLength={14}
                                        onChange={e => {
                                            const value = e.target.value;
                                            if (value.startsWith(countryCode) && /^\d*$/.test(value.substring(countryCode.length))) {
                                                setInputValue(value);
                                            }
                                        }}
                                    />
                                    <label htmlFor="floatingPhone">{t('phone')}</label>
                                </Form.Floating>
                                {error1 && <p className="text-danger">{error1}</p>}
                                <Button variant="dark" style={{ borderRadius: '5px' }} onClick={savePhoneUser}>{t('save')}</Button>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={resetFormPhone}>{t('cancel')}</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                <p>{phoneNumber}</p>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: isEditing && isEditing !== 'phone' ? 'lightgray' : 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={EditPhone} disabled={Boolean(isEditing && isEditing !== 'phone')}>{t('edit')}</button>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className={`${styles.infoSection} ${styles.infoSectionCustom}`} style={{ color: isEditing && isEditing !== 'address' ? 'lightgray' : 'black' }}>
                        <div style={{ fontSize: '20px' }}>{t('address')}</div>
                        {isEditing === 'address' ? (
                            <div style={{ fontSize: '13px' }}>
                                <Form.Floating className="mb-3" style={{ width: '100%' }}>
                                    <Form.Control
                                        id="floatingAddress"
                                        type="text"
                                        placeholder={t('address')}
                                        value={address}
                                        onChange={e => {
                                            setAddress(e.target.value);
                                            if (!e.target.value.trim()) {
                                                setError1(t('emptyField'));
                                            } else {
                                                setError1('');
                                            }
                                        }}
                                    />
                                    <label htmlFor="floatingAddress">{t('address')}</label>
                                </Form.Floating>
                                {error1 && <p className="text-danger">{error1}</p>}
                                <Button variant="dark" style={{ borderRadius: '5px' }} onClick={saveAdressUser}>{t('save')}</Button>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={resetFormAdress}>{t('cancel')}</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                <p>{address}</p>
                                <button style={{ position: 'absolute', right: 0, top: 0, margin: '0 0 0 2em', color: isEditing && isEditing !== 'address' ? 'lightgray' : 'black', backgroundColor: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} onClick={EditAdress} disabled={Boolean(isEditing && isEditing !== 'address')}>{t('edit')}</button>
                            </div>
                        )}
                    </div>
                </div>
                {windowWidth > 900 && (
                    <div style={{
                        width: windowWidth > 600 ? '350px' : '100%',
                        marginLeft: '30px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px'
                    }}>
                        <img src="/icon/protect.svg" alt="Protect" width="50px" height="50px" style={{ marginBottom: '10px' }} />
                        <h4>{t('whyNoData')}</h4>
                        <p>{t('hideInfo')}</p>
                        <hr />
                        <img src="/icon/lock.svg" alt="Lock" width="50px" height="50px" style={{ marginBottom: '10px' }} />
                        <h4>{t('whatCanBeEdited')}</h4>
                        <p>{t('editInfo')}</p>
                        <hr />
                        <img src="/icon/eye.svg" alt="Eye" width="50px" height="50px" style={{ marginBottom: '10px' }} />
                        <h4>{t('whatIsAvailable')}</h4>
                        <p>{t('airbnbShares')}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default PersonalInfoComponent;