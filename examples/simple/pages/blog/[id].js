import Link from 'next/link'
import { useMemo } from 'react'
import Router, { useRouter } from 'next/router'

import { useTranslation } from '@tkone7/next-i18next'
import { serverSideTranslations } from '@tkone7/next-i18next/serverSideTranslations'

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
            href={ `/blog/${id}` }
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

export const getStaticProps = async ({ locale }) => {
  const ret = {
    props: {
      ...await serverSideTranslations(locale, ['common', 'footer']),
    }
  }
  return ret
}
export async function getStaticPaths() {
  return { paths: [{
    params: {
      id: 'hello-world',
    },
    locale: 'en',
  }, {
    params: {
      id: 'hello-world',
    },
    locale: 'de',
   }, {
    params: {
      id: 'blog-post',
    },
    locale: 'de',
   }, {
    params: {
      id: 'blog-post',
    },
    locale: 'en',
  }
  ], fallback: true }
}
export default Homepage
