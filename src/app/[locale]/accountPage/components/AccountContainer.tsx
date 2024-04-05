import React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonVcard } from 'react-bootstrap-icons';
import styles from '@/app/[locale]/accountPage/account.module.css'

type AccountContainerProps = {
  userDetails: {
    name: string;
    email: string;
  };
};

const AccountContainer: React.FC<AccountContainerProps> = ({ userDetails }) => {
  const { t } = useTranslation();

  return (
  <div className={styles.accountContainer}>
<div className={styles.accountInfo}>
  <h1>{t('Account')}</h1>
  <p>{userDetails.name}, {userDetails.email} · <a href="/profilePage" style={{ color: 'black', textDecoration: 'underline' }}>{t('Go to profile')}</a></p>
</div>
<div className={styles.container}>
  <div className={styles.card}>
    <a href="/accountPage/update" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <PersonVcard size={35} />
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{t('Personal Information')}</div>
        <div>{t('Provide Personal and Contact Information')}</div>
      </div>
    </a>
  </div>
  <div className={styles.card}>
    
  </div>
  <div className={styles.card}>
    
  </div>
</div>

<div className={`${styles.container} ${styles.marginTop}`}>
  <div className={styles.card}>
    
  </div>
  <div className={styles.card}>
    
  </div>
  <div className={styles.card}>
    
  </div>
</div>
</div >
 );
};

export default AccountContainer;