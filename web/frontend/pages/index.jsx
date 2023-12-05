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
import {TitleBar} from "@shopify/app-bridge-react";
import {useTranslation, Trans} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {
    HomeMinor, MobileHamburgerMajor,
    EditMinor,
    CirclePlusOutlineMinor
}
    from '@shopify/polaris-icons';

import {trophyImage} from "../assets";

import {ProductsCard} from "../components";
import React from 'react';

export default function HomePage() {
    const {t} = useTranslation();
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

    function guidePage() {
        const navigateTo = (route) => {
            // Implement navigation logic here. For example:
            // navigate(route);
        };

        return (
            <>
                <Card sectioned>
                    <TextContainer>
                        <h2>Create Screens</h2>
                        <p>Use the drag-and-drop interface to design the screens of your app. You can choose from a variety of templates or start from scratch. Add elements like images, text, buttons, and more by simply dragging them onto your screen layout.</p>
                        <Button onClick={() => navigate('/page_builder')}>Start Creating Screens</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>Design Menus</h2>
                        <p>Similarly, you can create menus for your app. Drag and drop different menu items into your desired order, and customize their appearance to match your brand.</p>
                        <Button onClick={() => navigate('/page_menu_buider')}>Start Designing Menus</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>Create and Manage Notifications</h2>
                        <p>Effortlessly set up and personalize notifications in a tree view layout to keep your customers informed about the latest products, special offers, and other vital updates.</p>
                        <Button onClick={() => navigate('/page_notification_list')}>Manage Notifications</Button>
                    </TextContainer>
                </Card>

                <Card sectioned>
                    <TextContainer>
                        <h2>App Submission Assistance</h2>
                        <p>After finalizing your app, you have the option to submit it to the Apple App Store and Google Play Store. Our drag-and-drop app builder service includes personalized assistance. Once you're ready to proceed, contact us and we'll guide you through the app submission process for a seamless experience.</p>
                        <Button onClick={() => navigate('/page_app_submission_info')}>Get Submission Assistance</Button>
                    </TextContainer>
                </Card>
            </>
        );
    }
    return (
        <div className="layoutWrapper">

            <Frame>
                <div className="navigationSidebar">
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
                </div>
                <div className="mainContent">

                    <Page>
                        <TitleBar title={t("HomePage.title")} primaryAction={null}/>

                        <Layout>
                            <Layout.Section>
                                {guidePage()}
                                <Card sectioned>

                                    <Stack
                                        wrap={false}
                                        spacing="extraTight"
                                        distribution="trailing"
                                        alignment="center"
                                    >

                                    </Stack>
                                </Card>
                            </Layout.Section>
                            <div style={{
                                display: 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>

                                <Layout.Section>
                                    <ProductsCard/>
                                </Layout.Section>
                            </div>
                        </Layout>
                    </Page>
                </div>
            </Frame>
        </div>
    );
}
