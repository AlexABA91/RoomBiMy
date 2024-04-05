"use client"
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import { HomeParams } from '@/app/type/type'
import styles from './update.module.css'
import { HeaderUpdateUser } from '../components/HeadUpdateUser'
import { useState, useEffect } from 'react';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { useSession } from 'next-auth/react';
import { t } from 'i18next'
import PersonalInfoComponent from '@/app/[locale]/accountPage/update/components/PersonalIngoComponent';
import { Session } from 'next-auth';
import NeedAuthPage from '@/app/[locale]/needAuthPage';
import { getUser } from '@/app/services/getUserService'
const i18nNamespaces = ['translation']

export default function UpdateUser({
  params: { locale },
}: {
  params: HomeParams
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resources, setResources] = useState(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [countryName, setCountryName] = useState('');
  const [error1, setError1] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ names?: string | null, phone?: string | null, country?: string | null }>({});

  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };

  const validateNames = () => {
    if (!firstName || !lastName) return t('namesRequired');
    return null;
  };

  // useEffect(() => {
  //   if (loading === 'authenticated' && session) {
  //     const token = session?.user?.name;
  
  //     getUser(token || '')
  //       .then(userDetails => {
  //         console.log('userDetails', userDetails);
  //         if (userDetails) {
  //           const [firstName, lastName] = userDetails.name.split(' ');
  //           setFirstName(firstName);
  //           setLastName(lastName);
  //           setEmail(userDetails.email);
  //           setAddress(userDetails.address);
  //           setPhoneNumber(userDetails.phoneNumber);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Failed to get user details:', error);
  //       });
  //   }
  // }, []);


  useEffect(() => {
    if (loading === 'authenticated' && session) {
      const token = session?.user?.name;

      const userDetails = decodeTokenAndGetUserDetails(token || '');
      console.log('userDetails', userDetails);
      if (userDetails) {
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setEmail(userDetails.email);
        setAddress(userDetails.address);
        setPhoneNumber(userDetails.phoneNumber);
      }
    }
  }, [session, loading, phoneNumber]);

  const validateForm = () => {
    const namesError = validateNames();
    const phoneError = !phone || phone === countryCode ? t('phoneRequired') : null;
    const countryError = !countryCode || !countryName ? t('countryRequired') : null;

    setErrors({
      names: namesError,
      phone: phoneError,
      country: countryError
    });
  };


  useEffect(() => {
    const fetchResources = async () => {
      const res = await initTranslations(locale, ['translation']);
      setResources(res.resources);
    };

    fetchResources();
  }, [locale]);

  if (!resources) {
    return null;
  }
  if (!session?.user) {
    return (
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <div >
          <div >
            <HeaderUpdateUser />
          </div>
          <NeedAuthPage />;
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>

      </TranslationsProvider>
    )
  }
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className='header-main'>
        <HeaderUpdateUser />
      </div>
      <div className={styles.pageContainer}>
        <PersonalInfoComponent
          setIsEditing={setIsEditing}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          errors={errors}
          setCountryCode={setCountryCode}
          setCountryName={setCountryName}
          setError1={setError1}
          error1={error1}
          isEditing={isEditing}
          validateForm={validateForm}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          userToken={session?.user?.name || ''}
        />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </TranslationsProvider>
  )
}
