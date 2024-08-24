import React, { useState, useEffect } from 'react';
import { Card, Page, Layout, TextContainer, Button, Stack, Banner, Spinner, Link } from "@shopify/polaris";
import { useNavigate } from 'react-router-dom';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useShop } from '../components/providers/ShopProvider';

const QuizzIntro = () => {
    const navigate = useNavigate();
    const app = useAppBridge(); // Get the App Bridge instance
    const [shop, setShop] = useState('');
    const [host, setHost] = useState('');
    const [loading, setLoading] = useState(true); // State to handle loading

    const { setShopxName, setToken } = useShop();

    const handleDismiss = () => {
        setVisible(false); // Dismiss the banner
    };

    const base64Decode = (encodedString) => {
        try {
            return atob(encodedString);
        } catch (e) {
            console.error("Failed to decode base64 string:", e);
            return null;
        }
    };

    useEffect(() => {
        const getEncodedStringFromStoreName = (storeName) => {
            const storeUrl = `admin.shopify.com/store/${storeName}`;
            return btoa(storeUrl);
        };

        getSessionToken(app).then((token) => {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const hostParamb2 = decodedToken.dest.split('/')[2]; // Extract the shop domain
            const hostParamb = hostParamb2.split('.')[0]; // Extract the store name part only

            const hostParam = getEncodedStringFromStoreName(hostParamb);
            setHost(hostParam);
            setShop(hostParamb);

            // Set in global state
            setShopxName(hostParamb);
            setToken(hostParam);

            setLoading(false); // Set loading to false when data is ready
        }).catch(console.error);
    }, [app, setShopxName, setToken]);

    const navigateToQuizSetting = () => navigate(`/page_quiz_setting/shop/${shop}/hostz/${host}/`);
    const navigateToCreateQuestion = () => navigate(`/page_form/question/shop/${shop}/hostz/${host}/`);
    const navigateToQuestionList = () => navigate(`/page_tree/question/shop/${shop}/hostz/${host}/`);
    const navigateToQuizList = () => navigate(`/page_tree/quiz/shop/${shop}/hostz/${host}/`);
    const navigateToReports = () => navigate(`/page_tree/quiz_answer/shop/${shop}/hostz/${host}/`);
    const navigateToKOLSetting = () => navigate(`/page_kol_setting/shop/${shop}/hostz/${host}/`);
    const navigateToManageKOL = () => navigate(`/page_tree/kol/shop/${shop}/hostz/${host}/`);
    const navigateToCreateKOL = () => navigate(`/page_form/kol/shop/${shop}/hostz/${host}/`);
    const navigateToManageCampaign = () => navigate(`page_tree/commission_rule/shop/${shop}/hostz/${host}/`);
    const navigateToManageTransaction = () => navigate(`page_tree/affiliate_transaction/shop/${shop}/hostz/${host}/`);
    const navigateToManagePayout = () => navigate(`page_tree/affiliate_payout/shop/${shop}/hostz/${host}/`);
    const navigateToInsightReport = () => navigate(`page_af_report/shop/${shop}/hostz/${host}/`);
    const navigateToPlan = () => navigate(`page_plan/shop/${shop}/hostz/${host}/`);

    // If shop is not set, display loading spinner
    if (loading || !shop) {
        return (
            <Page>
                <Layout>
                    <Layout.Section>
                        <Stack vertical spacing="tight" alignment="center">
                            <Spinner accessibilityLabel="Loading" size="large" />
                            <TextContainer>
                                <p>Loading...</p>
                            </TextContainer>
                        </Stack>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    const affiliatePortalUrl = `${process.env.APP_HOST}/portal/kol/signup?shop=${shop}.myshopify.com`;
    const guidelineUrl = `${process.env.APP_HOST}/guideline?shop=${shop}.myshopify.com`;

    return (
        <Page title="Dashboard">
            <Layout>
                <Layout.Section>
                    <Banner
                        title="Welcome to the KOL affiliate marketing!"
                        onDismiss={handleDismiss}
                        status="info"
                        action={{ content: 'Learn More', url: '/user-guide' }}
                        secondaryAction={{ content: 'Dismiss', onAction: handleDismiss }}
                    >
                        <p>Quickly get started with your KOL affiliate marketing. Create campaigns, configure commission models, and manage affiliates with ease.</p>
                    </Banner>
                </Layout.Section>


                <Layout.Section>
                    <TextContainer>
                        <Stack vertical spacing="tight">
                            <Card sectioned>
                                <TextContainer>
                                    <h2>KOL Affiliate Setting</h2>
                                    <p>Enable the affiliate popup.</p>
                                    <Button primary onClick={navigateToKOLSetting}>Setting</Button>
                                </TextContainer>
                            </Card>
                            <Card sectioned>
                                <TextContainer>
                                    <h2>Affiliate Portal</h2>
                                    <p>Access the affiliate portal.</p>
                                    <Link url={affiliatePortalUrl} external>
                                        Affiliate portal
                                    </Link>
                                </TextContainer>
                            </Card>
                            <Card sectioned>
                                <TextContainer>
                                    <h2>Manage KOL</h2>
                                    <p>Create and manage your KOL.</p>
                                    <Button onClick={navigateToManageKOL}>Manage KOL</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>Create Campaign</h2>
                                    <p>Create your campaign.</p>
                                    <Button onClick={navigateToCreateKOL}>Create KOL</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>Create your campaign</h2>
                                    <p>Edit, delete questions in your questions bank.</p>
                                    <Button onClick={navigateToManageCampaign}>Create campaign</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>Manage your campaign</h2>
                                    <p>View, search, edit the campaign.</p>
                                    <Button onClick={navigateToManageCampaign}>Manage Campaign</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>Manage your conversion</h2>
                                    <p>View, add your conversion.</p>
                                    <Button onClick={navigateToManageTransaction}>Manage Conversion</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>View manage transaction</h2>
                                    <p>View the payout.</p>
                                    <Button onClick={navigateToManageTransaction}>Manage transaction</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>View manage your payout</h2>
                                    <p>View the payout.</p>
                                    <Button onClick={navigateToManagePayout}>Manage payout</Button>
                                </TextContainer>
                            </Card>

                            <Card sectioned>
                                <TextContainer>
                                    <h2>Insight</h2>
                                    <p>View the analytic report.</p>
                                    <Button onClick={navigateToInsightReport}>Report</Button>
                                </TextContainer>
                            </Card>
                            <Card sectioned>
                                <TextContainer>
                                    <h2>Subscribe to plan</h2>
                                    <p>Manage your subscribed plan.</p>
                                    <Button onClick={navigateToPlan}>Plan</Button>
                                </TextContainer>
                            </Card>
                        </Stack>
                    </TextContainer>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default QuizzIntro;
