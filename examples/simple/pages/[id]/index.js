import Link from 'next/link'
import { useMemo } from 'react'
import Router, { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const Homepage = () => {

  const {query} = useRouter()
  const { t, i18n } = useTranslation('common')
  const id = useMemo(() => query.id, [query])


  return (
    <>
      <main>
        <Header title={t('dynamic')} />
        <p>
          {id}
        </p>
        <div>
          <Link
            href={ `/${id}` }
            locale={i18n.language === 'en' ? 'de' : 'en'}
          >
            <button>
              {t('change-locale')}
            </button>
          </Link>
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})
export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
export default Homepage
