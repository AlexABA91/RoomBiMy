"use client"
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import { HomeParams } from '@/app/type/type'
import React, { useEffect, useState } from 'react';
import styles from '@/app/[locale]/accountPage/account.module.css'
import { HeaderUpdateUser } from './components/HeadUpdateUser'
import { useSession } from 'next-auth/react';
import { decodeTokenAndGetUserDetails } from '@/app/services/jwtDecoder'
import AccountContainer from './components/AccountContainer';
import { Session } from 'next-auth';
import NeedAuthPage from '@/app/[locale]/needAuthPage';
const i18nNamespaces = ['translation']

export default function AccountPage({
  params: { locale },
}: {
  params: HomeParams
}) {

  const [resources, setResources] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };


  useEffect(() => {
    const fetchResources = async () => {
      const res = await initTranslations(locale, ['translation']);
      setResources(res.resources);
    };

    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }

      const token = session?.user?.name;
      const details = decodeTokenAndGetUserDetails(token || '');
      console.log('details', details);
      let userDetails = { name: '', email: '' }; 

      if (details) {
        if (details.firstName && details.lastName) {
          userDetails = { name: `${details.firstName} ${details.lastName}`, email: details.email };
        } else {
          userDetails = { name: '', email: details.email }; 
        }
      }


      setUserDetails(userDetails);
    };

    fetchResources();
    fetchUserDetails();
  }, [locale, loading, session]);

  if (!resources) {
    return null; 
  }

  if (!session) {
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
      <div >
        <div >
          <HeaderUpdateUser />
        </div>
        <div className={styles.content}>
          <AccountContainer userDetails={userDetails} />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>

    </TranslationsProvider>
  )
}
