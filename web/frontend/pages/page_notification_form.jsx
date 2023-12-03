import React, { useState, useEffect, useCallback } from 'react';
import { Frame, Page, Layout, Card, FormLayout, TextField, TextContainer, Banner, Toast ,Button} from '@shopify/polaris';

function MyComponent() {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fetchedId = urlParams.get('id') || '0';
        setId(fetchedId);
        // Replace with your API endpoint
        fetch( window.dev_server + `/api/mobile_notification/fetch?id=${fetchedId}&shop_name=` + window.shop_name)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSubmit = useCallback(() => {
        const payload = {
            id,
            shop_name:  window.shop_name,
            title,
            content
        };
        // Replace with your API endpoint
        fetch( window.dev_server + `/api/mobile_notification/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.ok) {
                    setToastMessage('Data saved successfully');
                    setShowToast(true);
                } else {
                    setToastMessage('Failed to save data');
                    setShowToast(true);
                }
            })
            .catch(error => {
                setToastMessage('Error occurred');
                setShowToast(true);
                console.error('Error:', error);
            });
    }, [id, title, content]);

    const handleDismissBanner = useCallback(() => {
        setShowBanner(false);
    }, []);

    return (
        <Frame>
            <Page primaryAction={
                {
                    content: 'Save',
                    onAction: () => {
                        handleSubmit() // Close the modal after adding the element
                    },
                }

            }>
                {showBanner && (
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                    <Banner
                        title="Notice"
                        onDismiss={handleDismissBanner}
                    >
                        <p>This is a simple banner with some instructions for the user.</p>
                    </Banner>
                        </div>
                )}
                <Layout>
                    <Layout.Section oneThird>
                        <div style={{marginTop: 'var(--p-space-500)'}}>
                            <TextContainer>
                                <p><strong>Instructions</strong></p>
                                <p>Fill out the form fields and click submit to save.</p>
                            </TextContainer>
                        </div>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <FormLayout>
                                <TextField
                                    label="Title"
                                    value={title}
                                    onChange={setTitle}
                                    type="text"
                                />
                                <TextField
                                    label="Content"
                                    value={content}
                                    onChange={setContent}
                                    type="text"
                                    multiline={6}
                                />
                                <Button onClick={handleSubmit}>Submit</Button>
                            </FormLayout>
                        </Card>
                    </Layout.Section>
                </Layout>

                {showToast && (
                    <Toast content={toastMessage} onDismiss={() => setShowToast(false)} />
                )}
            </Page>
        </Frame>
    );
}

export default MyComponent;
