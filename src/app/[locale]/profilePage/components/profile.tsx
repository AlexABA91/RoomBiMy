import React from 'react';
import styles from './profile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { User, updateUser } from '@/app/services/updateUserService';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import Link from 'next/link';
interface ProfileProps {
  locale: string;
}
const Profile: React.FC<ProfileProps> = ({ locale }) => {
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
  const [userDetails, setUserDetails] = useState({ name: '', email: '', yearsOnSite: '' });
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }

      const token = session?.user?.name;
      const details = decodeTokenAndGetUserDetails(token || '');
      console.log('details', details);
      let userDetails = { name: '', email: '', yearsOnSite: '' };

      if (details) {
        if (details.firstName && details.lastName) {
          userDetails = {
            name: `${details.firstName} ${details.lastName}`,
            email: details.email,
            yearsOnSite: userDetails.yearsOnSite
          };
        } else {
          userDetails = {
            name: '',
            email: details.email,
            yearsOnSite: userDetails.yearsOnSite
          };
        }
        const registrationDate = new Date(details.airbnbRegistrationYear);
        const now = new Date();
        // const years = differenceInYears(now, registrationDate);
        // const months = differenceInMonths(now, registrationDate) % 12;
        // const days = differenceInDays(now, registrationDate) % 365 % 30;

        const years = differenceInYears(now, registrationDate);
        const dateAfterYears = addYears(registrationDate, years);

        const months = differenceInMonths(now, dateAfterYears);
        const dateAfterMonths = addMonths(dateAfterYears, months);

        const days = differenceInDays(now, dateAfterMonths);

        let yearsText = years === 1 ? 'year' : 'years';
        let monthsText = months === 1 ? 'month' : 'months';
        let daysText = days === 1 ? 'day' : 'days';

        if (locale === 'ua') {
          let lastDigit, lastTwoDigits;

          lastDigit = years % 10;
          lastTwoDigits = years % 100;
          if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            yearsText = 'років';
          } else if (lastDigit === 1) {
            yearsText = 'рік';
          } else if (lastDigit > 1 && lastDigit < 5) {
            yearsText = 'роки';
          } else {
            yearsText = 'років';
          }

          lastDigit = months % 10;
          lastTwoDigits = months % 100;
          if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            monthsText = 'місяців';
          } else if (lastDigit === 1) {
            monthsText = 'місяць';
          } else if (lastDigit > 1 && lastDigit < 5) {
            monthsText = 'місяці';
          } else {
            monthsText = 'місяців';
          }

          lastDigit = days % 10;
          lastTwoDigits = days % 100;
          if (lastTwoDigits > 10 && lastTwoDigits < 20) {
            daysText = 'днів';
          } else if (lastDigit === 1) {
            daysText = 'день';
          } else if (lastDigit > 1 && lastDigit < 5) {
            daysText = 'дні';
          } else {
            daysText = 'днів';
          }
        }

        if (years > 0) {
          userDetails.yearsOnSite = `${years} ${yearsText}`;
        } else if (months > 0) {
          userDetails.yearsOnSite = `${months} ${monthsText}`;
        } else if (days > 0) {
          userDetails.yearsOnSite = `${days} ${daysText}`;
        } else if (days === 0) {
          userDetails.yearsOnSite = `${1} ${'day'}`;
        }
      }
      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, [loading, session]);


  return (
    <div className={styles['grid-container']}>
      <div className={`${styles.card} ${styles.card1} ${styles.roundedShadow}`}>
        <div
        >
          <div className={styles.circle}>
            <h1 className={styles.centerAlign}>{userDetails.name.charAt(0)}</h1>
          </div>
          <div className={styles.centerAlign}>{userDetails.name}</div>
          <p className={styles.centerAlign}>Гость</p>
        </div>
        <div className={`${styles.rightSide} ${styles.centerContent}`}>
          <div className={styles.rightAlign}>{userDetails.yearsOnSite}</div>
          <div className={styles.rightAlign}>на сайте RoomBi</div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card2} ${styles.topMarginLine}`}>
        <h2>Самое время заполнить профиль</h2>
        <p>Профиль на Roombi — важный элемент любого бронирования. Расскажите о себе. Это важно и другим гостям, и хозяевам.</p>
        <Link href="/editProfile">
  <button className="btn btn-danger" style={{ alignSelf: 'flex-start' }}>Создать профиль</button>
</Link>
      </div>
    </div>
  );
};

export default Profile;