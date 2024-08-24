import {
    Frame,
    Navigation,
    Card,
    Page,
    Layout,
    TextContainer,
    Button,
    Spinner
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import {
    HomeMinor, MobileHamburgerMajor,
    EditMinor,
    CirclePlusOutlineMinor
} from '@shopify/polaris-icons';
import React, { useState, useEffect } from 'react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

export default function HomePage() {
    const { t } = useTranslation();
    const [shop, setShop] = useState(null);
    const [host, setHost] = useState(null);
    const navigate = useNavigate();
    const app = useAppBridge();

    useEffect(() => {
        function getEncodedStringFromStoreName(storeName) {
            const storeUrl = `admin.shopify.com/store/${storeName}`;
            const encodedString = btoa(storeUrl);
            return encodedString;
        }

        getSessionToken(app).then((token) => {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const hostParamb2 = decodedToken.dest.split('/')[2];
            const hostParamb = hostParamb2.split('.')[0];

            const hostParam = getEncodedStringFromStoreName(hostParamb);
            setHost(hostParam);
            setShop(hostParamb + ".myshopify.com");
        }).catch(console.error);
    }, [app]);

    const buildNavigationPath = (route) => `/${route}/hostz/${host}/shop/${shop}/`;

    const handleNavigation = () => {
        navigate(`/page_builder/hostz/${host}/shop/${shop}/`);
    };

    const handleNavigation3 = () => {
        navigate(`/page_menu_buider/hostz/${host}/shop/${shop}/`);
    }
    const handleNavigation4 = () => {
        navigate(('/page_notification_form'));
    }
    const handleNavigation5 = () => {
        navigate(`/page_app_submission_info/hostz/${host}/shop/${shop}/`);
    }
    const handleNavigation6 = () => {
        navigate(`/page_notification_list/hostz/${host}/shop/${shop}/`);
    }

    function guidePage() {
        return (
            <>
                <Card sectioned>
                    <TextContainer>
                        <h2>Create Screens</h2>
                        <p>Use the drag-and-drop interface to design the screens of your app. You can choose from a variety of templates or start from scratch. Add elements like images, text, buttons, and more by simply dragging them onto your screen layout.</p>
                        <Button onClick={handleNavigation}>Start Creating Screens</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>Design Menus</h2>
                        <p>Similarly, you can create menus for your app. Drag and drop different menu items into your desired order, and customize their appearance to match your brand.</p>
                        <Button onClick={handleNavigation3}>Start Designing Menus</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>Create and Manage Notifications</h2>
                        <p>Effortlessly set up and personalize notifications in a tree view layout to keep your customers informed about the latest products, special offers, and other vital updates.</p>
                        <Button onClick={handleNavigation6}>Manage Notifications</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>App Submission Assistance</h2>
                        <p>After finalizing your app, you have the option to submit it to the Apple App Store and Google Play Store. Our drag-and-drop app builder service includes personalized assistance. Once you're ready to proceed, contact us and we'll guide you through the app submission process for a seamless experience.</p>
                        <Button onClick={handleNavigation5}>Get Submission Assistance</Button>
                    </TextContainer>
                </Card>
            </>
        );
    }

    return (
        <div className="layoutWrapper">
            <Frame>
                {!shop || !host ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spinner accessibilityLabel="Loading" size="large" />
                    </div>
                ) : (
                    <div className="navigationSidebar">
                        <Navigation location="/">
                            <Navigation.Section
                                items={[
                                    {
                                        url: buildNavigationPath('/'),
                                        label: 'Home',
                                        icon: HomeMinor,
                                    },
                                    {
                                        url: buildNavigationPath('/page_builder'),
                                        label: 'Screen Builder',
                                        icon: MobileHamburgerMajor,
                                    },
                                    {
                                        url: buildNavigationPath('/page_menu_buider'),
                                        label: 'Menu Builder',
                                        icon: CirclePlusOutlineMinor,
                                    },
                                    {
                                        url: buildNavigationPath('/page_notification_list'),
                                        label: 'Notifications',
                                        icon: EditMinor,
                                    },
                                    {
                                        url: buildNavigationPath('/page_app_submission_info'),
                                        label: 'App Submission',
                                        icon: EditMinor,
                                    },
                                ]}
                            />
                        </Navigation>
                    </div>
                )}
                {shop && host && (
                    <div className="mainContent">
                        <Page>
                            <TitleBar title={t("HomePage.title")} primaryAction={null} />
                            <Layout>
                                <Layout.Section>
                                    {guidePage()}
                                </Layout.Section>
                            </Layout>
                        </Page>
                    </div>
                )}
            </Frame>
        </div>
    );
}
