import { Card, Group, Text } from '@mantine/core';
import { ExternalLink } from 'components/ExternalLink';
import styles from 'modules/UsefulLinks.module.scss';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FC, memo, ReactNode, useMemo } from 'react';
import { TFunction } from 'src/config';
import betaSite from '../../public/betasite.png';
import bot from '../../public/bot.png';
import server from '../../public/server.png';
import subreddit from '../../public/subreddit.png';
import textColor from '../../public/textcolor.png';

interface UsefulLink {
  href: string;
  image: StaticImageData;
  name: ReactNode;
  desc: ReactNode;
  local?: boolean;
}

const UsefulLinksComponent: FC<{ t: TFunction; language: string | undefined }> = ({ t, language }) => {
  const components: UsefulLink[] = useMemo(
    () => [
      {
        href: '/discord',
        image: server,
        name: t('usefulLinks.server.header'),
        desc: t('usefulLinks.server.p'),
      },
      {
        href: '/add-bot',
        image: bot,
        local: true,
        name: t('usefulLinks.bot.header'),
        // eslint-disable-next-line react/no-unstable-nested-components
        desc: t.rich('usefulLinks.bot.pWithoutCommand', { one: (chunks) => <code dir="ltr">{chunks}</code> }),
      },
      {
        href: `https://beta.hammertime.cyou/${language || ''}`,
        image: betaSite,
        name: t('usefulLinks.betaSite.header'),
        desc: t('usefulLinks.betaSite.p'),
      },
      {
        href: 'https://rebane2001.com/discord-colored-text-generator/',
        image: textColor,
        // eslint-disable-next-line react/no-unstable-nested-components
        name: t.rich('usefulLinks.textColor.header', { one: (chunks) => <span style={{ color: '#7781ee' }}>{chunks}</span> }),
        desc: t('usefulLinks.textColor.p'),
      },
      {
        href: 'https://reddit.com/r/SplitSecond',
        image: subreddit,
        name: t('usefulLinks.subreddit.header'),
        desc: t('usefulLinks.subreddit.p'),
      },
    ],
    [language, t],
  );

  return (
    <Group position="center" align="stretch">
      {components.map(({ href, image, name, desc, local }) => {
        const WrapperEl = local ? Link : ExternalLink;
        return (
          <div key={href} className={styles.link}>
            <WrapperEl href={href} target="_blank" className={styles['link-wrap']}>
              <Card shadow="sm" p="lg" className={styles['link-card']}>
                <Card.Section className={styles['card-top-half']}>
                  <Image src={image} alt="" fill />
                </Card.Section>

                <div className={styles['card-bottom-half']}>
                  <Text className={styles['link-name']}>{name}</Text>

                  <Text size="sm" className={styles['link-desc']}>
                    {desc}
                  </Text>
                </div>
              </Card>
            </WrapperEl>
          </div>
        );
      })}
    </Group>
  );
};

export const UsefulLinks = memo(UsefulLinksComponent);
