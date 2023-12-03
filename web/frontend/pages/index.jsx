import {
    Frame,
    Navigation,
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
    Button
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { HomeMinor, MobileHamburgerMajor,
    EditMinor,
    CirclePlusOutlineMinor }
    from '@shopify/polaris-icons';

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import React from 'react';

export default function HomePage() {
  const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/page_builder'); // Replace '/destination-route' with your target route
    };
    const handleNavigation2 = () => {
        navigate('/page_builder_sample'); // Replace '/destination-route' with your target route
    };

    const handleNavigation3 = () => {
        navigate('/page_menu_buider'); // Replace '/destination-route' with your target route
    }
    const handleNavigation4 = () => {
        navigate('/page_notification_form'); // Replace '/destination-route' with your target route
    }
    const handleNavigation5 = () => {
        navigate('/page_app_submission_info'); // Replace '/destination-route' with your target route
    }
    const handleNavigation6 = () => {
        navigate('/page_notification_list'); // Replace '/destination-route' with your target route
    }
  return (
      <Frame>
          <Navigation location="/">
              <Navigation.Section
                  items={[
                      {
                          url: '/', // Update with your actual URL
                          label: 'Home',
                          icon: HomeMinor,
                      },
                      {
                          url: '/page_builder', // Update with your actual URL
                          label: 'Screen Builder',
                          icon: MobileHamburgerMajor, // Choose an appropriate icon
                      },
                      {
                          url: '/page_menu_buider', // Update with your actual URL
                          label: 'Menu Builder',
                          icon: CirclePlusOutlineMinor, // Choose an appropriate icon
                      },
                      {
                          url: '/page_notification_list', // Update with your actual URL
                          label: 'Notifications',
                          icon: EditMinor, // Choose an appropriate icon
                      },
                      {
                          url: '/page_app_submission_info', // Update with your actual URL
                          label: 'App Submission',
                          icon: EditMinor, // Choose an appropriate icon
                      },
                  ]}
              />
          </Navigation>
    <Page >
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Text as="h2" variant="headingMd">
                    {t("HomePage.heading")}
                  </Text>
                    <Button onClick={handleNavigation}>Start Page builder</Button> {/* Add this line */}
                    <Button onClick={handleNavigation2}>Sample Page builder</Button> {/* Add this line */}
                    <Button onClick={handleNavigation3}>Menu Builder</Button> {/* Add this line */}
                    <Button onClick={handleNavigation4}>Noti Form</Button> {/* Add this line */}
                    <Button onClick={handleNavigation5}> App submission </Button> {/* Add this line */}
                    <Button onClick={handleNavigation6}> App NOti list </Button> {/* Add this line */}

                    <p>
                    <Trans
                      i18nKey="HomePage.yourAppIsReadyToExplore"
                      components={{
                        PolarisLink: (
                          <Link url="https://polaris.shopify.com/" external />
                        ),
                        AdminApiLink: (
                          <Link
                            url="https://shopify.dev/api/admin-graphql"
                            external
                          />
                        ),
                        AppBridgeLink: (
                          <Link
                            url="https://shopify.dev/apps/tools/app-bridge"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                </TextContainer>
              </Stack.Item>

            </Stack>
          </Card>
        </Layout.Section>
          <div style={{ display: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

          <Layout.Section>
          <ProductsCard />
        </Layout.Section>
          </div>
      </Layout>
    </Page>
      </Frame>
  );
}
