import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@mantine/core';
import { AppContainer } from 'components/app/AppContainer';
import { Layout } from 'components/app/Layout';
import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { ServerSideTranslations } from 'src/config';
import { typedServerSideTranslations } from 'src/util/i18n-server';

const NotFoundPage: NextPage = () => {
  const t = useTranslations();
  return (
    <Layout>
      <AppContainer>
        <Alert color="orange" icon={<FontAwesomeIcon icon="exclamation-triangle" />} title={t('notFound.heading')}>
          {t('notFound.content')}
        </Alert>
      </AppContainer>
    </Layout>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps<ServerSideTranslations> = async ({ locale }) => ({
  props: {
    ...(await typedServerSideTranslations(locale)),
  },
});
